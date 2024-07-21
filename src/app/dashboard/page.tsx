"use client";
import InvoiceTable from "@/app/components/InoviceTable";
import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SideNav from "@/app/components/SideNav";

export default function Dashboard() {
	const { isLoaded, isSignedIn, user } = useUser();
	const [itemList, setItemList] = useState<Item[]>([]);
	const [customer, setCustomer] = useState<string>("");
	const [invoiceTitle, setInvoiceTitle] = useState<string>("");
	const [itemCost, setItemCost] = useState<number>(1);
	const [itemQuantity, setItemQuantity] = useState<number>(1);
	const [itemName, setItemName] = useState<string>("");
	const [customers, setCustomers] = useState([]);
	const router = useRouter();

	const fetchCustomers = useCallback(async () => {
		try {
			const res = await fetch(`/api/customers?userID=${user?.id}`);
			const data = await res.json();
			setCustomers(data.customers);
		} catch (err) {
			console.log(err);
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			fetchCustomers();
		}
	}, [fetchCustomers, user]);

	const hamdleAddItem = (e: React.FormEvent) => {
		e.preventDefault();
		if (itemName.trim() && itemCost > 0 && itemQuantity >= 1) {
			setItemList([
				...itemList,
				{
					id: Math.random().toString(36).substring(2, 9),
					name: itemName,
					cost: itemCost,
					quantity: itemQuantity,
					price: itemCost * itemQuantity,
				},
			]);
		}

		setItemName("");
		setItemCost(0);
		setItemQuantity(0);
	};

	const getTotalAmount = () => {
		let total = 0;
		itemList.forEach((item) => {
			total += item.price;
		});
		return total;
	};

	const createInvoice = async () => {
		try {
			const res = await fetch("/api/invoices", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					customer,
					title: invoiceTitle,
					items: itemList,
					total: getTotalAmount(),
					ownerID: user?.id,
				}),
			});
			const data = await res.json();
			alert(data.message);
			router.push("/history");
		} catch (err) {
			console.log(err);
		}
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!customer || !invoiceTitle || !itemList.length || itemName) return;
		createInvoice();
	};

	if (!isLoaded || !isSignedIn) {
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<p className='text-lg'>Loading...</p>
			</div>
		)
	}
	return (
		<div className='w-full'>
			<main className='min-h-[90vh] flex items-start'>

				<SideNav />
				<div className='md:w-5/6 w-full h-full p-6'>
					<h2 className='font-bold text-2xl mb-3'>Add new invoice</h2>

					<form className='w-full flex flex-col' onSubmit={handleFormSubmit}>
						<label htmlFor='customer'>Customer</label>
						<select
							className='border-[1px] p-2 rounded-sm mb-3'
							required
							value={customer}
							onChange={(e) => setCustomer(e.target.value)}
						>
							{customers.map((customer: any) => (
								<option key={customer.id} value={customer.name}>
									{customer.name}
								</option>
							))}
						</select>

						<label htmlFor='title'>Title</label>
						<input
							className='border-[1px] rounded-sm mb-3 py-2 px-3'
							required
							value={invoiceTitle}
							onChange={(e) => setInvoiceTitle(e.target.value)}
						/>

						<div className='w-full flex justify-between flex-col'>
							<h3 className='my-4 font-bold '>Items List</h3>

							<div className='flex space-x-3'>
								<div className='flex flex-col w-1/4'>
									<label htmlFor='itemName' className='text-sm'>
										Name
									</label>
									<input
										type='text'
										name='itemName'
										placeholder='Name'
										className='py-2 px-4 mb-6 bg-gray-100'
										value={itemName}
										onChange={(e) => setItemName(e.target.value)}
									/>
								</div>

								<div className='flex flex-col w-1/4'>
									<label htmlFor='itemCost' className='text-sm'>
										Cost
									</label>
									<input
										type='number'
										name='itemCost'
										placeholder='Cost'
										className='py-2 px-4 mb-6 bg-gray-100'
										value={itemCost}
										onChange={(e) => setItemCost(Number(e.target.value))}
									/>
								</div>

								<div className='flex flex-col justify-center w-1/4'>
									<label htmlFor='itemQuantity' className='text-sm'>
										Quantity
									</label>
									<input
										type='number'
										name='itemQuantity'
										placeholder='Quantity'
										className='py-2 px-4 mb-6 bg-gray-100'
										value={itemQuantity}
										onChange={(e) => setItemQuantity(Number(e.target.value))}
									/>
								</div>

								<div className='flex flex-col justify-center w-1/4'>
									<p className='text-sm'>Price</p>
									<p className='py-2 px-4 mb-6 bg-gray-100'>
										{Number(itemCost * itemQuantity).toLocaleString("en-US")}
									</p>
								</div>
							</div>
							<button
								className='bg-blue-500 text-gray-100 w-[100px] p-2 rounded'
								onClick={hamdleAddItem}
							>
								Add Item
							</button>
						</div>

						<InvoiceTable itemList={itemList} />
						<button
							className='bg-blue-800 text-gray-100 w-full p-4 rounded my-6'
							type='submit'
						>
							SAVE & PREVIEW INVOICE
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}