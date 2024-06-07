import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";

async function getCompanyId(pool: sql.ConnectionPool, username: string) {
  const request = new sql.Request(pool);
  request.input("username", sql.VarChar, username);

  const result = await request.query(`
          SELECT id
          FROM admin_user
          WHERE username = @username;
        `);

  return result.recordset[0]?.id;
}

async function createPersons(pool: sql.ConnectionPool, person: any) {
  const request = new sql.Request(pool);
  request.input("outlanderNo", sql.VarChar, person.outlanderNo);
  request.input("prefix", sql.VarChar, person.prefix);
  request.input("firstname", sql.VarChar, person.firstname);
  request.input("lastname", sql.VarChar, person.lastname);
  request.input("prefixth", sql.VarChar, person.prefixth);
  request.input("firstnameth", sql.VarChar, person.firstnameth);
  request.input("lastnameth", sql.VarChar, person.lastnameth);
  request.input("nationality", sql.VarChar, person.nationality);

  const insertResult = await request.query(`
        INSERT INTO persons ()
        OUTPUT inserted.id
        VALUES ();
      `);

  return insertResult.recordset[0].id;
}

export async function GET(req: NextRequest) {}
export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { person } = requestBody;
  const pool = await sqlConnect();

  try {
    const maId = await createPersons(pool, person);

    return NextResponse.json({ message: `Maintenance created successfully` });
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { message: "Failed to Create Maintenance", error: error },
      { status: 500 }
    );
  }
}
export async function PATCH(req: NextRequest) {}
export async function DELETE(req: NextRequest) {}
