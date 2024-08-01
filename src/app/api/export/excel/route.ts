import { NextRequest, NextResponse } from "next/server";
import { sqlConnect } from "../../../../../public/components/lib/db";
import ExcelJS from "exceljs";

export async function GET(req: NextRequest) {
  const pool = await sqlConnect();
  try {
    const query = ` SELECT person_id, outlanderNo, prefix, firstname, lastname, prefixth, firstnameth, lastnameth, nationality, cpn_n, nickname, 
                    visa_id, visa_startdate, visa_enddate,
                    passport_id, passport_startdate, passport_enddate,
                    workpermit_id, workpermit_startdate, workpermit_enddate,
                    ninetydays_startdate, ninetydays_enddate FROM persons LEFT JOIN company ON persons.company_id = company.cpn_id`;
    const result = await pool.request().query(query);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("แรงงานต่างด้าว");

    worksheet.columns = Object.keys(result.recordset[0]).map((key) => ({
      header: key,
      key,
      width: 20,
    }));

    worksheet.addRows(result.recordset);

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4CAF50" }, // Green background
      };
      cell.font = {
        color: { argb: "FFFFFFFF" }, // White text
        bold: true,
      };
      cell.alignment = { vertical: "middle", horizontal: "left" };
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const filename = "Export Renewlabour แรงงานต่างด้าว.xlsx";
    const encodedFilename = encodeURIComponent(filename)
      .replace(/['()]/g, escape)
      .replace(/\*/g, "%2A");

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename*=UTF-8''${encodedFilename}`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
