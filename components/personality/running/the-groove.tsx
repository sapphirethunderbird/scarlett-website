"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./the-groove.module.css";

/* ============================================================================
   THE GROOVE — first person, with a locked groove at the end

   You are the needle. Every footfall cuts a mark into the floor ahead of you,
   and that mark sweeps under you and is gone. You never see what you made
   until the final cut.

   The run has an arc taken from the object itself: outer grooves are wide and
   generous, inner grooves are cramped and sound worse. So the canyon narrows,
   the bend tightens, and the sound dulls as you go.

   At the end the canyon closes into a ring 56 units around. Your last eight
   notes cycle. Your marks come back around and you cut them again, deeper each
   lap. Distance stops counting. It never ends on its own. You have to let go.
   ========================================================================== */

/* --- running -------------------------------------------------------------- */
const RUN_SECONDS = 60;        // slice length. A real side would be ~1200.
const MAX_SPEED = 16;
const WALK_SPEED = 3.5;
const ACCEL = 9;
const FRICTION = 11;
const MAX_BREATH = 100;
const BREATH_DRAIN = 9;        // scaled by (speed/MAX_SPEED)^2. ~11s flat out.
const BREATH_REGEN = 4;        // only at or below walking pace
const GRAB_SPEED = MAX_SPEED * 0.7;

/* --- the locked groove ---------------------------------------------------- */
const LOOP_LEN = 56;           // world units around. Must exceed CARVE_AHEAD.
const LOCK_BLEND = 1.4;        // seconds for the canyon to close into a ring
const LET_GO_TIME = 0.8;       // seconds of stillness before the needle lifts
const HINT_AT = 10;            // ~3 laps in, once the loop reads as a loop
const HINT_LEN = 5;            // it shows, it teaches, it leaves
const HINT_AGAIN = 40;         // insurance for anyone who missed it. Cut freely.

/* --- the canyon -----------------------------------------------------------
   Groove proportions, not canyon proportions: wider than it is deep, walls
   sloping outward at roughly 45 degrees. Nobody consciously notices. It is
   the reason the reveal feels earned. */
const FOCAL = 340;
const CAM_H = 16;
const HORIZON = 0.38;
const NEAR = 8;
const CARVE_AHEAD = 40;        // the tip cuts here, then it sweeps under you

const OPEN = { wBot: 22, wTop: 48, wallH: 40, curve: 0.00055, far: 560 };
const TIGHT = { wBot: 11, wTop: 26, wallH: 34, curve: 0.0016, far: 380 };
const RING = { wBot: 11, wTop: 26, wallH: 34, curve: 0.008, far: 150 };

const SAMPLE_HZ = 12;
const PLAYBACK_RATE = 4;
const MINOR_PENTATONIC = [0, 3, 5, 7, 10];
const ROOT_MIDI = 50;          // D3
const LOOP_NOTES = 8;

const hueFor = (speed: number) => 223 + (speed / MAX_SPEED) * 153; // depth blue → signal orange as speed rises
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function geometry(p: number, lockBlend: number) {
  const e = Math.min(1, p) * Math.min(1, p); // stays wide, tightens late
  const b = Math.min(1, Math.max(0, lockBlend));
  const out = {} as Record<keyof typeof OPEN, number>;
  for (const k of ["wBot", "wTop", "wallH", "curve", "far"] as const) {
    out[k] = mix(mix(OPEN[k], TIGHT[k], e), RING[k], b);
  }
  return out;
}

/* ============================ types ======================================= */

type Cut = {
  t: number; z: number; speed: number;
  midi: number; gain: number; dur: number; type: OscillatorType;
};
type LoopNote = { midi: number; gain: number; dur: number; type: OscillatorType; speed: number };
type Sample = { t: number; speed: number; breath: number };
type Pickup = { d: number; kind: "drink" | "yogurt"; taken: boolean; missed: boolean };
type LockCut = { depth: number; speed: number };
type Phase = "title" | "running" | "reveal";
type Ctx = CanvasRenderingContext2D;
type RunState = ReturnType<typeof freshRun>;
type Audio = NonNullable<ReturnType<typeof createAudio>>;

/* ============================ audio ======================================= */

const midiToHz = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

