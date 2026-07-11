"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ResolvedTrack } from "@/lib/music/itunes";
import { gradientFor } from "@/lib/cover-gradient";
import styles from "./cover-flow.module.css";

/**
 * A Cover Flow tribute to iTunes 7 — CSS 3D covers with reflections, a
 * brushed-metal-ish transport bar, and an LCD readout — rebuilt with the
 * site's own design tokens. One shared <audio> element plays Apple's ~30s
 * previews; playback only ever starts from a user gesture.
 *
 * Navigation: click a side cover, drag, horizontal scroll, or ← → keys.
 * The track list below is the zero-3D, fully keyboard-accessible path.
 */

const DRAG_STEP_PX = 90;
const WHEEL_STEP = 60;
const VISIBLE_EACH_SIDE = 6;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function CoverFlow({ tracks }: { tracks: ResolvedTrack[] }) {
  const [active, setActive] = useState(() => Math.floor(tracks.length / 2));
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(30);
  const [notice, setNotice] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const draggedRef = useRef(false);

  const activeTrack = tracks[active];
  const playingTrack = tracks.find((t) => t.itunesId === playingId) ?? null;
  const isPlaying = playingId !== null;

  const step = useCallback(
    (delta: number) => {
      setActive((a) => Math.min(tracks.length - 1, Math.max(0, a + delta)));
    },
    [tracks.length],
  );

  const ensureAudio = useCallback(() => {
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio();
      audio.preload = "none";
      audio.addEventListener("timeupdate", () => {
        setElapsed(audio!.currentTime);
        if (Number.isFinite(audio!.duration) && audio!.duration > 0) {
          setDuration(audio!.duration);
        }
      });
      audio.addEventListener("ended", () => {
        setPlayingId(null);
        setElapsed(0);
      });
      audio.addEventListener("error", () => {
        setPlayingId(null);
        setNotice("preview unavailable - Apple's CDN said no");
      });
      audioRef.current = audio;
    }
    return audio;
  }, []);

  const playToggle = useCallback(
    (track: ResolvedTrack) => {
      setNotice(null);
      const audio = ensureAudio();

      if (playingId === track.itunesId) {
        audio.pause();
        setPlayingId(null);
        return;
      }
      if (!track.previewUrl) {
        audio.pause();
        setPlayingId(null);
        setNotice("no preview available for this one");
        return;
      }
      audio.src = track.previewUrl;
      audio.currentTime = 0;
      setElapsed(0);
      setDuration(30);
      audio
        .play()
        .then(() => setPlayingId(track.itunesId))
        .catch(() => setNotice("preview unavailable - Apple's CDN said no"));
    },
    [ensureAudio, playingId],
  );

  // Stop the preview when leaving the page.
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Horizontal wheel/trackpad navigation. Native listener because React
  // registers wheel as passive; we only preventDefault on horizontal intent
  // so vertical page scrolling is never hijacked.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let acc = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      acc += e.deltaX;
      while (Math.abs(acc) >= WHEEL_STEP) {
        step(Math.sign(acc));
        acc -= Math.sign(acc) * WHEEL_STEP;
      }
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [step]);

  // Pointer drag: one cover per DRAG_STEP_PX of horizontal travel.
  const dragState = useRef<{ startX: number; startActive: number } | null>(
    null,
  );
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragState.current = { startX: e.clientX, startActive: active };
    draggedRef.current = false;
    stageRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 8) draggedRef.current = true;
    const target = drag.startActive - Math.round(dx / DRAG_STEP_PX);
    setActive(Math.min(tracks.length - 1, Math.max(0, target)));
  };
  const onPointerUp = () => {
    dragState.current = null;
    // Let the click that follows a drag see draggedRef before clearing it.
    setTimeout(() => {
      draggedRef.current = false;
    }, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        step(-1);
        break;
      case "ArrowRight":
        e.preventDefault();
        step(1);
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(tracks.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeTrack) playToggle(activeTrack);
        break;
    }
  };

  // LCD copy — also the aria-live region announcing selection/playback.
  const lcdTop = playingTrack
    ? `▶ ${playingTrack.title} — ${playingTrack.artist}`
    : activeTrack
      ? `${activeTrack.title} — ${activeTrack.artist}`
      : "—";
  const lcdBottom =
    notice ??
    (playingTrack
      ? `${formatTime(elapsed)} / ${formatTime(duration)}`
      : "click the center cover to play a 30s preview");

  return (
    <div className={styles.player}>
      {/* transport + LCD, the toolbar tribute */}
      <div className={styles.toolbar}>
        <div className={styles.transport}>
          <button
            type="button"
            className={styles.transportBtn}
            onClick={() => step(-1)}
            disabled={active === 0}
            aria-label="Previous cover"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 3h2v10H4zM13 3v10L6.5 8z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.transportBtn} ${styles.playBtn}`}
            onClick={() => activeTrack && playToggle(activeTrack)}
            aria-label={isPlaying ? "Pause preview" : "Play 30 second preview"}
          >
            {isPlaying ? (
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 3h3v10H4zM9 3h3v10H9z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M5 3l8 5-8 5z" fill="currentColor" />
              </svg>
            )}
          </button>
          <button
            type="button"
            className={styles.transportBtn}
            onClick={() => step(1)}
            disabled={active === tracks.length - 1}
            aria-label="Next cover"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M10 3h2v10h-2zM3 3v10l6.5-5z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <div className={styles.lcd} aria-live="polite">
          <span className={styles.lcdTop}>{lcdTop}</span>
          <span className={styles.lcdBottom}>{lcdBottom}</span>
          <span
            className={styles.lcdProgress}
            style={{
              transform: `scaleX(${
                playingTrack && duration > 0 ? elapsed / duration : 0
              })`,
            }}
            aria-hidden="true"
          />
        </div>
        <div className={styles.toolbarSpacer} aria-hidden="true" />
      </div>

      {/* the flow itself */}
      <div
        ref={stageRef}
        className={styles.stage}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Album covers. Use left and right arrow keys to browse, Enter to play a preview."
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className={styles.covers}>
          {tracks.map((t, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            const sign = Math.sign(offset);
            if (abs > VISIBLE_EACH_SIDE + 1) return null;
            return (
              <button
                key={t.itunesId}
                type="button"
                tabIndex={-1}
                className={`${styles.cover} ${offset === 0 ? styles.coverActive : ""}`}
                style={
                  {
                    "--sign": sign,
                    "--abs": abs,
                    zIndex: 100 - abs,
                    visibility: abs > VISIBLE_EACH_SIDE ? "hidden" : "visible",
                  } as React.CSSProperties
                }
                onClick={() => {
                  if (draggedRef.current) return;
                  if (offset === 0) playToggle(t);
                  else setActive(i);
                }}
                aria-label={
                  offset === 0
                    ? `${playingId === t.itunesId ? "Pause" : "Play"} preview of ${t.title} by ${t.artist}`
                    : `Bring ${t.title} by ${t.artist} to the front`
                }
              >
                <span className={styles.art}>
                  <CoverArt track={t} />
                </span>
                <span className={styles.reflection} aria-hidden="true">
                  <CoverArt track={t} />
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.caption}>
          {activeTrack ? (
            <>
              <span className={styles.captionTitle}>{activeTrack.title}</span>
              <span className={styles.captionMeta}>
                {activeTrack.artist}
                {activeTrack.albumName ? ` - ${activeTrack.albumName}` : ""}
                {activeTrack.releaseYear ? ` · ${activeTrack.releaseYear}` : ""}
              </span>
              {activeTrack.note ? (
                <span className={styles.captionNote}>{activeTrack.note}</span>
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      <p className={styles.hint} aria-hidden="true">
        ← → to flip · enter to play · drag works too · sound on
      </p>

      {/* the source-list tribute: fully accessible, zero-3D path */}
      <ol className={styles.trackList}>
        <li className={styles.listHead} aria-hidden="true">
          <span />
          <span>name</span>
          <span className={styles.colArtist}>artist</span>
          <span className={styles.colAlbum}>album</span>
          <span className={styles.colTime}>time</span>
        </li>
        {tracks.map((t, i) => {
          const rowPlaying = playingId === t.itunesId;
          return (
            <li key={t.itunesId}>
              <button
                type="button"
                className={`${styles.row} ${i === active ? styles.rowActive : ""}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => {
                  setActive(i);
                  playToggle(t);
                }}
                aria-label={`${rowPlaying ? "Pause" : "Play"} ${t.title} by ${t.artist}`}
              >
                <span className={styles.rowNum}>
                  {rowPlaying ? (
                    <svg
                      viewBox="0 0 12 12"
                      className={styles.speaker}
                      aria-hidden="true"
                    >
                      <path
                        d="M1 4h2.5L7 1v10L3.5 8H1z M8.5 3.5a3.5 3.5 0 010 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path d="M1 4h2.5L7 1v10L3.5 8H1z" fill="currentColor" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className={styles.rowName}>
                  {t.title}
                  <span className={styles.rowArtistInline}>{t.artist}</span>
                </span>
                <span className={styles.colArtist}>{t.artist}</span>
                <span className={styles.colAlbum}>{t.albumName ?? "—"}</span>
                <span className={styles.colTime}>
                  {t.durationMs ? formatTime(t.durationMs / 1000) : "—"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function CoverArt({ track }: { track: ResolvedTrack }) {
  if (track.artworkUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={track.artworkUrl}
        alt=""
        draggable={false}
        width={600}
        height={600}
      />
    );
  }
  return (
    <span
      className={styles.artFallback}
      style={{ backgroundImage: gradientFor(`${track.artist}-${track.title}`) }}
    >
      <span>{track.title}</span>
      <span>{track.artist}</span>
    </span>
  );
}
