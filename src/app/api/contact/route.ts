import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { appendFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { contactSchema } from "@/lib/validations";
import { verifyChallenge } from "@/lib/captcha";
import { rateAllowed, clientIp } from "@/lib/rate-limit";
import {
  renderContactEmailHtml,
  renderContactEmailText,
  type ContactEmailPayload,
} from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL || "musaahmaddd29@gmail.com";
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Musa Ahmad <onboarding@resend.dev>";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const RATE_BAN_MS = 60_000;

function logBackup(payload: Record<string, unknown>, ip: string) {
  const entry = { ...payload, ip, _at: new Date().toISOString() };
  const line = JSON.stringify(entry) + "\n";
  console.log("[contact] backing up:", line.trim());
  try {
    const logDir = join(process.cwd(), "logs");
    if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
    appendFileSync(join(logDir, "contacts.jsonl"), line, "utf8");
  } catch (err) {
    console.error("[contact] file backup failed:", err);
  }
}

async function sendViaResend(payload: ContactEmailPayload): Promise<{
  ok: boolean;
  error?: string;
}> {
  if (!RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY missing — skipping email send");
    return { ok: false, error: "no-api-key" };
  }
  try {
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: payload.email,
      subject: `New message — ${payload.subject}`,
      html: renderContactEmailHtml(payload),
      text: renderContactEmailText(payload),
      tags: [{ name: "source", value: "portfolio-contact" }],
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return { ok: false, error: String(error.message ?? error) };
    }
    console.log("[contact] email sent. id=", data?.id);
    return { ok: true };
  } catch (err) {
    console.error("[contact] Resend threw:", err);
    return { ok: false, error: String(err) };
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);

    if (!rateAllowed(ip, RATE_MAX, RATE_WINDOW_MS, RATE_BAN_MS)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many requests. Please wait a minute and try again.",
        },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 },
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const first =
        flat.formErrors[0] ||
        Object.values(flat.fieldErrors)[0]?.[0] ||
        "Please check the form fields.";
      return NextResponse.json(
        { ok: false, error: first },
        { status: 400 },
      );
    }
    const data = parsed.data;

    if (data.website && data.website.trim().length > 0) {
      console.log("[contact] honeypot tripped — silent success");
      return NextResponse.json({
        ok: true,
        message: "Thanks — your message has been sent. I'll get back to you within 24 hours.",
      });
    }

    if (!verifyChallenge(data.captchaId, data.captchaAnswer)) {
      console.log("[contact] captcha failed");
      return NextResponse.json(
        { ok: false, error: "Captcha answer is wrong or expired. Please try again." },
        { status: 400 },
      );
    }

    const payload: ContactEmailPayload = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      budget: data.budget,
      ip,
    };

    logBackup({ ...payload }, ip);

    const send = await sendViaResend(payload);
    if (!send.ok) {
      console.warn("[contact] email send failed — logged as backup. reason:", send.error);
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks — your message has been sent. I'll get back to you within 24 hours.",
    });
  } catch (err) {
    console.error("[contact] uncaught error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Something went wrong on our end. Please try again, or email me directly.",
      },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: true, service: "Musa Ahmad — contact endpoint" },
    { status: 200 },
  );
}
