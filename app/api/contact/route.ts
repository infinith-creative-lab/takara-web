import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Validasi Form menggunakan Zod
const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters length"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validasi Zod (Server-side validation)
    const result = ContactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid form data", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, company, email, phone, subject, message } = result.data;

    // 2. Load Environment Variables
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL_TO } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL_TO) {
      console.error("Missing SMTP Configuration on the server.");
      return NextResponse.json(
        { message: "Server configuration error. Please contact technical support." },
        { status: 500 }
      );
    }

    // Parse Port to ensure it's a number
    const port = parseInt(SMTP_PORT as string, 10);
    const isSecure = port === 465;

    // 3. Konfigurasi Transporter Nodemailer untuk Plesk (SMTP)
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: port,
      secure: isSecure, // true for 465, false for 587/2525
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        // Mengabaikan error sertifikat self-signed jika testing lokal
        rejectUnauthorized: false,
      },
    });

    // 4. Struktur Email
    const mailOptions = {
      from: `Takara Web <${SMTP_USER}>`, // Harus pakai domain resmi agar aman dari spam filter
      to: CONTACT_EMAIL_TO,              // admin@takara.id
      replyTo: `${name} <${email}>`,     // Reply langsung masuk ke yang ngisi form
      subject: `[Web Takara] ${subject} — ${name}`,
      text: `
Mendapat pesan baru dari Website Takara:

Name: ${name}
Company: ${company || "—"}
Email: ${email}
Phone: ${phone || "—"}
Subject: ${subject}

Message:
${message}

---
Dikirim dari takara.id Contact Form.
      `,
      html: `
        <h3>Mendapat pesan baru dari Website Takara</h3>
        <table border="0" cellpadding="4" cellspacing="0" style="margin-bottom: 20px;">
          <tr><td><strong>Name</strong></td><td>: ${name}</td></tr>
          <tr><td><strong>Company</strong></td><td>: ${company || "—"}</td></tr>
          <tr><td><strong>Email</strong></td><td>: <a href="mailto:${email}">${email}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td>: ${phone || "—"}</td></tr>
          <tr><td><strong>Subject</strong></td><td>: ${subject}</td></tr>
        </table>
        <h4>Message:</h4>
        <p style="white-space: pre-wrap; background-color: #f8f9fa; padding: 15px; border-radius: 5px;">${message}</p>
        <hr />
        <small>Dikirim dari takara.id Contact Form.</small>
      `,
    };

    // 5. Kirim Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Your message has been successfully sent! Our team will respond shortly." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to send email: ", error);
    return NextResponse.json(
      { 
        message: "A system error occurred while sending your message. Please try again later.",
        debug_error: error?.message || String(error)
      },
      { status: 500 }
    );
  }
}
