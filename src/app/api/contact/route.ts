import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_EMAIL || "info@gax.gl";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body as {
      name?: string;
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from: `Greenland Arctic Xplorers <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: subject
        ? `[Website] ${subject}`
        : `[Website] New message from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #0B1F3A;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #64748B; vertical-align: top;">Name</td>
              <td style="padding: 8px 12px; color: #1A2B3C;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #64748B; vertical-align: top;">Email</td>
              <td style="padding: 8px 12px; color: #1A2B3C;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #64748B; vertical-align: top;">Phone</td><td style="padding: 8px 12px; color: #1A2B3C;">${phone}</td></tr>` : ""}
            ${subject ? `<tr><td style="padding: 8px 12px; font-weight: 600; color: #64748B; vertical-align: top;">Subject</td><td style="padding: 8px 12px; color: #1A2B3C;">${subject}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 12px; font-weight: 600; color: #64748B; vertical-align: top;">Message</td>
              <td style="padding: 8px 12px; color: #1A2B3C; white-space: pre-line;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
