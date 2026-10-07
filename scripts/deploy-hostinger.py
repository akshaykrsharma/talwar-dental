#!/usr/bin/env python3
"""Deploy dist/ to Hostinger over FTPS.

Credentials come from .ftp-credentials in the project root (git-ignored), or
from the FTP_SERVER / FTP_USERNAME / FTP_PASSWORD environment variables:

    FTP_SERVER=ftp.talwardentalcare.com
    FTP_USERNAME=u123456789.talwardentalcare.com
    FTP_PASSWORD=...

Usage:
    python3 scripts/deploy-hostinger.py --list     # show what is on the server
    python3 scripts/deploy-hostinger.py            # dry run: report, change nothing
    python3 scripts/deploy-hostinger.py --apply    # upload dist/
    python3 scripts/deploy-hostinger.py --apply --wipe   # empty the remote dir first
"""

import argparse
import os
import sys
from ftplib import FTP_TLS, error_perm
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
REMOTE_ROOT = "public_html"

# Build leftovers that visitors never need.
SKIP = {".vite", ".DS_Store", ".ftp-deploy-sync-state.json"}


def load_credentials():
    creds = {}
    env_file = ROOT / ".ftp-credentials"
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            creds[key.strip()] = value.strip().strip("\"'")

    missing = []
    for key in ("FTP_SERVER", "FTP_USERNAME", "FTP_PASSWORD"):
        creds[key] = os.environ.get(key) or creds.get(key, "")
        if not creds[key]:
            missing.append(key)
    if missing:
        sys.exit(
            f"Missing {', '.join(missing)}.\n"
            f"Put them in {env_file} (one KEY=value per line) or export them.\n"
            "Get the values from hPanel -> Files -> FTP Accounts."
        )
    return creds


def connect(creds):
    ftp = FTP_TLS(timeout=30)
    ftp.connect(creds["FTP_SERVER"], 21)
    ftp.login(creds["FTP_USERNAME"], creds["FTP_PASSWORD"])
    # Encrypt the data channel too, not just the login.
    ftp.prot_p()
    ftp.set_pasv(True)
    return ftp


def is_directory(ftp, path):
    """FTP has no stat, so the only reliable test is trying to enter it."""
    current = ftp.pwd()
    try:
        ftp.cwd(path)
        return True
    except error_perm:
        return False
    finally:
        ftp.cwd(current)


def walk_remote(ftp, path, depth=0):
    """Yield (path, is_dir, depth) for everything under path, deepest last."""
    try:
        names = ftp.nlst(path)
    except error_perm:
        return
    for name in names:
        base = name.rsplit("/", 1)[-1]
        if base in (".", ".."):
            continue
        full = f"{path}/{base}"
        if is_directory(ftp, full):
            yield from walk_remote(ftp, full, depth + 1)
            yield full, True, depth
        else:
            yield full, False, depth


def wipe_remote(ftp, path, apply_changes):
    files = dirs = 0
    for full, isdir, _ in walk_remote(ftp, path):
        if isdir:
            dirs += 1
            if apply_changes:
                ftp.rmd(full)
        else:
            files += 1
            if apply_changes:
                ftp.delete(full)
    verb = "Deleted" if apply_changes else "Would delete"
    print(f"{verb} {files} file(s) and {dirs} folder(s) under {path}/")


def local_files():
    for path in sorted(DIST.rglob("*")):
        if any(part in SKIP for part in path.relative_to(DIST).parts):
            continue
        if path.is_file():
            yield path, path.relative_to(DIST).as_posix()


def ensure_remote_dir(ftp, path, made):
    if path in made or not path:
        return
    parent = path.rsplit("/", 1)[0] if "/" in path else ""
    if parent:
        ensure_remote_dir(ftp, parent, made)
    try:
        ftp.mkd(path)
    except error_perm:
        pass  # already there
    made.add(path)


def upload(ftp, apply_changes):
    made = set()
    count = total = 0
    for local, rel in local_files():
        remote = f"{REMOTE_ROOT}/{rel}"
        size = local.stat().st_size
        count += 1
        total += size
        if apply_changes:
            if "/" in rel:
                ensure_remote_dir(ftp, f"{REMOTE_ROOT}/{rel.rsplit('/', 1)[0]}", made)
            with local.open("rb") as handle:
                ftp.storbinary(f"STOR {remote}", handle)
            print(f"  uploaded {rel} ({size:,} bytes)")
        else:
            print(f"  would upload {rel} ({size:,} bytes)")
    verb = "Uploaded" if apply_changes else "Would upload"
    print(f"{verb} {count} file(s), {total / 1024 / 1024:.2f} MB")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="actually make changes")
    parser.add_argument("--wipe", action="store_true", help="empty public_html first")
    parser.add_argument("--list", action="store_true", help="only list the server")
    args = parser.parse_args()

    if not args.list and not (DIST / "index.html").exists():
        sys.exit("dist/index.html is missing. Run `npm run build` first.")

    creds = load_credentials()
    print(f"Connecting to {creds['FTP_SERVER']} as {creds['FTP_USERNAME']}")
    ftp = connect(creds)
    try:
        print(f"Connected over FTPS. Remote root: {ftp.pwd()}")

        if args.list:
            for full, isdir, depth in walk_remote(ftp, REMOTE_ROOT):
                if depth < 2:
                    print(f"  {'[dir] ' if isdir else '      '}{full}")
            return

        if not args.apply:
            print("\nDRY RUN. Nothing will change. Re-run with --apply.\n")

        if args.wipe:
            wipe_remote(ftp, REMOTE_ROOT, args.apply)

        upload(ftp, args.apply)

        if args.apply:
            print("\nDone. Purge the cache in hPanel -> Advanced -> Cache Manager.")
    finally:
        try:
            ftp.quit()
        except Exception:
            ftp.close()


if __name__ == "__main__":
    main()
