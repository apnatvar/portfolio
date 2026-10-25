import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 1200;
const DISALLOWED_MESSAGE_CONTROLS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

type HireApnatvaPayload = {
  website?: unknown;
  email?: unknown;
  message?: unknown;
};

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && origin !== new URL(req.url).origin && origin !== "https://apnatva.dev") {
    return NextResponse.json({ success: false, message: "Request origin is not allowed." }, { status: 403 });
  }
  if (Number(req.headers.get("content-length")) > 16384) {
    return NextResponse.json({ success: false, message: "Request is too large." }, { status: 413 });
  }
  let body: HireApnatvaPayload;
  try {
    const reader = req.body?.getReader();
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 16384) {
          await reader.cancel();
          return NextResponse.json({ success: false, message: "Request is too large." }, { status: 413 });
        }
        chunks.push(value);
      }
    }
    const merged = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) { merged.set(chunk, offset); offset += chunk.byteLength; }
    const parsed: unknown = JSON.parse(new TextDecoder().decode(merged));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
    }
    body = parsed as HireApnatvaPayload;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON." }, { status: 400 });
  }
  if (body.website !== undefined && body.website !== "") {
    return NextResponse.json({ success: false, message: "Submission could not be accepted." }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, message: "Invalid email address." },
      { status: 400 },
    );
  }

  if (!message) {
    return NextResponse.json(
      { success: false, message: "Message is required." },
      { status: 400 },
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { success: false, message: "Message is too long." },
      { status: 400 },
    );
  }

  if (DISALLOWED_MESSAGE_CONTROLS.test(message)) {
    return NextResponse.json(
      { success: false, message: "Message contains unsupported control characters." },
      { status: 400 },
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    return NextResponse.json(
      { success: false, message: "The contact form is temporarily unavailable. Please try again later." },
      { status: 500 },
    );
  }

  const text = `New portfolio message\n\nFrom: ${email}\n\n${message}`;
  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        link_preview_options: { is_disabled: true },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    let telegramResult: { ok?: unknown };
    try {
      telegramResult = await telegramResponse.json() as { ok?: unknown };
    } catch {
      return NextResponse.json(
        { success: false, message: "We couldn't deliver your message. Please try again shortly." },
        { status: 502 },
      );
    }

    if (!telegramResponse.ok || telegramResult.ok !== true) {
      return NextResponse.json(
        { success: false, message: "We couldn't deliver your message. Please try again shortly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, message: "Your message was sent successfully." });
  } catch {
    return NextResponse.json(
      { success: false, message: "We couldn't deliver your message. Please try again shortly." },
      { status: 502 },
    );
  }
}
