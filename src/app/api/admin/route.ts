import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";

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

async function createMembers(
  pool: sql.ConnectionPool,
  member: any,
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
    { name: "password", type: sql.VarChar, value: "12345" },
    { name: "email", type: sql.VarChar, value: member.email },
    { name: "tel", type: sql.VarChar, value: member.tel },
    { name: "company_id", type: sql.Int, value: companyId },
    { name: "m_picpath", type: sql.VarChar, value: member.m_picpath },
    { name: "lineID", type: sql.VarChar, value: member.lineID },
  ];

  inputs.forEach((input) => request.input(input.name, input.type, input.value));

  const insertResult = await request.query(`
    INSERT INTO members (
      member_name, member_lastname, username, password, email, tel, company_id, m_picpath, lineID
    )
    OUTPUT inserted.mem_id
    VALUES (
      @member_name, @member_lastname, @username, @password, @email, @tel, @company_id, @m_picpath, @lineID
    );
  `);
  return insertResult.recordset[0].mem_id;
}

async function updateMembers(
  pool: sql.ConnectionPool,
  member: any,
  memberId: string,
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
    { name: "mem_id", type: sql.VarChar, value: memberId },
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

async function deleteMembers(pool: sql.ConnectionPool, memberId: any) {
  const request = new sql.Request(pool);
  request.input("mem_id", sql.Int, memberId);

  const insertResult = await request.query(`
      DELETE FROM members WHERE mem_id = @mem_id;
    `);
  return insertResult;
}

export async function GET(req: NextRequest) {
  const memberId = req.nextUrl.searchParams.get("memberId");
  const pool = await sqlConnect();
  if (!memberId) {
    try {
      const query = `
    SELECT 
      *
    FROM members
`;

      const result = await pool.request().query(query);

      return NextResponse.json(result.recordset);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
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
}

export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { member } = requestBody;
  const pool = await sqlConnect();
  try {
    const companyId = await getCompanyId(pool, member);
    const memberId = await createMembers(pool, member, companyId);

    return NextResponse.json({
      message: `เพิ่มข้อมูลแรงงานต่างด้าวสำเร็จ`,
      memberId: memberId,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { message: "ล้มเหลวในการเพิ่มแรงงาน", error: error },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const memberId = req.nextUrl.searchParams.get("memberId");
  const requestBody = await req.json();
  const { member } = requestBody;
  const pool = await sqlConnect();

  try {
    if (memberId) {
      const companyId = await getCompanyId(pool, member);
      await updateMembers(pool, member, memberId, companyId);
      return NextResponse.json({
        message: `แก้ไขข้อมูลแรงงานต่างด้าวสำเร็จ`,
      });
    } else {
      throw new Error("Invalid memberId or outlanderNo");
    }
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { message: "ล้มเหลวในการแก้ไขข้อมูลแรงงาน", error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const memberId = req.nextUrl.searchParams.get("memberId");
  const pool = await sqlConnect();
  try {
    await deleteMembers(pool, memberId);
    return NextResponse.json({
      message: `ลบข้อมูลบริษัทสำเร็จ`,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { message: "ล้มเหลวในการลบข้อมูลบริษัท", error: error },
      { status: 500 }
    );
  }
}
