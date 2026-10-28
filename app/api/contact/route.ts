import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export const runtime = "nodejs";

// Basic email shape check — server-side guard, not a full RFC validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    company?: unknown;
    locale?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    // No body to read a locale out of, so the default language has to do.
    return NextResponse.json(
      { error: getDictionary(resolveLocale(undefined)).contactApi.invalidRequest },
      { status: 400 },
    );
  }

  // The form posts the locale of the page it was submitted from, so validation
  // errors come back in the language the sender is actually reading.
  const t = getDictionary(
    resolveLocale(typeof body.locale === "string" ? body.locale : undefined),
  ).contactApi;

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";

  // Honeypot: real users never fill this hidden field. Silently accept and drop.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name) {
    return NextResponse.json({ error: t.missingName }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: t.invalidEmail },
      { status: 400 },
    );
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: t.messageLength },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.error("Contact form is not configured (missing env vars).");
    return NextResponse.json(
      { error: t.notConfigured },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: t.sendFailed },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: t.sendFailed },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
