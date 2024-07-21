import { NextRequest, NextResponse } from "next/server";
import { getSingleInvoice } from "@/app/db/actions";

export async function GET(req: NextRequest) {
   const invoiceID = req.nextUrl.searchParams.get("id");
    
	try {
		const invoice = await getSingleInvoice(Number(invoiceID!));
        return NextResponse.json({ message: "Inovice retrieved successfully!", invoice }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}