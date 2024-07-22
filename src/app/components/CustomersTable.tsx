interface Customer {
	name: string;
	email: string;
	id: number;
}

export default function CustomersTable({
	customers,
}: {
	customers: Customer[];
	}) {
	
	const deleteCustomer = async (id: number) => { 
		try {
			const request = await fetch(`/api/customers?id=${id}`, {
				method: "DELETE",
			});
			const response = await request.json();
			alert(response.message);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<table>
			<thead>
				<tr>
				<th>Name</th>
				<th>Email</th>
					<th>Action</th>
					</tr>
			</thead>

			<tbody>
			{customers.length > 0 && customers.map((customer) => (
					<tr key={customer.id}>
						<td className='text-sm'>{customer.name}</td>
						<td className='text-sm'>{customer.email}</td>
						<td className='text-sm'>
							<button className='p-2 bg-red-500 text-red-50  text-xs rounded-sm' onClick={()=> deleteCustomer(customer.id)}>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}