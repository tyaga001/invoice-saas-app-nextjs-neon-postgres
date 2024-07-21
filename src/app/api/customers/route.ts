import { deleteCustomer, addCustomer, getCustomers } from "@/app/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { userID, customerName, customerEmail, customerAddress } =
		await req.json();

	try {
		await addCustomer({
			user_id: userID,
			name: customerName,
			email: customerEmail,
			address: customerAddress,
		});
		return NextResponse.json(
			{ message: "New Customer Created!" },
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
   const userID  = req.nextUrl.searchParams.get("userID");
    
	try {
		const customers = await getCustomers(userID!);
        return NextResponse.json({ message: "Customers retrieved successfully!", customers }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}

export async function DELETE(req: NextRequest) {
	const customerID = req.nextUrl.searchParams.get("id");

	try {
		await deleteCustomer(Number(customerID));
		return NextResponse.json({ message: "Customer deleted!" }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ message: "An error occurred", err },
			{ status: 400 }
		);
	}
}