import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Spam blocked" }, { status: 200 });
    }

    // Server-side input validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message exceeds maximum length limit (5000 characters)" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "kaushiksharma1432@gmail.com";

    if (resendApiKey) {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: toEmail,
          reply_to: email,
          subject: `New Portfolio Contact Message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error("Resend API delivery error:", errText);
        // Fallback response for development/unwired environments
        return NextResponse.json({ success: true, delivered: false, note: "Form validated. Resend key active but returned provider response." });
      }
      return NextResponse.json({ success: true, delivered: true });
    }

    // Default fallback when RESEND_API_KEY is not configured yet
    return NextResponse.json({ success: true, delivered: false, note: "Form validated successfully. Server ready for RESEND_API_KEY." });
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
