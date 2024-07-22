"use client"
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import SideNav from "@/app/components/SideNav";

export default function History() {
	const { isLoaded, isSignedIn, user } = useUser();
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	const fetchInvoices = useCallback(async () => {
		try {
			const res = await fetch(`/api/invoices?userID=${user?.id}`);
			const data = await res.json();
			setInvoices(data.invoices);

		} catch (err) {
			console.error(err);
		}

	}, [user]);

	useEffect(() => {
		fetchInvoices();
	}, [fetchInvoices]);

	if (!isSignedIn || !isLoaded) {
		return (
			<div className='w-full h-screen flex items-center justify-center'>
				<p className='text-lg'>Loading...</p>
			</div>
		);

	}
	return (
		<div className='w-full'>
			<main className='min-h-[90vh] flex items-start'>
				<SideNav />

				<div className='md:w-5/6 w-full h-full p-6'>
					<h2 className='text-2xl font-bold'>History</h2>
					<p className='opacity-70 mb-4'>
						View all your invoices and their status
					</p>

					{invoices.length > 0 ? invoices.map((invoice) => (

						<div className='bg-blue-50 w-full mb-3 rounded-md p-3 flex items-center justify-between' key={invoice.id}>
							<div>
								<p className='text-sm text-gray-500 mb-2'>
									Invoice - #0{invoice.id} issued to{" "}
									<span className='font-bold'>{invoice.customer_id}</span>
								</p>
								<h3 className='text-lg font-bold mb-[1px]'>{Number(invoice.total_amount).toLocaleString()}</h3>
							</div>
							<Link href={{
								pathname: `/invoices/${invoice.id}`,
								query: { customer: invoice.customer_id },
							}} className='bg-blue-500 text-blue-50 rounded p-3'>
								Preview
							</Link>
						</div>

					)) : (
						<p className='text-lg text-red-500'>No invoices found</p>
					)}

				</div>
			</main>
		</div>
	);
}