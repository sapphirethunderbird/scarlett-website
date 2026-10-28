"use client";

import { useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import styles from "./ask-widget.module.css";

type Msg = { role: "user" | "assistant"; content: string };

export function AskWidget({ copy }: { copy: Dictionary["home"]["ask"] }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function scrollToEnd() {
    requestAnimationFrame(() => {
      const el = logRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  async function ask(text: string) {
    const trimmed = text.trim();
    if (busy || !trimmed) return;
    setBusy(true);

    const nextHistory: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextHistory);
    setValue("");
    scrollToEnd();

    try {
      // Preserve the existing backend contract: POST { messages }, expect
      // an Anthropic-style { content: [{ type: "text", text }] } response.
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextHistory }),
      });
      if (!res.ok) throw new Error("status " + res.status);
      const data = await res.json();
      const reply =
        (data.content || [])
          .filter((b: { type: string }) => b.type === "text")
          .map((b: { text: string }) => b.text)
          .join("\n")
          .trim() || "…";
      setMessages([...nextHistory, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...nextHistory,
        { role: "assistant", content: copy.fallback },
      ]);
    } finally {
      setBusy(false);
      scrollToEnd();
      inputRef.current?.focus();
    }
  }

  return (
    <section id="ask" className={styles.section}>
      <div className="sec-head reveal">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.heading}</h2>
      </div>
      <div className={`${styles.shell} reveal`}>
        <div className={styles.top}>
          <span className={styles.dot} /> {copy.status}
        </div>
        <div className={styles.log} ref={logRef} aria-live="polite">
          <div className={`${styles.msg} ${styles.bot}`}>{copy.greeting}</div>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.msg} ${
                m.role === "user" ? styles.user : styles.bot
              }`}
            >
              {m.content}
            </div>
          ))}
          {busy && (
            <div className={`${styles.msg} ${styles.bot} ${styles.sys}`}>
              {copy.thinking}
            </div>
          )}
        </div>
        <div className={styles.suggest}>
          {copy.chips.map((c) => (
            <button
              key={c}
              type="button"
              className={styles.chip}
              onClick={() => ask(c)}
              disabled={busy}
            >
              {c}
            </button>
          ))}
        </div>
        <form
          className={styles.in}
          onSubmit={(e) => {
            e.preventDefault();
            ask(value);
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder={copy.placeholder}
            autoComplete="off"
            aria-label={copy.inputLabel}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" disabled={busy}>
            {copy.send}
          </button>
        </form>
      </div>
      <p className={styles.note}>{copy.note}</p>
    </section>
  );
}