function createAudio() {
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();

  const master = ctx.createGain();
  master.gain.value = 0.32;

  // Inner groove distortion, roughly. Sweeps closed as you approach the label.
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 16000;
  tone.Q.value = 0.6;
  master.connect(tone);
  tone.connect(ctx.destination);

  const delay = ctx.createDelay(1.0);
  delay.delayTime.value = 0.27;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.34;
  const wet = ctx.createGain();
  wet.gain.value = 0.34;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(master);

  // Wind. Rises with speed. This is most of what sells first person.
  const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  noise.loop = true;
  const windFilter = ctx.createBiquadFilter();
  windFilter.type = "bandpass";
  windFilter.frequency.value = 400;
  windFilter.Q.value = 0.7;
  const windGain = ctx.createGain();
  windGain.gain.value = 0;
  noise.connect(windFilter);
  windFilter.connect(windGain);
  windGain.connect(master);
  noise.start();

  // Drone. Rises with total distance. The shimmer, heard.
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0;
  droneGain.connect(master);
  const a = ctx.createOscillator();
  const b = ctx.createOscillator();
  a.type = "sine";
  b.type = "sine";
  a.frequency.value = midiToHz(ROOT_MIDI - 12);
  b.frequency.value = midiToHz(ROOT_MIDI - 12) * 1.5 + 0.6; // slow beating
  a.connect(droneGain);
  b.connect(droneGain);
  a.start();
  b.start();

  return { ctx, master, tone, delay, droneGain, windGain, windFilter, nodes: [a, b, noise] };
}

