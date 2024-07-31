// src/app/api/send-email/route.ts
import { templateEmail } from "@/core/htmlmail";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function generateToken(length = 12) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { email } = requestBody;

  // Create transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: `${process.env.EMAIL_HOST}`,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // your Gmail email address
      pass: process.env.EMAIL_PASS, // your Gmail password or app password
    },
  });

  // Setup email data
  let mailOptions = {
    from: `Guru IT Support <${process.env.EMAIL_RECEIVER}>`,
    to: email, // your receiving email address
    subject: "Reset your Renewlabour Next password!",
    text: `คลิกตามลิงค์เว็บสำหรับรีเซ็ตรหัสผ่านใหม่ที่วางไว้: '${process.env.NEXT_PUBLIC_API}/reset-password'`,
    html: templateEmail(),
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
