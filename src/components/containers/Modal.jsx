import { Clock, DollarSign } from 'lucide-react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '../../context/ModalContext.jsx'
import LoadBtn from '../ui/LoadBtn.jsx'
import SaveBtn from '../ui/SaveBtn.jsx'

function Modal({ invoice }) {
	const { closeModal } = useModal()
	const overlayRef = useRef(null)

	const total = () => {
		let total = 0

		for (const service of invoice.services) {
			let subtotal = service.hours * service.rate
			total += subtotal
		}

		return total
	}

	return createPortal(
		<div
			className='fixed inset-0 flex justify-center items-center z-50 bg-black/5 backdrop-blur-xs'
			ref={overlayRef}
			onClick={e => e.target === overlayRef.current && closeModal()}
		>
			<section className='max-w-11/12 max-h-11/12 w-11/12 h-11/12 lg:w-auto lg:h-11/12 bg-background text-xs lg:aspect-210/297 flex flex-col'>
				<header className='p-4 flex items-center justify-between gap-5 bg-accent'>
					<article className='flex flex-col gap-3'>
						<h4 className='text-xl modal-headers text-background'>Invoice</h4>
						<img
							src={invoice.logoPreview}
							alt='logo of your company'
							className='max-w-16
							max-h-16 bg-background/20 p-1 rounded-md'
						/>
					</article>
					<article className='text-right flex flex-col gap-0.5'>
						<h4 className='text-xl modal-headers text-background'>
							{invoice.name}
						</h4>
						<p className='modal-p'>{invoice.phone}</p>
						<p className='modal-p'>{invoice.email}</p>
						<p className='modal-p'>{invoice.address}</p>
						<p className='modal-p'>{invoice.website}</p>
					</article>
				</header>
				<div className='overflow-y-auto h-full'>
					<div className='p-4 grid grid-cols-1 md:grid-cols-2 border-b-4 border-border gap-4'>
						<article className='flex flex-col gap-0.5'>
							<h4 className='text-md modal-headers'>INVOICE INFORMATION</h4>
							<p>Invoice number: {invoice.invoice_number}</p>
							<p>Date of issue: {invoice.date_of_issue}</p>
							<p>Due date: {invoice.due_date}</p>
						</article>
						<article className='text-left flex flex-col gap-0.5 md:text-right'>
							<h4 className='text-md modal-headers'>CUSTOMER INFORMATION</h4>
							<p>{invoice.customer_name}</p>
							<p>{invoice.customer_address}</p>
						</article>
					</div>
					<div className='p-4'>
						<article>
							<div className='grid grid-cols-10 border-b-[3px] border-border mb-2 p-1'>
								<h4 className='text-[0.85em] modal-headers col-[1/3] lowercase sm:uppercase'>
									NAME
								</h4>
								<h4 className='text-[0.85em] modal-headers col-[3/7] lowercase sm:uppercase'>
									DESCRIPTION
								</h4>
								<h4 className='text-[0.85em] modal-headers col-[7/8] lowercase sm:uppercase'>
									HOURS
								</h4>
								<h4 className='text-[0.85em] modal-headers col-[8/9] lowercase sm:uppercase'>
									RATE
								</h4>
								<h4 className='text-[0.85em] modal-headers col-[9/10] lowercase sm:uppercase text-nowrap'>
									SUB-TOTAL
								</h4>
							</div>

							<ul className='flex flex-col gap-1 text-[0.75em] sm:text-[0.85em]'>
								{invoice.services?.map((s, i) => (
									<li
										key={i}
										className='grid grid-cols-10 p-1 border border-border rounded-sm gap-0.5'
									>
										<div className='col-[1/3]'>{s.name}</div>
										<div className='col-[3/7]'>{s.description}</div>
										<div className='col-[7/8] flex items-center gap-0.2 sm:gap-1'>
											<div>
												<Clock className='w-3 h-3' />
											</div>
											{s.hours}
										</div>
										<div className='col-[8/9] flex items-center gap-0.2 sm:gap-1'>
											<div>
												<DollarSign className='w-3 h-3' />
											</div>
											{s.rate}
										</div>
										<div className='col-[9/11] flex items-center gap-0.2 sm:gap-1'>
											<div>
												<DollarSign className='w-3 h-3' />
											</div>
											{s.hours * s.rate}
										</div>
									</li>
								))}
							</ul>
						</article>
						<div className='flex flex-col items-end mt-2 px-5 py-2.5 border-t-4 border-border rounded-4xl ml-auto w-max'>
							<h4 className='text-md modal-headers'>TOTAL:</h4>
							<p className='flex gap-0.5 items-center'>
								<DollarSign size={'0.75rem'} className='green' /> {total()}
							</p>
						</div>
					</div>
					<div className='p-4 border-t-4 border-border gap-4 grid grid-cols-1 md:grid-cols-2 mt-auto'>
						<div className='p-1 border-1 border-border rounded-lg'>
							<h4 className='text-md modal-headers'>TERMS:</h4>
							<p>{invoice.terms}</p>
						</div>
						<div className='p-1 border-1 border-border rounded-lg'>
							<h4 className='text-md modal-headers'>CONDITIONS:</h4>
							<p>{invoice.conditions}</p>
						</div>
					</div>
				</div>
				<footer className='bg-accent text-background p-4 flex justify-between'>
					<button
						className='py-1 px-3 bg-background rounded-md text-accent font-bold'
						onClick={() => closeModal()}
					>
						Close
					</button>
					<div className='flex gap-2'>
						<LoadBtn invoice={invoice} total={total} />
						<SaveBtn invoice={invoice} />
					</div>
				</footer>
			</section>
		</div>,
		document.body
	)
}

export default Modal
