"use client";

import { useRef, useState } from "react";
import styles from "./ask-widget.module.css";

type Msg = { role: "user" | "assistant"; content: string };

const CHIPS = [
  "What kind of roles is she after?",
  "Tell me about the Voice-SCaNN pivot.",
  "Can she actually code?",
  "What makes her different?",
];

const FALLBACK =
  "The live assistant runs through a small backend that isn't connected on this deployment yet. Everything else on the site is real — and so is the assistant when it's wired up. Reach me on GitHub in the meantime.";

export function AskWidget() {
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
        { role: "assistant", content: FALLBACK },
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
        <span className="eyebrow">03 — ask</span>
        <h2>Ask the site about me</h2>
      </div>
      <div className={`${styles.shell} reveal`}>
        <div className={styles.top}>
          <span className={styles.dot} /> live assistant · answers as Scarlett ·
          AI, so not perfect
        </div>
        <div className={styles.log} ref={logRef} aria-live="polite">
          <div className={`${styles.msg} ${styles.bot}`}>
            Hi — I&apos;m an AI that answers questions about Scarlett&apos;s work
            and the way she thinks. Recruiter, curious, or just poking around?
            Ask me anything.
          </div>
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
              thinking…
            </div>
          )}
        </div>
        <div className={styles.suggest}>
          {CHIPS.map((c) => (
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
            placeholder="Type a question…"
            autoComplete="off"
            aria-label="Ask a question"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" disabled={busy}>
            Ask
          </button>
        </form>
      </div>
      <p className={styles.note}>
        This assistant is itself one of the projects — an LLM with a system
        prompt written in Scarlett&apos;s voice.
      </p>
    </section>
  );
}
