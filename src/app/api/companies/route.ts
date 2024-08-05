import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";
import { getToken } from "next-auth/jwt";

async function createCompany(pool: sql.ConnectionPool, company: any) {
  const request = new sql.Request(pool);

  const inputs = [
    { name: "cpn_n", type: sql.VarChar, value: company.cpn_n },
    { name: "cpn_build", type: sql.VarChar, value: company.cpn_build },
    { name: "cpn_fl", type: sql.VarChar, value: company.cpn_fl },
    { name: "cpn_vill", type: sql.VarChar, value: company.cpn_vill },
    { name: "cpn_room", type: sql.VarChar, value: company.cpn_room },
    { name: "cpn_moo", type: sql.VarChar, value: company.cpn_moo },
    { name: "cpn_soi", type: sql.VarChar, value: company.cpn_soi },
    { name: "cpn_st", type: sql.VarChar, value: company.cpn_st },
    { name: "cpn_coun", type: sql.VarChar, value: company.cpn_coun },
    { name: "cpn_subdist", type: sql.VarChar, value: company.cpn_subdist },
    { name: "cpn_dist", type: sql.VarChar, value: company.cpn_dist },
    { name: "cpn_prov", type: sql.VarChar, value: company.cpn_prov },
    { name: "cpn_zip", type: sql.VarChar, value: company.cpn_zip },
    { name: "logo", type: sql.VarChar, value: company.logo },
    { name: "branch", type: sql.VarChar, value: company.branch },
  ];

  inputs.forEach((input) => request.input(input.name, input.type, input.value));

  const insertResult = await request.query(`
    INSERT INTO company (
      cpn_n, cpn_build, cpn_fl, cpn_vill, cpn_room, cpn_moo, cpn_soi, cpn_st, cpn_coun, cpn_subdist, cpn_dist, cpn_prov, cpn_zip, logo, branch
    )
    OUTPUT inserted.cpn_id
    VALUES (
      @cpn_n, @cpn_build, @cpn_fl, @cpn_vill, @cpn_room, @cpn_moo, @cpn_soi, @cpn_st, @cpn_coun, @cpn_subdist, @cpn_dist, @cpn_prov, @cpn_zip, @logo, @branch
    );
  `);
  return insertResult.recordset[0].cpn_id;
}

async function updateCompany(
  pool: sql.ConnectionPool,
  company: any,
  companyId: string
) {
  const request = new sql.Request(pool);

  const inputs = [
    { name: "cpn_n", type: sql.VarChar, value: company.cpn_n },
    { name: "cpn_build", type: sql.VarChar, value: company.cpn_build },
    { name: "cpn_fl", type: sql.VarChar, value: company.cpn_fl },
    { name: "cpn_vill", type: sql.VarChar, value: company.cpn_vill },
    { name: "cpn_room", type: sql.VarChar, value: company.cpn_room },
    { name: "cpn_moo", type: sql.VarChar, value: company.cpn_moo },
    { name: "cpn_soi", type: sql.VarChar, value: company.cpn_soi },
    { name: "cpn_st", type: sql.VarChar, value: company.cpn_st },
    { name: "cpn_coun", type: sql.VarChar, value: company.cpn_coun },
    { name: "cpn_subdist", type: sql.VarChar, value: company.cpn_subdist },
    { name: "cpn_dist", type: sql.VarChar, value: company.cpn_dist },
    { name: "cpn_prov", type: sql.VarChar, value: company.cpn_prov },
    { name: "cpn_zip", type: sql.VarChar, value: company.cpn_zip },
    { name: "logo", type: sql.VarChar, value: company.logo },
    { name: "branch", type: sql.VarChar, value: company.branch },
    { name: "cpn_id", type: sql.Int, value: companyId },
  ];

  inputs.forEach((input) => request.input(input.name, input.type, input.value));

  const insertResult = await request.query(`
    UPDATE company SET 
    cpn_n = @cpn_n, cpn_build = @cpn_build, cpn_fl = @cpn_fl, cpn_vill = @cpn_vill, cpn_room = @cpn_room, cpn_moo = @cpn_moo, cpn_soi = @cpn_soi, cpn_st = @cpn_st, 
    cpn_coun = @cpn_coun, cpn_subdist = @cpn_subdist, cpn_dist = @cpn_dist, cpn_prov = @cpn_prov, cpn_zip = @cpn_zip, logo = @logo, branch = @branch
      WHERE cpn_id = @cpn_id
    ;
  `);
  return insertResult;
}

async function deleteCompany(pool: sql.ConnectionPool, companyId: any) {
  const request = new sql.Request(pool);
  request.input("cpn_id", sql.Int, companyId);

  const insertResult = await request.query(`
      DELETE FROM company WHERE cpn_id = @cpn_id;
    `);
  return insertResult;
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
  const companyId = req.nextUrl.searchParams.get("companyId");
  const pool = await sqlConnect();
  if (!companyId) {
    try {
      const query = `
    SELECT 
        *
    FROM company
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
  FROM company
  WHERE cpn_id = @cpn_id
`;

      const result = await pool
        .request()
        .input("cpn_id", sql.Int, companyId)
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
  const token = await getToken({ req });

  if (!token) {
    return new NextResponse(
      JSON.stringify({
        error: "You do not have permission to view or use this data",
      }),
      { status: 403 }
    );
  }
  const requestBody = await req.json();
  const { company } = requestBody;
  const pool = await sqlConnect();
  try {
    const companyId = await createCompany(pool, company);

    return NextResponse.json({
      message: `เพิ่มข้อมูลบริษัทสำเร็จ`,
      companyId: companyId,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { message: "ล้มเหลวในการเพิ่มบริษัท", error: error },
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
  const companyId = req.nextUrl.searchParams.get("companyId");
  const requestBody = await req.json();
  const { company } = requestBody;
  const pool = await sqlConnect();

  try {
    if (companyId) {
      await updateCompany(pool, company, companyId);
      return NextResponse.json({
        message: `แก้ไขข้อมูลบริษัทสำเร็จ`,
      });
    } else {
      throw new Error("Invalid companyId or outlanderNo");
    }
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { message: "ล้มเหลวในการแก้ไขข้อมูลบริษัท", error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return new NextResponse(
      JSON.stringify({
        error: "You do not have permission to view or use this data",
      }),
      { status: 403 }
    );
  }
  const companyId = req.nextUrl.searchParams.get("companyId");
  const pool = await sqlConnect();
  try {
    await deleteCompany(pool, companyId);
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
