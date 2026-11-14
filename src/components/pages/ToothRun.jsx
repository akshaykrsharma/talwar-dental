import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { logos } from "@/assets/logo";
import "./ToothRun.css";

const BEST_KEY = "talwar-tooth-best";

/** Points between speed steps. Level 1 is a comfortable jog. */
const LEVEL_EVERY = 100;
const BASE_SPEED = 4.6;
const SPEED_STEP = 1.4;
const MAX_SPEED = 19;
const LIVES = 3;
const BODY_W = 62;
const BODY_H = 74;
const BODY_SCALE = 0.58;

/** Obstacles, in the order they appear. Sizes match the drawing. */
const SWEETS = [
  { kind: "laddu", w: 34, h: 36 },
  { kind: "jamun", w: 28, h: 30 },
  { kind: "chop", w: 38, h: 22 },
  { kind: "jalebi", w: 34, h: 26 },
  { kind: "barfi", w: 28, h: 36 },
  { kind: "rasgulla", w: 28, h: 28 },
];

function fillCircle(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawLaddu(ctx, x, y, w, h) {
  const cx = x + w / 2;
  const r = Math.min(w * 0.4, h * 0.36);
  const cupTop = y + h * 0.58;
  const cy = cupTop - r * 0.15;
  ctx.fillStyle = "rgba(190, 100, 20, 0.16)";
  ctx.beginPath();
  ctx.ellipse(cx, y + h - 1, r * 1.05, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  const ball = ctx.createRadialGradient(cx - r * 0.32, cy - r * 0.38, 2, cx, cy, r);
  ball.addColorStop(0, "#ffd98a");
  ball.addColorStop(0.4, "#ff8f12");
  ball.addColorStop(1, "#e06500");
  ctx.fillStyle = ball;
  fillCircle(ctx, cx, cy, r);
  ctx.fillStyle = "rgba(176, 62, 0, 0.38)";
  [
    [-7, -1],
    [2, -7],
    [7, 1],
    [-1, 5],
    [-5, 4],
    [4, 4],
    [0, -1],
    [-4, -6],
    [6, -4],
    [-8, 2],
  ].forEach(([dx, dy]) => fillCircle(ctx, cx + dx * (r / 12), cy + dy * (r / 12), 1.6));
  ctx.fillStyle = "rgba(255, 214, 130, 0.8)";
  [
    [-3, -4],
    [4, 1],
    [1, -2],
  ].forEach(([dx, dy]) => fillCircle(ctx, cx + dx, cy + dy, 1.2));

  const half = r * 1.15;
  ctx.beginPath();
  const teeth = 8;
  for (let i = 0; i <= teeth; i += 1) {
    const px = cx - half + (half * 2 * i) / teeth;
    const py = cupTop + (i % 2 === 0 ? 0 : 4);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.lineTo(cx + half * 0.78, y + h - 1);
  ctx.lineTo(cx - half * 0.78, y + h - 1);
  ctx.closePath();
  ctx.fillStyle = "#fffefb";
  ctx.fill();
  ctx.strokeStyle = "#ead8b4";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.strokeStyle = "rgba(214, 168, 50, 0.55)";
  ctx.beginPath();
  ctx.moveTo(cx - half * 0.28, cupTop + 6);
  ctx.lineTo(cx - half * 0.08, y + h - 2);
  ctx.moveTo(cx + half * 0.16, cupTop + 6);
  ctx.lineTo(cx + half * 0.36, y + h - 2);
  ctx.stroke();
}

function drawJamun(ctx, x, y, w, h) {
  const cx = x + w / 2;
  const cy = y + h * 0.48;
  const r = Math.min(w, h) * 0.44;
  ctx.fillStyle = "rgba(180, 90, 20, 0.2)";
  ctx.beginPath();
  ctx.ellipse(cx, y + h - 2, r * 0.85, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  const ball = ctx.createRadialGradient(cx - r * 0.32, cy - r * 0.4, 1, cx, cy + r * 0.15, r);
  ball.addColorStop(0, "#fff3cf");
  ball.addColorStop(0.22, "#ffc15a");
  ball.addColorStop(0.62, "#f07818");
  ball.addColorStop(1, "#c24e0c");
  ctx.fillStyle = ball;
  fillCircle(ctx, cx, cy, r);
  ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
  ctx.beginPath();
  ctx.ellipse(cx - r * 0.28, cy - r * 0.32, r * 0.3, r * 0.16, -0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 236, 200, 0.45)";
  ctx.beginPath();
  ctx.ellipse(cx + r * 0.22, cy + r * 0.28, r * 0.16, r * 0.08, 0.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawChop(ctx, x, y, w, h) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  ctx.fillStyle = "rgba(120, 70, 10, 0.16)";
  ctx.beginPath();
  ctx.ellipse(cx, y + h - 1, w * 0.38, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  const crust = ctx.createLinearGradient(x, y, x, y + h);
  crust.addColorStop(0, "#f7c56a");
  crust.addColorStop(0.45, "#e09422");
  crust.addColorStop(1, "#b86a10");
  ctx.fillStyle = crust;
  ctx.beginPath();
  ctx.ellipse(cx, cy, w / 2 - 1, h / 2 - 1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#a15c0c";
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.fillStyle = "#fff4df";
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.18, h * 0.26, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawJalebi(ctx, x, y, w, h) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.lineCap = "round";
  ctx.lineWidth = Math.max(7, h * 0.22);
  ctx.strokeStyle = "#ef6d00";
  ctx.beginPath();
  ctx.arc(-w * 0.12, 0, h * 0.32, 0.5, Math.PI * 1.75);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(w * 0.16, 1, h * 0.26, Math.PI * 0.9, Math.PI * 2.35);
  ctx.stroke();
  ctx.strokeStyle = "#ffe1a3";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(-w * 0.12, -2, h * 0.16, 0.7, 1.7);
  ctx.stroke();
  ctx.restore();
}

function drawBarfi(ctx, x, y, w, h) {
  const cx = x + w / 2;
  const top = y + 2;
  const bottom = y + h - 6;
  const left = x + 4;
  const right = x + w - 4;
  const cy = (top + bottom) / 2;
  const diamond = () => {
    ctx.beginPath();
    ctx.moveTo(cx, top);
    ctx.lineTo(right, cy);
    ctx.lineTo(cx, bottom);
    ctx.lineTo(left, cy);
    ctx.closePath();
  };

  ctx.fillStyle = "rgba(150, 110, 50, 0.18)";
  ctx.beginPath();
  ctx.ellipse(cx, y + h - 2, w * 0.26, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  diamond();
  const nut = ctx.createLinearGradient(left, top, right, bottom);
  nut.addColorStop(0, "#f3d7a2");
  nut.addColorStop(1, "#c4924e");
  ctx.fillStyle = nut;
  ctx.fill();
  ctx.save();
  diamond();
  ctx.clip();
  const silver = ctx.createLinearGradient(left, top, right, cy);
  silver.addColorStop(0, "#f4f6f8");
  silver.addColorStop(0.55, "#b7bec8");
  silver.addColorStop(1, "#e6eaef");
  ctx.fillStyle = silver;
  ctx.beginPath();
  ctx.moveTo(left - 4, cy - 2);
  ctx.lineTo(cx, top - 4);
  ctx.lineTo(right + 4, cy - 2);
  ctx.lineTo(cx + 5, cy + (bottom - cy) * 0.28);
  ctx.quadraticCurveTo(cx - 6, cy + 2, left + 4, cy + (bottom - cy) * 0.42);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(80, 88, 102, 0.4)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(cx - 7, top + 10);
  ctx.lineTo(cx - 1, cy - 2);
  ctx.lineTo(cx + 8, cy - 8);
  ctx.moveTo(left + 10, cy - 4);
  ctx.lineTo(cx - 2, cy + 4);
  ctx.stroke();
  ctx.restore();
  diamond();
  ctx.strokeStyle = "#a67c3d";
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.fillStyle = "#d7b07a";
  fillCircle(ctx, right, bottom + 1, 2.2);
  fillCircle(ctx, right + 3, bottom + 3, 1.5);
}

function drawRasgulla(ctx, x, y, w, h) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = Math.min(w, h) / 2 - 1;
  ctx.fillStyle = "rgba(150, 180, 190, 0.35)";
  ctx.beginPath();
  ctx.ellipse(cx, y + h - 1, r * 0.72, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();
  const ball = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, 1, cx, cy, r);
  ball.addColorStop(0, "#ffffff");
  ball.addColorStop(1, "#d5e6ee");
  ctx.fillStyle = ball;
  fillCircle(ctx, cx, cy, r);
  ctx.strokeStyle = "#b7ced8";
  ctx.lineWidth = 1.3;
  ctx.stroke();
  ctx.fillStyle = "rgba(140, 175, 188, 0.55)";
  [
    [-4, -1],
    [3, -4],
    [2, 3],
    [-2, 4],
  ].forEach(([dx, dy]) => fillCircle(ctx, cx + dx, cy + dy, 1.3));
}

const SWEET_DRAW = {
  laddu: drawLaddu,
  jamun: drawJamun,
  chop: drawChop,
  jalebi: drawJalebi,
  barfi: drawBarfi,
  rasgulla: drawRasgulla,
};

function Heart() {
  return (
    <svg className="run__heart" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

let logoPromise = null;

/** Lazy so the module can load during prerender, where `Image` does not exist. */
function logoReady() {
  logoPromise ??= loadImage(logos.horizontal);
  return logoPromise;
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function wrapLines(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx, x, y, w, h, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

/** Score card with the clinic logo, the result, and the page link. */
async function buildScoreFile({ score, copy, url, shot }) {
  const logo = await logoReady();
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const font = getComputedStyle(document.body).fontFamily || "sans-serif";

  ctx.fillStyle = "#f8f5f0";
  ctx.fillRect(0, 0, width, height);
  ctx.textAlign = "center";

  let cursor = 56;
  if (logo) {
    const logoWidth = 620;
    const logoHeight = (logo.height / logo.width) * logoWidth;
    ctx.drawImage(logo, (width - logoWidth) / 2, cursor, logoWidth, logoHeight);
    cursor += logoHeight + 36;
  } else {
    ctx.fillStyle = "#034787";
    ctx.font = `800 64px ${font}`;
    ctx.fillText("Talwar Dental Care", width / 2, 140);
    cursor = 190;
  }

  if (shot) {
    const cropW = Math.round(shot.width * 0.42);
    const cropH = Math.round(shot.height * 0.62);
    const cropY = shot.height - cropH;
    const maxH = 280;
    let frameW = 880;
    let frameH = frameW * (cropH / cropW);
    if (frameH > maxH) {
      frameH = maxH;
      frameW = frameH * (cropW / cropH);
    }
    const frameX = (width - frameW) / 2;
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, frameX - 18, cursor, frameW + 36, frameH + 36, 28);
    ctx.fill();
    ctx.drawImage(shot, 0, cropY, cropW, cropH, frameX, cursor + 18, frameW, frameH);
    cursor += frameH + 72;
  }

  ctx.fillStyle = "#53606c";
  ctx.font = `600 36px ${font}`;
  ctx.fillText(copy.score, width / 2, cursor);
  ctx.fillStyle = "#034787";
  ctx.font = `800 128px ${font}`;
  ctx.fillText(String(score), width / 2, cursor + 130);

  ctx.fillStyle = "#16212c";
  ctx.font = `600 40px ${font}`;
  const message = copy.challengeText.replaceAll("{score}", String(score));
  wrapLines(ctx, message, 900)
    .slice(0, 3)
    .forEach((line, index) => {
      ctx.fillText(line, width / 2, cursor + 200 + index * 52);
    });

  ctx.fillStyle = "#034787";
  ctx.fillRect(0, height - 132, width, 132);
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 30px ${font}`;
  wrapLines(ctx, url, 960)
    .slice(0, 2)
    .forEach((line, index) => {
      ctx.fillText(line, width / 2, height - 78 + index * 40);
    });

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  return new File([blob], "talwar-dental-score.png", { type: "image/png" });
}

function sharePageUrl(node) {
  const { origin, pathname, search } = window.location;
  const base = `${origin}${pathname}${search}`;
  return node?.closest?.("#play") ? `${base}#play` : base;
}

function downloadFile(file) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function levelFor(score) {
  return 1 + Math.floor(score / LEVEL_EVERY);
}

function speedFor(score) {
  return Math.min(MAX_SPEED, BASE_SPEED + (levelFor(score) - 1) * SPEED_STEP);
}

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(score) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    /* private browsing can block storage */
  }
}

/**
 * A small endless runner. The runner is the clinic tooth mark, with a face.
 * Speed stays gentle on level 1 and steps up each level.
 * Drawn on a canvas so it stays inside the page design, with no outside artwork.
 */
export default function ToothRun({ copy }) {
  const canvasRef = useRef(null);
  const scoreRef = useRef(null);
  const bestRef = useRef(null);
  const levelRef = useRef(null);
  const livesRef = useRef(null);
  const levelLabel = useRef(copy.level);
  const api = useRef({ jump() {} });
  const shotRef = useRef(null);
  const fileRef = useRef(null);
  const scoreValueRef = useRef(0);
  const [phase, setPhase] = useState("ready");
  const [finalScore, setFinalScore] = useState(0);
  const [cardUrl, setCardUrl] = useState("");
  const [shareNote, setShareNote] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  // Keep the label ref fresh for the canvas draw loop without touching it in render.
  useEffect(() => {
    levelLabel.current = copy.level;
  }, [copy.level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    const styles = getComputedStyle(canvas);
    const color = {
      cream: styles.getPropertyValue("--cream").trim() || "#f8f5f0",
      ink: styles.getPropertyValue("--ink").trim() || "#16212c",
      navy: styles.getPropertyValue("--navy").trim() || "#034787",
      accent: styles.getPropertyValue("--accent").trim() || "#0E8CBB",
      sand: styles.getPropertyValue("--sand").trim() || "#efe7dd",
      white: "#ffffff",
      blush: "#f3b6b0",
    };

    const sprite = new Image();
    let spriteReady = false;
    sprite.onload = () => {
      spriteReady = true;
    };
    sprite.src = logos.mark;

    const state = {
      tick: 0,
      frame: 0,
      speed: BASE_SPEED,
      level: 1,
      banner: 0,
      lift: 0,
      vy: 0,
      grounded: true,
      obstacles: [],
      sweet: 0,
      wait: 48,
      score: 0,
      lives: LIVES,
      grace: 0,
      alive: false,
    };

    const groundY = () => canvas.clientHeight - 28;
    const tooth = { x: 56, w: BODY_W * BODY_SCALE, h: BODY_H * BODY_SCALE };

    const syncLives = () => {
      const marks = livesRef.current?.querySelectorAll(".run__heart");
      if (!marks) return;
      marks.forEach((mark, index) => {
        mark.classList.toggle("is-spent", index >= state.lives);
      });
    };

    const reset = () => {
      state.frame = 0;
      state.speed = BASE_SPEED;
      state.level = 1;
      state.banner = 0;
      state.lift = 0;
      state.vy = 0;
      state.grounded = true;
      state.obstacles = [];
      state.sweet = 0;
      state.wait = 48;
      state.score = 0;
      state.lives = LIVES;
      state.grace = 0;
      state.alive = true;
      if (scoreRef.current) scoreRef.current.textContent = "0";
      if (levelRef.current) levelRef.current.textContent = "1";
      syncLives();
      setCardUrl("");
      setShareNote("");
      setShareUrl("");
      setPhase("running");
    };

    const finish = () => {
      state.alive = false;
      const best = Math.max(readBest(), state.score);
      saveBest(best);
      if (bestRef.current) bestRef.current.textContent = String(best);
      const shot = document.createElement("canvas");
      shot.width = canvas.width;
      shot.height = canvas.height;
      shot.getContext("2d").drawImage(canvas, 0, 0);
      shotRef.current = shot;
      fileRef.current = null;
      scoreValueRef.current = state.score;
      setFinalScore(state.score);
      setCardUrl("");
      setShareNote("");
      setShareUrl("");
      setPhase("over");
      buildScoreFile({
        score: state.score,
        copy,
        url: sharePageUrl(canvas),
        shot,
      }).then((file) => {
        fileRef.current = file;
      });
    };

    const jump = () => {
      if (!state.alive) {
        reset();
        return;
      }
      if (state.grounded) {
        state.vy = -12.8;
        state.grounded = false;
      }
    };
    api.current.jump = jump;

    const onKey = (event) => {
      if (event.code !== "Space" && event.code !== "ArrowUp") return;
      const tag = event.target?.closest?.("a, button, input, textarea, select");
      if (tag && tag !== canvas) return;
      event.preventDefault();
      jump();
    };
    const onPointer = (event) => {
      event.preventDefault();
      jump();
    };
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointer);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const step = () => {
      state.frame += 1;
      const level = levelFor(state.score);
      state.speed = speedFor(state.score);
      if (level !== state.level) {
        state.level = level;
        state.banner = 70;
        if (levelRef.current) levelRef.current.textContent = String(level);
      }
      if (state.banner > 0) state.banner -= 1;

      state.vy += 0.68;
      state.lift = Math.max(0, state.lift - state.vy);
      if (state.lift <= 0 && state.vy > 0) {
        state.lift = 0;
        state.vy = 0;
        state.grounded = true;
      }
      state.score = Math.floor(state.frame / 6);
      if (scoreRef.current && state.frame % 6 === 0) {
        scoreRef.current.textContent = String(state.score);
      }

      state.wait -= 1;
      if (state.wait <= 0) {
        const spec = SWEETS[state.sweet % SWEETS.length];
        state.sweet += 1;
        state.obstacles.push({
          x: canvas.clientWidth + 16,
          w: spec.w,
          h: spec.h,
          kind: spec.kind,
        });
        const gap = Math.max(52, 128 - state.level * 6);
        state.wait = gap + Math.random() * 36;
      }

      if (state.grace > 0) state.grace -= 1;
      const foot = groundY() - tooth.h - state.lift;
      for (const item of state.obstacles) {
        item.x -= state.speed;
        if (state.grace > 0 || !state.alive) continue;
        const hitX = tooth.x + tooth.w * 0.2 < item.x + item.w && tooth.x + tooth.w * 0.78 > item.x;
        const hitY = foot + tooth.h - 6 > groundY() - item.h && foot + 10 < groundY();
        if (!hitX || !hitY) continue;
        state.lives -= 1;
        state.grace = 54;
        item.x = -40;
        syncLives();
        if (state.grounded) {
          state.vy = -8;
          state.grounded = false;
        }
        if (state.lives <= 0) finish();
        break;
      }
      state.obstacles = state.obstacles.filter((item) => item.x + item.w > -8);
    };

    const drawLeg = (x, reach) => {
      ctx.strokeStyle = color.navy;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, -8);
      ctx.lineTo(x + reach, 6);
      ctx.stroke();
      ctx.fillStyle = color.white;
      ctx.beginPath();
      ctx.ellipse(x + reach, 7, 5, 2.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = color.navy;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    };

    const drawEye = (x, y, blink, look) => {
      if (blink) {
        ctx.strokeStyle = color.white;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 6, y);
        ctx.quadraticCurveTo(x, y + 3, x + 6, y);
        ctx.stroke();
        return;
      }
      ctx.fillStyle = color.white;
      ctx.beginPath();
      ctx.ellipse(x, y, 7.5, 8.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color.navy;
      ctx.beginPath();
      ctx.arc(x + look, y + 1, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = color.white;
      ctx.beginPath();
      ctx.arc(x + look - 1.2, y - 1, 1.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTooth = (x, y) => {
      const jumping = state.alive && !state.grounded;
      const stride = Math.max(5, Math.floor(16 - state.speed * 1.5));
      const stepping = state.alive && state.grounded && Math.floor(state.frame / stride) % 2 === 0;
      const bob = !jumping ? Math.sin(state.tick / 10) * 1.6 : 0;
      const blink = Math.floor(state.tick / 150) % 8 === 0;
      ctx.save();
      ctx.translate(x + tooth.w / 2, y + tooth.h + bob);
      ctx.scale(BODY_SCALE, BODY_SCALE);
      ctx.rotate(jumping ? -0.22 : stepping ? 0.04 : -0.04);
      if (state.grace > 0) ctx.globalAlpha = Math.floor(state.grace / 4) % 2 === 0 ? 0.35 : 1;

      ctx.fillStyle = "rgba(3, 71, 135, 0.12)";
      ctx.beginPath();
      ctx.ellipse(0, 8, jumping ? 10 : 16, 3.2, 0, 0, Math.PI * 2);
      ctx.fill();

      const reach = jumping ? 2 : stepping ? 7 : -5;
      drawLeg(-9, jumping ? -2 : reach);
      drawLeg(9, jumping ? 2 : -reach);

      ctx.strokeStyle = color.navy;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      const wave = jumping ? -16 : stepping ? 8 : -6;
      ctx.beginPath();
      ctx.moveTo(-16, -30);
      ctx.quadraticCurveTo(-28, -26 + wave * 0.3, -22, -12 + wave);
      ctx.moveTo(16, -30);
      ctx.quadraticCurveTo(28, -22 - wave * 0.2, 20, -14 - wave);
      ctx.stroke();

      const size = BODY_W;
      const top = -BODY_H + 6;
      if (spriteReady) {
        ctx.drawImage(sprite, -size / 2, top, size, size);
      } else {
        const body = ctx.createLinearGradient(-size / 2, 0, size / 2, 0);
        body.addColorStop(0, color.navy);
        body.addColorStop(1, color.accent);
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.moveTo(-8, -6);
        ctx.quadraticCurveTo(-16, -16, -18, -28);
        ctx.quadraticCurveTo(-24, -46, -10, -52);
        ctx.quadraticCurveTo(-2, -40, 2, -40);
        ctx.quadraticCurveTo(10, -40, 16, -54);
        ctx.quadraticCurveTo(28, -46, 20, -28);
        ctx.quadraticCurveTo(18, -16, 8, -6);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#7fd0ea";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-14, -30);
        ctx.quadraticCurveTo(0, -20, 14, -32);
        ctx.stroke();
      }

      drawEye(-8, top + size * 0.4, blink, 1.4);
      drawEye(9, top + size * 0.38, blink, 1.4);
      ctx.strokeStyle = color.white;
      ctx.lineWidth = 1.8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(4, top + size * 0.28);
      ctx.quadraticCurveTo(10, top + size * 0.2, 16, top + size * 0.3);
      ctx.stroke();

      ctx.fillStyle = color.blush;
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.ellipse(-14, top + size * 0.52, 4, 2.4, 0, 0, Math.PI * 2);
      ctx.ellipse(15, top + size * 0.52, 4, 2.4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const drawSweet = (item, base) => {
      const draw = SWEET_DRAW[item.kind] || drawLaddu;
      draw(ctx, item.x, base - item.h - 3, item.w, item.h);
    };

    const paint = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const base = groundY();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color.cream;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = color.sand;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(0, base + 8);
      ctx.lineTo(w, base + 8);
      ctx.stroke();
      ctx.strokeStyle = color.navy;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, base);
      ctx.lineTo(w, base);
      ctx.stroke();
      const shift = (state.frame * state.speed) % 28;
      ctx.strokeStyle = color.accent;
      ctx.lineWidth = 2;
      for (let dash = -shift; dash < w; dash += 28) {
        ctx.beginPath();
        ctx.moveTo(dash, base + 14);
        ctx.lineTo(dash + 12, base + 14);
        ctx.stroke();
      }
      for (const item of state.obstacles) drawSweet(item, base);
      drawTooth(tooth.x, base - tooth.h - state.lift);
      if (state.alive && state.banner > 40) {
        ctx.fillStyle = color.navy;
        ctx.font = "700 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${levelLabel.current} ${state.level}`, w / 2, 36);
      }
    };

    let raf = 0;
    const loop = () => {
      state.tick += 1;
      if (state.alive) step();
      paint();
      raf = requestAnimationFrame(loop);
    };
    paint();
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointer);
    };
  }, [copy]);

  const challengeFriend = async () => {
    const pageUrl = sharePageUrl(canvasRef.current);
    const score = scoreValueRef.current;
    const text = copy.challengeText.replaceAll("{score}", String(score));
    let file = fileRef.current;
    if (!file) {
      file = await buildScoreFile({
        score,
        copy,
        url: pageUrl,
        shot: shotRef.current,
      });
      fileRef.current = file;
    }
    const payload = { files: [file], text: `${text}\n${pageUrl}`, title: "Talwar Dental Care" };
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    downloadFile(file);
    const preview = URL.createObjectURL(file);
    setCardUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return preview;
    });
    setShareNote(copy.challengeSaved);
    setShareUrl(pageUrl);
  };

  return (
    <div className="run">
      <div className="run__bar">
        <p className="run__title">{copy.gameTitle}</p>
        <p className="run__scores">
          <span className="run__lives" ref={livesRef} aria-label={copy.lives}>
            <Heart />
            <Heart />
            <Heart />
          </span>
          <span>
            {copy.level} <strong ref={levelRef}>1</strong>
          </span>
          <span>
            {copy.score} <strong ref={scoreRef}>0</strong>
          </span>
          <span>
            {copy.best} <strong ref={bestRef}>{readBest()}</strong>
          </span>
        </p>
      </div>
      <div className="run__stage">
        <canvas ref={canvasRef} className="run__canvas" aria-hidden="true" />
        {phase === "ready" ? (
          <div className="run__overlay">
            <button type="button" className="btn btn--primary" onClick={() => api.current.jump()}>
              {copy.play}
            </button>
          </div>
        ) : null}
      </div>
      {phase === "over" ? (
        <div className="run__over">
          <p>{copy.over}</p>
          <p className="run__final">
            {copy.score} {finalScore}
          </p>
          <div className="run__actions">
            <button type="button" className="btn btn--primary" onClick={() => api.current.jump()}>
              {copy.again}
            </button>
            <button type="button" className="btn btn--outline" onClick={challengeFriend}>
              {copy.challenge}
            </button>
          </div>
        </div>
      ) : null}
      {cardUrl ? (
        <div className="run__share">
          <img className="run__card" src={cardUrl} alt="" />
          <a
            className="btn btn--outline"
            href={`https://wa.me/?text=${encodeURIComponent(`${copy.challengeText.replaceAll("{score}", String(finalScore))}\n${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          {shareNote ? <p className="run__share-note">{shareNote}</p> : null}
        </div>
      ) : null}
      <p className="run__hint">{copy.hint}</p>
    </div>
  );
}

ToothRun.propTypes = {
  copy: PropTypes.shape({
    gameTitle: PropTypes.string.isRequired,
    hint: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    lives: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    best: PropTypes.string.isRequired,
    play: PropTypes.string.isRequired,
    again: PropTypes.string.isRequired,
    over: PropTypes.string.isRequired,
    challenge: PropTypes.string.isRequired,
    challengeText: PropTypes.string.isRequired,
    challengeSaved: PropTypes.string.isRequired,
  }).isRequired,
};
