import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";

async function getCompanyId(pool: sql.ConnectionPool, person: any) {
  const request = new sql.Request(pool);
  request.input("cpn_n", sql.VarChar, person.company);

  const result = await request.query(`
          SELECT cpn_id
          FROM company
          WHERE cpn_n = @cpn_n;
        `);
  return result.recordset[0]?.cpn_id;
}

async function createPersons(
  pool: sql.ConnectionPool,
  person: any,
  companyId: number
) {
  const request = new sql.Request(pool);

  const inputs = [
    { name: "outlanderNo", type: sql.VarChar, value: person.outlanderNo },
    { name: "prefix", type: sql.VarChar, value: person.prefix },
    { name: "firstname", type: sql.VarChar, value: person.firstname },
    { name: "lastname", type: sql.VarChar, value: person.lastname },
    { name: "prefixth", type: sql.VarChar, value: person.prefixth },
    { name: "firstnameth", type: sql.VarChar, value: person.firstnameth },
    { name: "lastnameth", type: sql.VarChar, value: person.lastnameth },
    { name: "nationality", type: sql.VarChar, value: person.nationality },
    { name: "company_id", type: sql.Int, value: companyId },
    { name: "picpath", type: sql.VarChar, value: person.pic_path },
    { name: "nickname", type: sql.VarChar, value: person.nickname },
    { name: "visa_id", type: sql.VarChar, value: person.visa_id },
    { name: "visa_startdate", type: sql.VarChar, value: person.visa_startdate },
    { name: "visa_enddate", type: sql.VarChar, value: person.visa_enddate },
    { name: "visa_path", type: sql.VarChar, value: person.visa_path },
    { name: "passport_id", type: sql.VarChar, value: person.passport_id },
    {
      name: "passport_startdate",
      type: sql.VarChar,
      value: person.passport_startdate,
    },
    {
      name: "passport_enddate",
      type: sql.VarChar,
      value: person.passport_enddate,
    },
    { name: "passport_path", type: sql.VarChar, value: person.passport_path },
    { name: "workpermit_id", type: sql.VarChar, value: person.workpermit_id },
    {
      name: "workpermit_startdate",
      type: sql.VarChar,
      value: person.workpermit_startdate,
    },
    {
      name: "workpermit_enddate",
      type: sql.VarChar,
      value: person.workpermit_enddate,
    },
    {
      name: "workpermit_path",
      type: sql.VarChar,
      value: person.workpermit_path,
    },
    {
      name: "ninetydays_startdate",
      type: sql.VarChar,
      value: person.ninetydays_startdate,
    },
    {
      name: "ninetydays_enddate",
      type: sql.VarChar,
      value: person.ninetydays_enddate,
    },
    {
      name: "ninetydays_path",
      type: sql.VarChar,
      value: person.ninetydays_path,
    },
  ];

  inputs.forEach((input) => request.input(input.name, input.type, input.value));

  const insertResult = await request.query(`
    INSERT INTO persons (
      outlanderNo, prefix, firstname, lastname, prefixth, firstnameth, lastnameth, nationality, 
      company_id, picpath, nickname, visa_id, visa_startdate, visa_enddate, visa_path, passport_id, 
      passport_startdate, passport_enddate, passport_path, workpermit_id, workpermit_startdate, 
      workpermit_enddate, workpermit_path, ninetydays_startdate, ninetydays_enddate, ninetydays_path
    )
    OUTPUT inserted.person_id
    VALUES (
      @outlanderNo, @prefix, @firstname, @lastname, @prefixth, @firstnameth, @lastnameth, @nationality, 
      @company_id, @picpath, @nickname, @visa_id, @visa_startdate, @visa_enddate, @visa_path, @passport_id, 
      @passport_startdate, @passport_enddate, @passport_path, @workpermit_id, @workpermit_startdate, 
      @workpermit_enddate, @workpermit_path, @ninetydays_startdate, @ninetydays_enddate, @ninetydays_path
    );
  `);
  return insertResult.recordset[0].person_id;
}

export async function GET(req: NextRequest) {}
export async function POST(req: NextRequest) {
  const requestBody = await req.json();
  const { person } = requestBody;
  const pool = await sqlConnect();
  try {
    const companyId = await getCompanyId(pool, person);
    const personId = await createPersons(pool, person, companyId);

    return NextResponse.json({
      message: `เพิ่มข้อมูลแรงงานต่างด้าวสำเร็จ`,
      personId: personId,
    });
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
