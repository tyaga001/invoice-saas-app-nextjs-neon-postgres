export default function InvoiceTable({ itemList }: { itemList: Item[] }) {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Rate</th>
					<th>Quantity</th>
					<th>Amount</th>
				</tr>
			</thead>

			<tbody>
				{itemList.map((item) => (
					<tr key={item.id}>
						<td className='text-sm'>{item.name}</td>
						<td className='text-sm'>{item.cost}</td>
						<td className='text-sm'>{item.quantity}</td>
						<td className='text-sm'>
							{Number(item.cost * item.quantity).toLocaleString()}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}