import { createPortal } from 'react-dom'

export default function Modal({ setModal, invoice }) {
	return createPortal(
		<div className='w-full h-full bg-black/20 fixed left-0 top-0 flex justify-center items-center flex-col gap-2'>
			<section className='bg-background-accent aspect-[1/1.4] w-96'>
				<article className='bg-accent text-white p-2'>
					<div>
						<h4>Invoice</h4>
						<img src={invoice.logoPreview} alt='logo' />
					</div>
					<div>
						<strong>{invoice.name}</strong>
						<p>{invoice.address}</p>
						<p>{invoice.phone}</p>
						<p>{invoice.email}</p>
						<p>{invoice.website}</p>
					</div>
				</article>
				<article>
					<div>
						<h5 className='uppercase'>Invoice details:</h5>
						<p>
							Invoice # <span>{invoice.invoice_number}</span>
						</p>
						<p>
							Date of Issue <span>{invoice.date_of_issue}</span>
						</p>
						<p>
							Due Date <span>{invoice.due_date}</span>
						</p>
					</div>
				</article>
			</section>
			<div className='flex gap-5'>
				<button
					onClick={() => setModal(false)}
					className='bg-accent text-white py-2 px-4 rounded'
				>
					Close
				</button>
				<button className='bg-accent text-white py-2 px-4 rounded'>Save</button>
				<button className='bg-accent text-white py-2 px-4 rounded'>
					Download
				</button>
			</div>
		</div>,
		document.body
	)
}
