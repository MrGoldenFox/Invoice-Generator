import { useModal } from '../../context/ModalContext'
import Modal from '../containers/Modal'
import LoadBtn from '../ui/LoadBtn'

export default function InvoiceCard({ invoice, onDelete, onPreview }) {
	const { isOpen, openModal } = useModal()

	return (
		<>
			<article className='flex flex-col w-full gap-2 items-center border-1 p-2 border-border bg-background-accent rounded-md justify-between sm:flex-row'>
				<div className='flex items-center gap-2'>
					<img
						src={invoice.logoPreview}
						alt='logo of your company'
						className='w-16
							h-16 bg-background/20 p-1 rounded-md'
					/>
					<h4 className='text-md font-medium'>to: {invoice.customer_name}</h4>
				</div>
				<div className='flex items-center gap-2'>
					<button
						className='bg-accent text-white py-1 px-2 rounded-md'
						onClick={onPreview}
					>
						Preview
					</button>
					<LoadBtn invoice={invoice} white_bg={true} />
					<button
						className='bg-red-900 text-white py-1 px-2 rounded-md'
						onClick={onDelete}
					>
						Delete
					</button>
				</div>
			</article>
			{isOpen && <Modal invoice={invoice} />}
		</>
	)
}
