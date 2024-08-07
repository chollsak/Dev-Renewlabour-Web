import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";
import moment from "moment";
import { hashPassword } from "@/core/hashpassword";

export async function GET(req: NextRequest) {
  const pool = await sqlConnect();
  const token = req.nextUrl.searchParams.get("token");

  try {
    const query = `
    SELECT user_id, expires_at FROM passwordresettokens WHERE reset_token = @token`;

    const result = await pool
      .request()
      .input("token", sql.VarChar, token)
      .query(query);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const pool = await sqlConnect();
  const token = req.nextUrl.searchParams.get("token");
  const requestBody = await req.json();
  const { newPassword } = requestBody;
  try {
    const tokenResult = await pool
      .request()
      .input("token", token)
      .query(
        "SELECT user_id, expires_at FROM passwordresettokens WHERE reset_token = @Token"
      );

    if (tokenResult.recordset.length === 0) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const { user_id, expires_at } = tokenResult.recordset[0];

    if (moment().isAfter(moment(expires_at, "YYYY-MM-DD HH:mm"))) {
      return NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(newPassword);

    await pool
      .request()
      .input("userId", user_id)
      .input("newPassword", hashedPassword)
      .query(
        "UPDATE members SET password = @NewPassword WHERE mem_id = @UserId"
      );

    await pool
      .request()
      .input("token", token)
      .query("DELETE FROM passwordresettokens WHERE reset_token = @Token");

    return NextResponse.json(
      { message: "เปลี่ยนรหัสผ่านสำเร็จ" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
