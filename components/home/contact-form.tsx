"use client";

import { useState } from "react";
import styles from "./contact-form.module.css";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const sending = status === "sending";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <p id="contact-form" className={styles.success}>
        Thanks — your message is on its way. I&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form id="contact-form" className={styles.form} onSubmit={onSubmit}>
      {/* Honeypot: hidden from users, catches bots. */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={sending}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={sending}
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Message</span>
        <textarea
          name="message"
          rows={5}
          required
          minLength={10}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={sending}
        />
      </label>

      {status === "error" && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
