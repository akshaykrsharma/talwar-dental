/** localStorage wrappers that never throw (private mode, blocked storage, server render). */

export function readStorage(key, fallback = null) {
  try {
    if (typeof window === "undefined") return fallback;
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the preference simply is not remembered */
  }
}
