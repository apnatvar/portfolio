import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 1200;

type HireApnatvaPayload = {
  email?: unknown;
  message?: unknown;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as HireApnatvaPayload;

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
    console.log(formAction);
    if (!formAction || !emailEntryName || !messageEntryName) {
      return NextResponse.json(
        { success: false, message: "Server form configuration is missing." },
        { status: 500 },
      );
    }

    const formData = new URLSearchParams();
    formData.append(emailEntryName, email);
    formData.append(messageEntryName, message);
    console.log(formData);

    const googleResponse = await fetch(formAction, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      cache: "no-store",
      redirect: "follow",
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
    const message = e instanceof Error ? e.message : "Unexpected server error.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
