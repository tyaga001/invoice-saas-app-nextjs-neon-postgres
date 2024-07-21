import { createInvoice, getUserInvoices } from "@/app/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { customer, title, items, total, ownerID } = await req.json();
	
	try {
        await createInvoice({
            user_id: ownerID,
            customer_id: customer,
            title,
            total_amount: total,
			items: JSON.stringify(items),
        })
		return NextResponse.json(
			{ message: "New Invoice Created!" },
			{ status: 201 }
		);
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}

export async function GET(req: NextRequest) {
	const userID = req.nextUrl.searchParams.get("userID");
	
	try {
		const invoices = await getUserInvoices(userID!);
		return NextResponse.json({message: "Invoices retrieved successfully!", invoices}, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}