import Link from "next/link";
import { IoCreate, IoSettingsSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

export default function SideNav() {
	return (
		<div className='md:w-1/6 hidden md:flex h-[90vh] border-r-[1px] hover:border-gray-100 p-6 flex-col space-y-6'>
			<Link
				href='/dashboard'
				className='flex items-baseline hover:bg-blue-100 rounded-sm p-2'
			>
				<IoCreate className='mr-2 text-blue-500' /> New
			</Link>

			<Link
				href='/history'
				className='flex items-baseline hover:bg-blue-100 rounded-sm p-2'
			>
				<FaHistory className='mr-2 text-blue-500' /> History
			</Link>

			<Link
				href='/customers'
				className='flex items-baseline hover:bg-blue-100 rounded-sm p-2'
			>
				<FaUsers className='mr-2 text-blue-500' /> Customers
			</Link>

			<Link
				href='/settings'
				className='flex items-baseline hover:bg-blue-100 rounded-sm p-2'
			>
				<IoSettingsSharp className='mr-2 text-blue-500' />
				Bank Info
			</Link>
		</div>
	);
}