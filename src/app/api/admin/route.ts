import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../public/components/lib/db";
import * as sql from "mssql";
import moment from "moment";

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

async function createOtherFiles(
  pool: sql.ConnectionPool,
  personId: string,
  data: any[]
) {
  console.log("Creating other files with data:", data); // Log data being processed
  const promises = [];

  for (const item of data) {
    console.log("Processing item:", item); // Log each item
    const request = new sql.Request(pool);
    request.input("fileo_path", sql.VarChar, item);
    request.input("person_id", sql.Int, personId);

    promises.push(
      request.query(`
        INSERT INTO file_persons (fileo_path, person_id)
        OUTPUT INSERTED.fileo_id
        VALUES (@fileo_path, @person_id);
      `)
    );
  }

  const results = await Promise.all(promises);
  console.log("Files inserted:", results); // Log insertion results
  return results;
}

async function updatePersons(
  pool: sql.ConnectionPool,
  person: any,
  companyId: number,
  personId: string,
  outlanderNo: string
) {
  const request = new sql.Request(pool);

  const inputs = [
    { name: "newoutlanderNo", type: sql.VarChar, value: person.outlanderNo },
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
    {
      name: "person_id",
      type: sql.VarChar,
      value: personId,
    },
    {
      name: "outlanderNo",
      type: sql.VarChar,
      value: outlanderNo,
    },
  ];

  inputs.forEach((input) => request.input(input.name, input.type, input.value));

  const insertResult = await request.query(`
    UPDATE persons SET outlanderNo = @newoutlanderNo, prefix = @prefix, firstname = @firstname, lastname = @lastname, 
    prefixth = @prefixth, firstnameth = @firstnameth, lastnameth = @lastnameth, nationality = @nationality, 
      company_id = @company_id, picpath = @picpath, nickname = @nickname, 
      visa_id = @visa_id, visa_startdate = @visa_startdate, visa_enddate = @visa_enddate, visa_path = @visa_path, 
      passport_id = @passport_id, passport_startdate = @passport_startdate, passport_enddate = @passport_enddate, passport_path = @passport_path, 
      workpermit_id = @workpermit_id, workpermit_startdate = @workpermit_startdate, workpermit_enddate = @workpermit_enddate, workpermit_path = @workpermit_path, 
      ninetydays_startdate = @ninetydays_startdate, ninetydays_enddate = @ninetydays_enddate, ninetydays_path = @ninetydays_path
      WHERE person_id = @person_id AND outlanderNo = @outlanderNo
    ;
  `);
  return insertResult;
}

export async function GET(req: NextRequest) {
  const personId = req.nextUrl.searchParams.get("person_id");
  const outlanderNo = req.nextUrl.searchParams.get("outlanderNo");
  const pool = await sqlConnect();
  if (!personId || !outlanderNo) {
    try {
      const query = `
    SELECT 
        person_id, outlanderNo, prefix, firstname, lastname, 
        prefixth, firstnameth, lastnameth, nationality, company_id, 
        picpath, nickname, visa_id, visa_startdate, visa_enddate, 
        visa_path, passport_id, passport_startdate, passport_enddate, 
        passport_path, workpermit_id, workpermit_startdate, 
        workpermit_enddate, workpermit_path, ninetydays_startdate, 
        ninetydays_enddate, ninetydays_path 
    FROM persons
`;

      const result = await pool.request().query(query);

      const persons = result.recordset.map((person) => {
        const {
          visa_enddate,
          passport_enddate,
          workpermit_enddate,
          ninetydays_enddate,
        } = person;

        const dates = [
          moment(visa_enddate),
          moment(passport_enddate),
          moment(workpermit_enddate),
          moment(ninetydays_enddate),
        ];

        const status = dates.reduce((minDate, currentDate) =>
          currentDate.isBefore(minDate) ? currentDate : minDate
        );

        return {
          ...person,
          status: status.format("YYYY-MM-DD"),
        };
      });

      return NextResponse.json(persons);
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
    person_id, outlanderNo, prefix, firstname, lastname, 
    prefixth, firstnameth, lastnameth, nationality, cpn_n, 
    picpath, nickname, visa_id, visa_startdate, visa_enddate, 
    visa_path, passport_id, passport_startdate, passport_enddate, 
    passport_path, workpermit_id, workpermit_startdate, 
    workpermit_enddate, workpermit_path, ninetydays_startdate, 
    ninetydays_enddate, ninetydays_path 
  FROM persons
  LEFT JOIN company ON persons.company_id = company.cpn_id
  WHERE person_id = @personId AND outlanderNo = @outlanderNo
`;

      const result = await pool
        .request()
        .input("personId", sql.Int, personId)
        .input("outlanderNo", sql.VarChar, outlanderNo)
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
  const { person, dataOtherFiles } = requestBody;
  const pool = await sqlConnect();
  try {
    const companyId = await getCompanyId(pool, person);
    const personId = await createPersons(pool, person, companyId);
    if (personId) {
      await createOtherFiles(pool, personId, dataOtherFiles);
    }
    return NextResponse.json({
      message: `เพิ่มข้อมูลแรงงานต่างด้าวสำเร็จ`,
      personId: personId,
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
  const personId = req.nextUrl.searchParams.get("personId");
  const outlanderNo = req.nextUrl.searchParams.get("outlanderNo");
  const requestBody = await req.json();
  const { person, dataOtherFiles } = requestBody;
  const pool = await sqlConnect();

  try {
    const companyId = await getCompanyId(pool, person);
    if (personId && outlanderNo) {
      await updatePersons(pool, person, companyId, personId, outlanderNo);
      // if (personId) {
      //   await createOtherFiles(pool, personId, dataOtherFiles);
      // }
      return NextResponse.json({
        message: `แก้ไขข้อมูลแรงงานต่างด้าวสำเร็จ`,
      });
    } else {
      throw new Error("Invalid personId or outlanderNo");
    }
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json(
      { message: "ล้มเหลวในการแก้ไขข้อมูลแรงงาน", error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {}
