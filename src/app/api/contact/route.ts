import { NextRequest, NextResponse } from "next/server";
import { company } from "@/lib/site";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, lastName, email, phone, company: companyName, message } = body ?? {};

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CROX Website <onboarding@resend.dev>",
          to: company.email,
          reply_to: email,
          subject: `New enquiry from ${firstName} ${lastName}`,
          text: [
            `Name: ${firstName} ${lastName}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : null,
            companyName ? `Company: ${companyName}` : null,
            "",
            message,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
    } catch {
      // Fire-and-forget: don't fail the request if email delivery has an issue.
    }
  } else {
    console.log("[contact form submission]", { firstName, lastName, email, phone, companyName, message });
  }

  return NextResponse.json({ ok: true });
}
