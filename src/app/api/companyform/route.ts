import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";
import { getToken } from "next-auth/jwt";

async function getCompany(pool: sql.ConnectionPool) {
  try {
    const request = new sql.Request(pool);
    const result = await request.query(`
      SELECT cpn_n
      FROM company
    `);
    return result.recordset;
  } catch (error) {
    console.error("SQL query failed:", error);
    throw new Error("Error fetching company data");
  }
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return new NextResponse(
      JSON.stringify({
        error: "You do not have permission to view or use this data",
      }),
      { status: 403 }
    );
  }
  try {
    const pool = await sqlConnect();
    const result = await getCompany(pool);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json({
      error: "Error fetching company data",
    });
  }
}
