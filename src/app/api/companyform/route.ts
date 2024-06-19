import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";

async function getCompany(pool: sql.ConnectionPool) {
  try {
    const request = new sql.Request(pool);
    const result = await request.query(`
      SELECT cpn_id AS id, cpn_n AS name, cpn_build AS build, cpn_ad AS ad, cpn_fl AS fl, cpn_vill AS vill
      FROM company
    `);
    return result.recordset;
  } catch (error) {
    console.error("SQL query failed:", error);
    throw new Error("Error fetching company data");
  }
}

export async function GET(req: NextRequest) {
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
