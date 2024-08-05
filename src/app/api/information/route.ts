import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";
import { hashPassword } from "@/core/hashpassword";
import { getToken } from "next-auth/jwt";

async function getCompanyId(pool: sql.ConnectionPool, member: any) {
  const request = new sql.Request(pool);
  request.input("cpn_n", sql.VarChar, member.company);

  const result = await request.query(`
            SELECT cpn_id
            FROM company
            WHERE cpn_n = @cpn_n;
          `);
  return result.recordset[0]?.cpn_id;
}

async function updateMembers(
  pool: sql.ConnectionPool,
  member: any,
  memberId: number,
  companyId: number
) {
  const request = new sql.Request(pool);

  const inputs = [
    { name: "member_name", type: sql.VarChar, value: member.member_name },
    {
      name: "member_lastname",
      type: sql.VarChar,
      value: member.member_lastname,
    },
    { name: "username", type: sql.VarChar, value: member.username },
    { name: "email", type: sql.VarChar, value: member.email },
    { name: "tel", type: sql.VarChar, value: member.tel },
    { name: "company_id", type: sql.Int, value: companyId },
    { name: "m_picpath", type: sql.VarChar, value: member.m_picpath },
    { name: "lineID", type: sql.VarChar, value: member.lineID },
    { name: "mem_id", type: sql.Int, value: memberId },
  ];

  inputs.forEach((input) => request.input(input.name, input.type, input.value));

  const insertResult = await request.query(`
      UPDATE members SET 
      member_name = @member_name, member_lastname = @member_lastname, username = @username, email = @email, tel = @tel, company_id = @company_id, m_picpath = @m_picpath, lineID = @lineId
        WHERE mem_id = @mem_id
      ;
    `);
  return insertResult;
}

async function updatePassword(
  pool: sql.ConnectionPool,
  newPassword: string,
  memberId: number
) {
  const request = new sql.Request(pool);

  // แฮชรหัสผ่านใหม่
  const hashedPassword = await hashPassword(newPassword);

  const inputs = [
    { name: "password", type: sql.VarChar, value: hashedPassword },
    { name: "mem_id", type: sql.Int, value: memberId },
  ];

  inputs.forEach((input) => request.input(input.name, input.type, input.value));

  const updateResult = await request.query(`
      UPDATE members SET 
      password = @password WHERE mem_id = @mem_id
      ;
  `);

  return updateResult;
}

export async function GET(req: NextRequest) {
  const memberId = req.nextUrl.searchParams.get("memberId");
  const pool = await sqlConnect();
  try {
    const query = `
                    SELECT 
                    *
                    FROM members
                    LEFT JOIN company ON members.company_id = company.cpn_id
                    WHERE mem_id = @memberId
                `;

    const result = await pool
      .request()
      .input("memberId", sql.Int, memberId)
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
  const token = await getToken({ req });

  if (!token) {
    return new NextResponse(
      JSON.stringify({
        error: "You do not have permission to view or use this data",
      }),
      { status: 403 }
    );
  }
  const memberId = Number(req.nextUrl.searchParams.get("memberId"));
  const type = req.nextUrl.searchParams.get("type");
  const requestBody = await req.json();
  const { member, newPassword } = requestBody;
  const pool = await sqlConnect();
  if (type === "information") {
    try {
      if (memberId) {
        const companyId = await getCompanyId(pool, member);
        await updateMembers(pool, member, memberId, companyId);
        return NextResponse.json({
          message: `แก้ไขข้อมูลผู้ใช้งานสำเร็จ`,
        });
      } else {
        throw new Error("Invalid memberId");
      }
    } catch (error) {
      console.error("Database query failed:", error);
      return NextResponse.json(
        { message: "ล้มเหลวในการแก้ไขข้อมูลผู้ใช้งาน", error: error },
        { status: 500 }
      );
    }
  } else if (type === "password") {
    try {
      if (memberId) {
        await updatePassword(pool, newPassword, memberId);
        return NextResponse.json({
          message: `แก้ไขข้อมูลแรงงานต่างด้าวสำเร็จ`,
        });
      } else {
        throw new Error("Invalid memberId");
      }
    } catch (error) {
      console.error("Database query failed:", error);
      return NextResponse.json(
        { message: "ล้มเหลวในการแก้ไขข้อมูลแรงงาน", error: error },
        { status: 500 }
      );
    }
  }
}
