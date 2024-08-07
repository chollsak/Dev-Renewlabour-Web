// src/app/api/send-email/route.ts
import { templateEmail } from "@/core/htmlmail";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sqlConnect } from "../../../../public/components/lib/db";
import { generateResetToken } from "@/core/utils";
import * as sql from "mssql";
import moment from "moment";

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { email } = requestBody;

  const pool = await sqlConnect();

  const userResult = await pool
    .request()
    .input("email", email)
    .query(
      "SELECT mem_id, member_name, member_lastname FROM members WHERE email = @Email"
    );

  if (userResult.recordset.length === 0) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const {
    mem_id: userId,
    member_name: memberName,
    member_lastname: memberLastName,
  } = userResult.recordset[0];
  const resetToken = generateResetToken(12);
  const expiresAt = moment().add(1, "hour").format("YYYY-MM-DD HH:mm");

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
    text: `คลิกตามลิงค์เว็บสำหรับรีเซ็ตรหัสผ่านใหม่ที่วางไว้: '${process.env.NEXT_PUBLIC_API}/reset-password?token=${resetToken}'`,
    html: templateEmail(resetToken, memberName, memberLastName),
  };

  try {
    await pool
      .request()
      .input("userId", sql.Int, userId)
      .input("resetToken", sql.VarChar, resetToken)
      .input("expiresAt", sql.VarChar, expiresAt).query(`
      INSERT INTO passwordresettokens (user_id, reset_token, expires_at)
      VALUES (@userId, @resetToken, @expiresAt)
    `);
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "ส่งไปที่อีเมลสำเร็จ โปรดตรวจสอบอีเมลของคุณ" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "การส่งอีเมลล้มเหลว", error },
      { status: 500 }
    );
  }
}
