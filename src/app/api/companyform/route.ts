import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";

async function getCompany(pool: sql.ConnectionPool) {
  const request = new sql.Request(pool);

  const result = await request.query(`
        SELECT cpn_n
        FROM company
      `);

  return result.recordset;
}

export async function GET(req: NextRequest) {
  try {
    const pool = await sqlConnect();
    const result = getCompany(pool);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json({
      error: "Error Fetching Ticket",
    });
  }
}
