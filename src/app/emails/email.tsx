import { Heading, Hr, Text } from "@react-email/components";

interface Props {
	invoiceID: string;
	items: Item[];
	amount: number;
	issuerName: string;
	accountNumber: string;
	currency: string;
}
export default function EmailTemplate({
	invoiceID,
	items,
	amount,
	issuerName,
	accountNumber,
	currency,
}: Props) {
	return (
		<div>
			<Heading as='h2' style={{ color: "#0ea5e9" }}>
				Purhcase Invoice from {issuerName}
			</Heading>
			<Text style={{ marginBottom: 5 }}>Invoice No: INV0{invoiceID}</Text>
			<Heading as='h3'> Payment Details:</Heading>
			<Text>Account Details: {issuerName}</Text>
			<Text>Account Number: {accountNumber}</Text>
			<Text>Total Amount: {`${currency}${amount}`}</Text>
			<Hr />
			<Heading as='h3'> Items: </Heading>
			{items &&
				items.map((item, index) => (
					<div key={index}>
						<Text>
							{item.cost} x {item.quantity} = {item.price}
						</Text>
					</div>
				))}
		</div>
	);
}