function playNote(
  audio: Audio | null,
  midi: number,
  gain: number,
  dur: number,
  type: OscillatorType = "triangle",
  detune = 0,
) {
  if (!audio) return;
  const { ctx, master, delay } = audio;
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(midiToHz(midi), t);
  osc.detune.setValueAtTime(detune, t);
  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.linearRampToValueAtTime(gain, t + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(env);
  env.connect(master);
  env.connect(delay);
  osc.start(t);
  osc.stop(t + dur + 0.06);
}

/* ============================ state ======================================= */

function buildPickups() {
  const list: Pickup[] = [];
  let d = 120;
  let i = 0;
  while (d < MAX_SPEED * RUN_SECONDS * 1.05) {
    list.push({ d, kind: i % 3 === 2 ? "yogurt" : "drink", taken: false, missed: false });
    d += 58 + (i % 4) * 14;
    i++;
  }
  return list;
}

function freshRun() {
  return {
    t: 0,
    distance: 0,
    speed: 0,
    breath: MAX_BREATH,
    regen: 0,
    shimmer: 0,
    bobPhase: 0,
    melodyIndex: 2,
    sampleTimer: 0,
    cuts: [] as Cut[],   // the run proper: {t, z, speed, midi, gain, dur, type}
    samples: [] as Sample[], // speed at 12Hz, the shape of the path
    pickups: buildPickups(),
    flash: 0,

    locked: false,
    lockBlend: 0,
    lockTime: 0,
    lockZ: 0,          // where the ring begins in world space
    loopPos: 0,        // 0..LOOP_LEN, wraps
    laps: 0,
    lockCuts: new Map<number, LockCut>(), // loop position -> {depth, speed}
    lockLoop: [] as LoopNote[], // the last few notes of your run, cycling
    lockIndex: 0,
    still: 0,
    done: false,
  };
}

/* ============================ component =================================== */

export function TheGroove() {
  type Cam = ReturnType<typeof makeCamera>;
  type Pt = NonNullable<ReturnType<Cam["project"]>>;

  const [phase, setPhase] = useState<Phase>("title");
  const [inRing, setInRing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runRef = useRef(freshRun());
  const audioRef = useRef<Audio | null>(null);
  const holdRef = useRef(false);
  const revealRef = useRef({ t: 0, playIndex: 0, started: false });
  const [nonce, setNonce] = useState(0);

  // Only claim the spacebar once the run is underway. Mounted-but-unstarted,
  // the page keeps space-to-scroll for anyone who is just reading.
  useEffect(() => {
    if (phase !== "running") return;
    const down = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); holdRef.current = true; } };
    const up = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); holdRef.current = false; } };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      holdRef.current = false;
    };
  }, [phase]);

  useEffect(() => () => {
    const a = audioRef.current;
    if (!a) return;
    a.nodes.forEach((n) => { try { n.stop(); } catch { /* already stopped */ } });
    a.ctx.close();
    audioRef.current = null;
  }, []);

  useEffect(() => {
    if (phase === "title") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (phase === "running") { stepRun(dt); drawRun(g, canvas); }
      else { revealRef.current.t += dt; stepReveal(); drawReveal(g, canvas); }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, nonce]);

  /* --------------------------- simulation ------------------------------- */

  function stepRun(dt: number) {
    const r = runRef.current;
    const audio = audioRef.current;
    r.t += dt;
    r.flash = Math.max(0, r.flash - dt * 3);

    const empty = r.breath <= 0;
    const ceiling = empty ? WALK_SPEED : MAX_SPEED;
    if (holdRef.current) r.speed = Math.min(ceiling, r.speed + ACCEL * dt);
    else r.speed = Math.max(0, r.speed - FRICTION * dt);
    if (r.speed > ceiling) r.speed = Math.max(ceiling, r.speed - FRICTION * dt);

    const effort = r.speed / MAX_SPEED;

    if (!r.locked && r.t >= RUN_SECONDS) enterLock();

    if (r.locked) {
      r.lockBlend = Math.min(1, r.lockBlend + dt / LOCK_BLEND);
      r.lockTime += dt;
      r.loopPos += r.speed * dt;
      if (r.loopPos >= LOOP_LEN) { r.loopPos -= LOOP_LEN; r.laps++; }
      if (r.speed < 0.5) r.still += dt; else r.still = 0;
      if (r.still >= LET_GO_TIME && !r.done) { r.done = true; letGo(); return; }
    } else {
      r.distance += r.speed * dt;
    }

    if (!r.locked) {
      r.breath -= BREATH_DRAIN * effort * effort * dt;
      if (r.speed <= WALK_SPEED + 0.01) r.breath += BREATH_REGEN * dt;
      if (r.regen > 0) { r.regen -= dt; r.breath += 14 * dt; }
      r.breath = Math.max(0, Math.min(MAX_BREATH, r.breath));
    }

    if (!r.locked) {
      r.shimmer = Math.min(1, r.distance / (MAX_SPEED * RUN_SECONDS * 0.55));
    }

    // Footfalls. Each half cycle of the bob is one step, so the camera dip,
    // the note, and the mark all land on the same instant.
    const prev = r.bobPhase;
    if (r.speed > 0.5) r.bobPhase += (3 + effort * 11) * dt;
    if (Math.floor(r.bobPhase / Math.PI) > Math.floor(prev / Math.PI)) {
      if (r.locked) lockFootfall();
      else footfall(effort, empty);
    }

    if (!r.locked) {
      for (const p of r.pickups) {
        if (p.taken || p.missed) continue;
        if (r.distance >= p.d) {
          if (r.speed <= GRAB_SPEED) {
            p.taken = true;
            r.flash = 1;
            if (p.kind === "drink") {
              r.breath = Math.min(MAX_BREATH, r.breath + 32);
              playNote(audio, ROOT_MIDI + 24, 0.22, 0.5, "square");
            } else {
              r.regen = 4.5;
              playNote(audio, ROOT_MIDI + 12, 0.18, 1.4, "sine");
              playNote(audio, ROOT_MIDI + 19, 0.14, 1.6, "sine");
            }
          } else {
            p.missed = true;
          }
        }
      }
    }

    if (audio) {
      const now = audio.ctx.currentTime;
      audio.droneGain.gain.setTargetAtTime(0.02 + r.shimmer * 0.09, now, 0.4);
      audio.windGain.gain.setTargetAtTime(effort * effort * 0.16, now, 0.12);
      audio.windFilter.frequency.setTargetAtTime(300 + effort * 1400, now, 0.15);
      // Toward the label the sound gets duller, and in the ring it wavers.
      const p = Math.min(1, r.t / RUN_SECONDS);
      const wobble = r.locked ? Math.sin(r.lockTime * 1.7) * 220 : 0;
      const cutoff = mix(15000, 2600, p * p) - r.lockBlend * 700 + wobble;
      audio.tone.frequency.setTargetAtTime(Math.max(700, cutoff), now, 0.3);
    }

    r.sampleTimer -= dt;
    if (r.sampleTimer <= 0 && !r.locked) {
      r.sampleTimer = 1 / SAMPLE_HZ;
      r.samples.push({ t: r.t, speed: r.speed, breath: r.breath });
    }
  }

  function enterLock() {
    const r = runRef.current;
    r.locked = true;
    r.lockZ = r.distance;
    r.loopPos = 0;
    r.breath = MAX_BREATH;   // the ring costs nothing. That is the trap.
    setInRing(true);         // drops the HOLD TO RUN footer
    r.lockLoop = r.cuts.slice(-LOOP_NOTES);
    if (r.lockLoop.length === 0) {
      r.lockLoop = [{ midi: ROOT_MIDI, gain: 0.1, dur: 0.6, type: "triangle", speed: 4 }];
    }
  }

  function letGo() {
    const r = runRef.current;
    const audio = audioRef.current;
    if (audio) {
      const now = audio.ctx.currentTime;
      audio.droneGain.gain.setTargetAtTime(0, now, 0.6);
      audio.windGain.gain.setTargetAtTime(0, now, 0.5);
      audio.tone.frequency.setTargetAtTime(15000, now, 0.8);
    }
    revealRef.current = { t: 0, playIndex: 0, started: false };
    setPhase("reveal");
  }

  function footfall(effort: number, empty: boolean) {
    const r = runRef.current;
    // The melody wanders rather than jumping, so the record has a shape you
    // could hum back.
    r.melodyIndex += Math.round(Math.random() * 2 - 1);
    r.melodyIndex = Math.max(0, Math.min(MINOR_PENTATONIC.length - 1, r.melodyIndex));

    const octave = empty ? 0 : Math.floor(effort * 2.99) * 12;
    const midi = ROOT_MIDI + octave + MINOR_PENTATONIC[r.melodyIndex];
    const gain = 0.06 + effort * 0.13;
    const dur = 0.35 + (1 - effort) * 0.6;
    const type = effort > 0.66 ? "sawtooth" : "triangle";

    playNote(audioRef.current, midi, gain, dur, type);
    r.cuts.push({ t: r.t, z: r.distance + CARVE_AHEAD, speed: r.speed, midi, gain, dur, type });
  }

  function lockFootfall() {
    const r = runRef.current;
    const n = r.lockLoop[r.lockIndex % r.lockLoop.length];
    r.lockIndex++;
    // Each lap wears the groove a little further out of true.
    const detune = Math.min(60, r.laps * 7) * (Math.random() * 2 - 1);
    playNote(audioRef.current, n.midi, n.gain, n.dur, n.type, detune);

    const key = Math.round((r.loopPos + CARVE_AHEAD) % LOOP_LEN);
    const existing = r.lockCuts.get(key);
    if (existing) {
      existing.depth = Math.min(6, existing.depth + 1);
      existing.speed = Math.max(existing.speed, r.speed);
    } else {
      r.lockCuts.set(key, { depth: 1, speed: r.speed });
    }
  }

  function stepReveal() {
    const rev = revealRef.current;
    const r = runRef.current;
    if (rev.t < 5.4) return;
    rev.started = true;
    const playT = (rev.t - 5.4) * PLAYBACK_RATE;
    while (rev.playIndex < r.cuts.length && r.cuts[rev.playIndex].t <= playT) {
      const c = r.cuts[rev.playIndex];
      playNote(audioRef.current, c.midi, c.gain * 0.9, c.dur, c.type);
      rev.playIndex++;
    }
  }

  /* --------------------------- projection -------------------------------- */
  // The camera is a closure over run state; let its own shape be the type.

  function makeCamera(w: number, h: number, r: RunState) {
    const effort = r.speed / MAX_SPEED;
    const bobY = -Math.abs(Math.sin(r.bobPhase)) * (2 + effort * 5);
    const roll = Math.sin(r.bobPhase / 2) * 0.01 * effort;
    const focal = FOCAL * (w / 800);
    const horizon = h * HORIZON + bobY;
    const gm = geometry(r.t / RUN_SECONDS, r.lockBlend);
    const camZ = r.locked ? r.lockZ + r.loopPos : r.distance;
    const reach = 42 + effort * 460;
    const drain = r.breath <= 0 ? 0.22 : 1;
    return {
      w, h, focal, horizon, camZ, roll, reach, drain,
      wBot: gm.wBot, wTop: gm.wTop, wallH: gm.wallH, curve: gm.curve, far: gm.far,
      hue: hueFor(r.speed),
      sat: 88,
      project(x: number, y: number, z: number) {
        const dz = z - camZ;
        if (dz < NEAR) return null;
        const s = focal / dz;
        return { x: w / 2 + (x - dz * dz * gm.curve) * s, y: horizon + (CAM_H - y) * s, dz, s };
      },
      tone(dz: number, light: number, alpha = 1) {
        const near = Math.max(0, Math.min(1, 1 - dz / reach));
        const fog = Math.max(0.1, 1 - dz / gm.far);
        return `hsla(${this.hue}, ${(this.sat * near * drain).toFixed(1)}%, ${(light * fog).toFixed(1)}%, ${alpha})`;
      },
    };
  }

  function polyline(
    g: Ctx, cam: Cam, x: number, y: number,
    from: number, to: number, stepZ: number,
  ) {
    g.beginPath();
    let started = false;
    for (let z = from; z <= to; z += stepZ) {
      const p = cam.project(x, y, z);
      if (!p) continue;
      if (!started) { g.moveTo(p.x, p.y); started = true; }
      else g.lineTo(p.x, p.y);
    }
    g.stroke();
  }

  /* --------------------------- drawing: run ------------------------------ */

  function drawRun(g: Ctx, canvas: HTMLCanvasElement) {
    const r = runRef.current;
    const { width: w, height: h } = fit(canvas, g);
    const cam = makeCamera(w, h, r);
    const near = cam.camZ + NEAR;
    const far = cam.camZ + cam.far;

    g.save();
    g.translate(w / 2, h / 2);
    g.rotate(cam.roll);
    g.translate(-w / 2, -h / 2);

    g.fillStyle = "#050506";
    g.fillRect(-w, -h, w * 3, h * 3);

    const vp = cam.project(0, 0, far);
    if (vp) {
      const glow = g.createRadialGradient(vp.x, vp.y, 0, vp.x, vp.y, w * 0.34);
      glow.addColorStop(0, cam.tone(0, 26, 0.5));
      glow.addColorStop(1, "hsla(0,0%,0%,0)");
      g.fillStyle = glow;
      g.fillRect(0, 0, w, h);
    }

    drawWall(g, cam, -1, near, far);
    drawWall(g, cam, 1, near, far);
    drawFloor(g, cam, near, far);
    if (r.locked) drawLockCuts(g, cam, r); else drawRunCuts(g, cam, r);
    drawTip(g, cam, r);
    if (!r.locked) drawPickups(g, cam, r);
    drawShimmer(g, cam, r);

    g.restore();

    const vig = g.createRadialGradient(w / 2, h * 0.55, h * 0.25, w / 2, h * 0.55, h * 0.95);
    vig.addColorStop(0, "hsla(0,0%,0%,0)");
    vig.addColorStop(1, `hsla(0,0%,0%,${0.82 + r.lockBlend * 0.1})`);
    g.fillStyle = vig;
    g.fillRect(0, 0, w, h);

    if (r.flash > 0) {
      g.fillStyle = `hsla(${cam.hue}, 60%, 70%, ${r.flash * 0.13})`;
      g.fillRect(0, 0, w, h);
    }

    drawHud(g, cam, r, w, h);
  }

  function drawWall(g: Ctx, cam: Cam, side: number, near: number, far: number) {
    const bottom: Pt[] = [];
    const top: Pt[] = [];
    for (let z = near; z <= far; z += 6) {
      const b = cam.project(side * cam.wBot, 0, z);
      const t = cam.project(side * cam.wTop, cam.wallH, z);
      if (b && t) { bottom.push(b); top.push(t); }
    }
    if (bottom.length < 2) return;

    g.beginPath();
    g.moveTo(bottom[0].x, bottom[0].y);
    for (const p of bottom) g.lineTo(p.x, p.y);
    for (let i = top.length - 1; i >= 0; i--) g.lineTo(top[i].x, top[i].y);
    g.closePath();
    const grad = g.createLinearGradient(0, cam.horizon, 0, cam.h);
    grad.addColorStop(0, cam.tone(220, 9));
    grad.addColorStop(1, cam.tone(20, 15));
    g.fillStyle = grad;
    g.fill();

    // Longitudinal striations: the wall's own grain, and what makes speed
    // legible in peripheral vision.
    for (let i = 0; i <= 6; i++) {
      const f = i / 6;
      g.lineWidth = 1;
      g.strokeStyle = cam.tone(40, 16 + f * 26, 0.55);
      polyline(g, cam, side * mix(cam.wBot, cam.wTop, f), f * cam.wallH, near, far, 8);
    }

    for (let z = Math.ceil(near / 16) * 16; z < far; z += 16) {
      const b = cam.project(side * cam.wBot, 0, z);
      const t = cam.project(side * cam.wTop, cam.wallH, z);
      if (!b || !t) continue;
      g.strokeStyle = cam.tone(b.dz, 24, 0.3);
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(b.x, b.y);
      g.lineTo(t.x, t.y);
      g.stroke();
    }
  }

  function drawFloor(g: Ctx, cam: Cam, near: number, far: number) {
    const pts: [Pt, Pt][] = [];
    for (let z = near; z <= far; z += 8) {
      const l = cam.project(-cam.wBot, 0, z);
      const rr = cam.project(cam.wBot, 0, z);
      if (l && rr) pts.push([l, rr]);
    }
    if (pts.length > 1) {
      g.beginPath();
      g.moveTo(pts[0][0].x, pts[0][0].y);
      for (const [l] of pts) g.lineTo(l.x, l.y);
      for (let i = pts.length - 1; i >= 0; i--) g.lineTo(pts[i][1].x, pts[i][1].y);
      g.closePath();
      g.fillStyle = cam.tone(60, 7);
      g.fill();
    }
    for (let z = Math.ceil(near / 10) * 10; z < far; z += 10) {
      const a = cam.project(-cam.wBot, 0, z);
      const b = cam.project(cam.wBot, 0, z);
      if (!a || !b) continue;
      g.strokeStyle = cam.tone(a.dz, 13, 0.5);
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(a.x, a.y);
      g.lineTo(b.x, b.y);
      g.stroke();
    }
  }

  function mark(g: Ctx, cam: Cam, z: number, speed: number, depth: number) {
    const dz = z - cam.camZ;
    const e = speed / MAX_SPEED;
    const span = cam.wBot * (0.45 + e * 0.5);
    const a = cam.project(-span, 0, z);
    const b = cam.project(span, 0, z);
    if (!a || !b) return;
    g.strokeStyle = cam.tone(dz, 42 + e * 40 + depth * 6, 0.9);
    g.lineWidth = (1.4 + e * 3.4 + depth * 1.1) * a.s * 0.09;
    g.beginPath();
    g.moveTo(a.x, a.y);
    g.lineTo(b.x, b.y);
    g.stroke();
  }

  function drawRunCuts(g: Ctx, cam: Cam, r: RunState) {
    // Cuts are in z order, so once one is behind us everything before it is too.
    for (let i = r.cuts.length - 1; i >= 0; i--) {
      const c = r.cuts[i];
      const dz = c.z - cam.camZ;
      if (dz < NEAR) break;
      if (dz > CARVE_AHEAD + 4) continue;
      mark(g, cam, c.z, c.speed, 0);
    }
  }

  function drawLockCuts(g: Ctx, cam: Cam, r: RunState) {
    // In the ring, every mark comes back around. Draw each at its distance
    // ahead of you within one lap.
    for (const [key, c] of r.lockCuts) {
      let dz = (key - r.loopPos + LOOP_LEN * 2) % LOOP_LEN;
      if (dz < NEAR || dz > CARVE_AHEAD + 4) continue;
      mark(g, cam, cam.camZ + dz, c.speed, c.depth);
    }
  }

  function drawTip(g: Ctx, cam: Cam, r: RunState) {
    const tip = cam.project(0, 0, cam.camZ + CARVE_AHEAD);
    if (!tip) return;
    const e = r.speed / MAX_SPEED;
    const rad = 6 + e * 20;
    const glow = g.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, rad);
    glow.addColorStop(0, cam.tone(0, 76, 0.75));
    glow.addColorStop(1, "hsla(0,0%,0%,0)");
    g.fillStyle = glow;
    g.beginPath();
    g.arc(tip.x, tip.y, rad, 0, Math.PI * 2);
    g.fill();
  }

  function drawPickups(g: Ctx, cam: Cam, r: RunState) {
    for (const p of r.pickups) {
      if (p.taken) continue;
      const dz = p.d - r.distance;
      if (dz < NEAR || dz > cam.far * 0.55) continue;
      const base = cam.project(cam.wBot * 0.52, 0, p.d);
      const top = cam.project(cam.wBot * 0.52, 9, p.d);
      if (!base || !top) continue;
      const wide = Math.max(2, (base.y - top.y) * 0.34);
      const alpha = p.missed ? 0.12 : 1;

      if (p.kind === "drink") {
        g.fillStyle = p.missed ? "hsla(0,0%,60%,0.12)" : cam.tone(dz, 62, alpha);
        g.fillRect(base.x - wide / 2, top.y, wide, base.y - top.y);
      } else {
        g.fillStyle = p.missed ? "hsla(0,0%,60%,0.12)" : cam.tone(dz, 74, alpha);
        g.beginPath();
        g.moveTo(base.x - wide * 0.6, base.y);
        g.lineTo(base.x - wide * 0.42, top.y);
        g.lineTo(base.x + wide * 0.42, top.y);
        g.lineTo(base.x + wide * 0.6, base.y);
        g.closePath();
        g.fill();
      }
      if (!p.missed && dz < 130) {
        g.strokeStyle = r.speed <= GRAB_SPEED ? cam.tone(dz, 58, 0.65) : "hsla(6,70%,58%,0.4)";
        g.lineWidth = 1.5;
        g.beginPath();
        g.ellipse(base.x, base.y, wide * 1.5, wide * 0.42, 0, 0, Math.PI * 2);
        g.stroke();
      }
    }
  }

  function drawShimmer(g: Ctx, cam: Cam, r: RunState) {
    if (r.shimmer <= 0.03) return;
    const count = Math.floor(r.shimmer * 70);
    for (let i = 0; i < count; i++) {
      const seed = i * 71.31;
      const z = cam.camZ + ((seed * 13 - r.distance * 0.4 - r.loopPos * 0.4) % (cam.far * 0.6)) + NEAR;
      const p = cam.project(((seed * 29) % (cam.wTop * 2)) - cam.wTop, ((seed * 17) % cam.wallH) + 4, z);
      if (!p) continue;
      const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(r.t * 2.2 + i));
      g.fillStyle = `hsla(${cam.hue + 40}, 55%, 82%, ${twinkle * r.shimmer * 0.5})`;
      const s = Math.max(1, p.s * 0.5);
      g.fillRect(p.x, p.y, s, s);
    }
  }

  // Fades in, holds, fades out. Zero outside its window.
  function hintFade(age: number) {
    if (age <= 0 || age >= HINT_LEN) return 0;
    const u = age / HINT_LEN;
    return Math.min(u / 0.18, 1, (1 - u) / 0.28) * 0.6;
  }

  function drawHud(g: Ctx, cam: Cam, r: RunState, w: number, h: number) {
    const mono = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";
    const bx = 22, by = 32, bw = Math.min(200, w * 0.4);

    if (!r.locked) {
      const p = Math.min(1, r.t / RUN_SECONDS);
      g.fillStyle = "hsla(0,0%,100%,0.07)";
      g.fillRect(0, 0, w, 2);
      g.fillStyle = cam.tone(0, 58);
      g.fillRect(0, 0, w * p, 2);
    }

    g.font = `11px ${mono}`;
    if (!r.locked) {
      g.fillStyle = "hsla(0,0%,100%,0.09)";
      g.fillRect(bx, by, bw, 4);
      const bf = r.breath / MAX_BREATH;
      g.fillStyle = bf < 0.2 ? "hsl(6,78%,58%)" : "hsla(0,0%,100%,0.7)";
      g.fillRect(bx, by, bw * bf, 4);
      g.fillStyle = "hsla(0,0%,100%,0.42)";
      g.fillText("BREATH", bx, by - 8);
    }
    g.fillStyle = "hsla(0,0%,100%,0.42)";

    g.textAlign = "right";
    // Distance stops counting in the ring. That is the point of the ring.
    g.fillText(r.locked ? `LAP ${r.laps + 1}` : `${Math.floor(r.distance)} M`, w - 22, by - 8);
    g.fillStyle = `hsla(${cam.hue + 40}, 55%, 80%, ${0.28 + r.shimmer * 0.6})`;
    g.fillText(`SHIMMER ${Math.round(r.shimmer * 100)}%`, w - 22, by + 8);
    g.textAlign = "left";

    if (r.breath <= 0 && !r.locked) {
      g.font = `12px ${mono}`;
      g.fillStyle = "hsla(0,0%,100%,0.45)";
      g.fillText("out of breath. walk it back.", bx, by + 26);
    }

    // Stopping has never been presented as an action, so we say it once,
    // after the loop has had time to read as a loop, and then never again.
    const fade = r.locked
      ? Math.max(hintFade(r.lockTime - HINT_AT), hintFade(r.lockTime - HINT_AGAIN))
      : 0;
    if (fade > 0.002) {
      g.textAlign = "center";
      g.font = `13px ${mono}`;
      g.fillStyle = `hsla(0,0%,100%,${fade.toFixed(3)})`;
      g.fillText("let go", w / 2, h - 42);
      g.textAlign = "left";
    }
  }

  /* ------------------------- drawing: final cut -------------------------- */

  function drawReveal(g: Ctx, canvas: HTMLCanvasElement) {
    const r = runRef.current;
    const rev = revealRef.current;
    const { width: w, height: h } = fit(canvas, g);
    const mono = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

    g.fillStyle = "#07070a";
    g.fillRect(0, 0, w, h);

    const n = r.samples.length;
    if (n < 2) return;
    const cx = w / 2, cy = h * 0.40;
    const rOut = Math.min(w, h) * 0.34;
    const rIn = rOut * 0.28;
    const turns = 7;
    const at = (p: number) => {
      const ang = p * turns * Math.PI * 2 - Math.PI / 2;
      const rad = rOut - p * (rOut - rIn);
      return { x: cx + Math.cos(ang) * rad, y: cy + Math.sin(ang) * rad, ang, rad };
    };

    g.fillStyle = "#101014";
    g.beginPath();
    g.arc(cx, cy, rOut * 1.07, 0, Math.PI * 2);
    g.fill();

    const drawn = Math.min(1, Math.max(0, (rev.t - 0.9) / 3.5));

    for (let i = 1; i <= Math.floor(drawn * (n - 1)); i++) {
      const a = at((i - 1) / (n - 1));
      const b = at(i / (n - 1));
      const e = r.samples[i].speed / MAX_SPEED;
      g.strokeStyle = `hsl(${hueFor(r.samples[i].speed)}, ${(e * 85 + 10).toFixed(0)}%, ${(24 + e * 44).toFixed(0)}%)`;
      g.lineWidth = 0.8 + e * 3.2;
      g.beginPath();
      g.moveTo(a.x, a.y);
      g.lineTo(b.x, b.y);
      g.stroke();
    }

    // Every footfall, as a notch. These are the marks you watched sweep under
    // you and could never look back at.
    for (const c of r.cuts) {
      const p = c.t / RUN_SECONDS;
      if (p > drawn) continue;
      const pt = at(p);
      const e = c.speed / MAX_SPEED;
      const len = 1.5 + e * 4;
      g.strokeStyle = `hsla(${hueFor(c.speed)}, ${(e * 80 + 20).toFixed(0)}%, ${(52 + e * 30).toFixed(0)}%, 0.85)`;
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(pt.x + Math.cos(pt.ang) * len, pt.y + Math.sin(pt.ang) * len);
      g.lineTo(pt.x - Math.cos(pt.ang) * len, pt.y - Math.sin(pt.ang) * len);
      g.stroke();
    }

    // The locked groove: a single hard ring, brighter the longer you stayed.
    if (drawn >= 1 && r.lockTime > 0) {
      const wear = Math.min(1, r.lockTime / 30);
      g.strokeStyle = `hsla(${hueFor(MAX_SPEED * 0.6)}, ${(30 + wear * 55).toFixed(0)}%, ${(48 + wear * 34).toFixed(0)}%, 0.9)`;
      g.lineWidth = 1 + wear * 4;
      g.beginPath();
      g.arc(cx, cy, rIn, 0, Math.PI * 2);
      g.stroke();
    }

    g.fillStyle = "#191920";
    g.beginPath();
    g.arc(cx, cy, rIn * 0.78, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "hsla(0,0%,100%,0.28)";
    g.font = `10px ${mono}`;
    g.textAlign = "center";
    g.fillText(`${Math.floor(r.distance)} M`, cx, cy - 6);
    g.fillText(`${r.cuts.length} STEPS`, cx, cy + 8);
    if (r.laps > 0) g.fillText(`${r.laps} LAPS`, cx, cy + 22);
    g.textAlign = "left";

    if (rev.started) {
      const prog = Math.min(1, ((rev.t - 5.4) * PLAYBACK_RATE) / RUN_SECONDS);
      const pt = at(prog);
      g.strokeStyle = "hsla(0,0%,100%,0.6)";
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(cx + rOut * 1.55, cy - rOut * 0.95);
      g.lineTo(pt.x, pt.y);
      g.stroke();
      g.fillStyle = "hsla(0,0%,100%,0.92)";
      g.beginPath();
      g.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
      g.fill();
    }

    if (rev.t > 4.4) {
      const fade = Math.min(1, (rev.t - 4.4) / 1.1);
      g.textAlign = "center";
      g.fillStyle = `hsla(40, 24%, 92%, ${0.92 * fade})`;
      g.font = `700 ${Math.min(26, w * 0.045)}px 'Syne', ui-sans-serif, system-ui, sans-serif`;
      g.fillText("You were never in a canyon", cx, h - 110);
      g.fillStyle = `hsla(16, 82%, 51%, ${0.78 * fade})`;
      g.font = `600 12px ${mono}`;
      g.fillText("You cut your own path", cx, h - 84);
      g.textAlign = "left";
    }
  }

  /* ----------------------------- plumbing -------------------------------- */

  function fit(canvas: HTMLCanvasElement, g: Ctx) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { width: w, height: h };
  }

  function begin() {
    if (!audioRef.current) audioRef.current = createAudio();
    const a = audioRef.current;
    if (a) {
      if (a.ctx.state === "suspended") a.ctx.resume();
      a.tone.frequency.setValueAtTime(15000, a.ctx.currentTime);
    }
    runRef.current = freshRun();
    revealRef.current = { t: 0, playIndex: 0, started: false };
    setInRing(false);
    setNonce((k) => k + 1);
    setPhase("running");
  }

  const holdOn = (e: React.PointerEvent) => { e.preventDefault(); holdRef.current = true; };
  const holdOff = (e: React.PointerEvent) => { e.preventDefault(); holdRef.current = false; };

  return (
    <div
      className={styles.frame}
      role="application"
      aria-label="The Groove, a running game. Hold to run."
      tabIndex={0}
    >
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onPointerDown={holdOn}
        onPointerUp={holdOff}
        onPointerLeave={holdOff}
        onPointerCancel={holdOff}
      />

      {phase === "title" && (
        <div className={styles.title}>
          <h1 className={styles.titleHeading}>The Groove</h1>
          <p className={styles.titleBody}>
            You are the needle. Hold to run &mdash; every footfall cuts a mark into the
            floor ahead of you, and it sweeps under before you can look. Speed heats
            the canyon and spends breath; distance brings the shimmer back. Ease down
            to a walk for a drink or a yogurt &mdash; nothing gets picked up at a sprint.
          </p>
          <p className={styles.titleNote}>sound on</p>
          <button type="button" onClick={begin} className={styles.button}>
            Start running
          </button>
        </div>
      )}

      {phase === "reveal" && (
        <div className={styles.replay}>
          <button type="button" onClick={begin} className={styles.button}>
            Cut another side
          </button>
        </div>
      )}

      {phase === "running" && !inRing && (
        <div className={styles.hint} aria-hidden="true">
          HOLD TO RUN
        </div>
      )}
    </div>
  );
}
