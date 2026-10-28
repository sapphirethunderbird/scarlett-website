"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import styles from "./contact-form.module.css";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm({
  locale,
  copy,
}: {
  locale: Locale;
  copy: Dictionary["contactForm"];
}) {
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
        body: JSON.stringify({ name, email, message, company, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || copy.genericError);
      }
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : copy.genericError);
    }
  }

  if (status === "ok") {
    return (
      <p id="contact-form" className={styles.success}>
        {copy.success}
      </p>
    );
  }

  return (
    <form id="contact-form" className={styles.form} onSubmit={onSubmit}>
      {/* Honeypot: hidden from users, catches bots. */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="company">{copy.company}</label>
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
          <span className={styles.label}>{copy.name}</span>
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
          <span className={styles.label}>{copy.email}</span>
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
        <span className={styles.label}>{copy.message}</span>
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
        {sending ? copy.sending : copy.send}
      </button>
    </form>
  );
}
