"use client";

import { ArrowUpRight, Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function MessageBar() {
  const id = useId();
  const form = useRef<HTMLFormElement>(null);
  const messageField = useRef<HTMLTextAreaElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const locked = useRef(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [askEmail, setAskEmail] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const field = messageField.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${Math.min(field.scrollHeight, 160)}px`;
  }, [message]);

  useEffect(() => { if (askEmail) emailField.current?.focus(); }, [askEmail]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    setError("");
    setSent(false);
    if (!message.trim()) {
      setError("Write a message first.");
      messageField.current?.focus();
      return;
    }
    if (!askEmail) {
      setAskEmail(true);
      return;
    }
    if (!EMAIL.test(email.trim()) || email.trim().length > 254) {
      setError("Add a valid email so I can reply.");
      emailField.current?.focus();
      return;
    }
    locked.current = true;
    setSending(true);
    try {
      const response = await fetch("/api/hire-ap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), email: email.trim(), website }),
        signal: AbortSignal.timeout(15000),
      });
      const result: unknown = await response.json();
      if (!response.ok || !result || typeof result !== "object" || !("success" in result) || result.success !== true) {
        setError("Your message couldn’t be sent. Please try again, or email rawat@apnatva.dev.");
        return;
      }
      setMessage(""); setEmail(""); setWebsite("");
      setAskEmail(false); setSent(true);
    } catch {
      setError("Your message couldn’t be sent. Please try again, or email rawat@apnatva.dev.");
    } finally {
      locked.current = false;
      setSending(false);
    }
  }

  return <section className="message-composer" aria-label="Send AP a message">
    <form ref={form} className="message-composer-form" onSubmit={submit} noValidate aria-busy={sending}>
      <div className="message-searchbar">
        <Search aria-hidden="true" size={19} strokeWidth={1.25} />
        <label htmlFor={`${id}-message`} className="sr-only">Your message</label>
        <textarea ref={messageField} id={`${id}-message`} name="message" rows={1} maxLength={1200} required placeholder="send me a message" value={message} disabled={sending} aria-describedby={`${id}-feedback`} onChange={event => { setMessage(event.target.value); setSent(false); setError(""); }} onKeyDown={event => {
          if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); form.current?.requestSubmit(); }
        }} />
        <span className="message-bar-mark" aria-hidden="true">AP</span>
      </div>
      {!sent ? <p className="message-reply-note">{askEmail ? "Leave your email so I can get back to you." : "Next, leave an email so I can get back to you."}</p> : null}
      <div className="message-honeypot" aria-hidden="true"><label htmlFor={`${id}-website`}>Leave this field empty</label><input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></div>
      {askEmail ? <div className="message-email-prompt">
        <label htmlFor={`${id}-email`}>Your email address</label>
        <input ref={emailField} id={`${id}-email`} name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} aria-label="Your email address" aria-describedby={`${id}-feedback`} required placeholder="your@email.com" value={email} disabled={sending} onChange={event => { setEmail(event.target.value); setError(""); }} />
      </div> : null}
      <button type="submit" className="message-send" disabled={sending}>{sending ? "Sending…" : "Send message"}<ArrowUpRight aria-hidden="true" size={15} /></button>
      <div id={`${id}-feedback`} className="message-feedback">
        {error ? <p role="alert">{error}</p> : <p role="status">{sent ? "Message sent. Thanks for the note." : ""}</p>}
      </div>
      <noscript><p className="message-no-script">Leave a note at <a href="mailto:rawat@apnatva.dev">rawat@apnatva.dev</a>.</p></noscript>
    </form>
  </section>;
}
