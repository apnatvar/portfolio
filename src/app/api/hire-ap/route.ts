import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 1200;

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
  try {

    if (body.website !== undefined && body.website !== "") {
      return NextResponse.json({ success: false, message: "Submission could not be accepted." }, { status: 400 });
    }
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!EMAIL_REGEX.test(email)) {
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

    const formAction = process.env.GOOGLE_FORM_ACTION;
    const emailEntryName = process.env.GOOGLE_FORM_EMAIL_ENTRY;
    const messageEntryName = process.env.GOOGLE_FORM_MESSAGE_ENTRY;
    if (!formAction || !emailEntryName || !messageEntryName) {
      return NextResponse.json(
        { success: false, message: "Server form configuration is missing." },
        { status: 500 },
      );
    }

    const formData = new URLSearchParams();
    formData.append(emailEntryName, email);
    formData.append(messageEntryName, message);
    const googleResponse = await fetch(formAction, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });

    if (!googleResponse.ok) {
      return NextResponse.json(
        { success: false, message: "Google Form submission failed." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message was submitted successfully.",
    });
  } catch (e: unknown) {
    console.error("Hire form submission failed.", e);
    return NextResponse.json(
      { success: false, message: "Unexpected server error." },
      { status: 500 },
    );
  }
}
