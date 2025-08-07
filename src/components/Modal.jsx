import { useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ setModal, invoice }) {
	// ---- helpers -------------------------------------------------------------
	const qty = useMemo(() => +invoice.service_qty || 0, [invoice.service_qty])
	const rate = useMemo(() => +invoice.service_rate || 0, [invoice.service_rate])
	const amount = useMemo(() => qty * rate, [qty, rate])

	const overlayRef = useRef(null)

	useEffect(() => {
		const onKey = e => e.key === 'Escape' && setModal(false)
		document.addEventListener('keydown', onKey)
		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.removeEventListener('keydown', onKey)
			document.body.style.overflow = prev
		}
	}, [setModal])

	const closeOnOverlay = e => e.target === overlayRef.current && setModal(false)

	// ---- data for loops ------------------------------------------------------
	const headerRight = [
		{ text: invoice.address },
		{ text: invoice.phone },
		{ text: invoice.email },
		{ text: invoice.website },
	].filter(x => x.text)

	const invoiceDetails = [
		['Invoice #', invoice.invoice_number],
		['Date of Issue', invoice.date_of_issue],
		['Due Date', invoice.due_date],
	]

	// поддержка нескольких позиций (сейчас одна)
	const items = [
		{
			name: invoice.service_name,
			desc: invoice.service_description,
			qty,
			rate,
			amount,
		},
	]

	// ---- component -----------------------------------------------------------
	return createPortal(
		<div
			ref={overlayRef}
			onClick={closeOnOverlay}
			className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3'
			role='dialog'
			aria-modal='true'
		>
			{/* ВАЖНО: max-h и overflow-auto -> можно скроллить, если >100vh */}
			<section className='w-[min(94vw,48rem)] bg-white rounded-2xl shadow-2xl overflow-hidden text-[11.5px] sm:text-xs max-h-[92vh] flex flex-col'>
				{/* header */}
				<header className='bg-accent text-white p-3 sm:p-4 flex items-start justify-between gap-10'>
					<div className='flex items-center gap-3'>
						{!!invoice.logoPreview && (
							<img
								src={invoice.logoPreview}
								alt='Logo'
								className='h-8 sm:h-10 w-auto object-contain rounded bg-white/10 p-1'
							/>
						)}
						<h4 className='text-xl sm:text-2xl font-semibold'>Invoice</h4>
					</div>
					<div className='text-right leading-tight flex flex-col gap-2'>
						<strong className='text-sm sm:text-base block'>
							{invoice.name}
						</strong>
						{headerRight.map(({ text }) => (
							<p key={text} className='text-white modal-p'>
								{text}
							</p>
						))}
					</div>
				</header>

				{/* scrollable content */}
				<div className='overflow-auto'>
					{/* details */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 border-b border-border'>
						<div>
							<h5 className='uppercase tracking-wide text-[0.7rem] pb-2'>
								Invoice details:
							</h5>
							{invoiceDetails.map(([label, value]) => (
								<p key={label}>
									<span className='opacity-70'>{label}</span>{' '}
									<span className='font-medium'>{value}</span>
								</p>
							))}
						</div>
						<div className='sm:text-right'>
							<h5 className='uppercase tracking-wide text-[0.7rem] pb-2'>
								Bill To:
							</h5>
							<p className='font-medium'>{invoice.customer_name}</p>
							{invoice.customer_address && (
								<p className='line-clamp-2 sm:line-clamp-none'>
									{invoice.customer_address}
								</p>
							)}
						</div>
					</div>

					{/* items */}
					<div className='p-4'>
						<div className='rounded-lg border border-border overflow-hidden'>
							{/* head */}
							<div className='hidden sm:grid grid-cols-[2fr,3fr,1fr,1fr,1fr] bg-neutral-50 text-[0.65rem] font-semibold uppercase tracking-wide px-3 py-2'>
								{['Item/Service', 'Desc', 'Qty/Hrs', 'Rate', 'Amount'].map(
									h => (
										<div
											key={h}
											className={/Qty|Rate|Amount/.test(h) ? 'text-right' : ''}
										>
											{h}
										</div>
									)
								)}
							</div>
							<div className='grid sm:hidden grid-cols-[2fr,1fr,1fr,1fr] bg-neutral-50 text-[0.65rem] font-semibold uppercase tracking-wide px-3 py-2'>
								{['Item', 'Qty', 'Rate', 'Amount'].map(h => (
									<div
										key={h}
										className={/Qty|Rate|Amount/.test(h) ? 'text-right' : ''}
									>
										{h}
									</div>
								))}
							</div>

							{/* rows */}
							{items.map((it, i) => (
								<div key={i} className='px-3 py-3'>
									<div className='grid sm:grid-cols-[2fr,3fr,1fr,1fr,1fr] grid-cols-[2fr,1fr,1fr,1fr] items-start gap-y-1'>
										<div className='text-[0.75rem]'>
											<div className='truncate' title={it.name}>
												{it.name}
											</div>
											<div className='sm:hidden text-[0.7rem] opacity-80'>
												{it.desc}
											</div>
										</div>
										<div className='hidden sm:block text-[0.75rem] opacity-80'>
											{it.desc}
										</div>
										<div className='text-right text-[0.75rem]'>{it.qty}</div>
										<div className='text-right text-[0.75rem]'>
											${it.rate.toFixed(2)}
										</div>
										<div className='text-right text-[0.75rem] font-medium'>
											${it.amount.toFixed(2)}
										</div>
									</div>
								</div>
							))}

							{/* totals */}
							<div className='flex justify-end gap-6 border-t border-border px-3 py-3'>
								<div className='w-44 sm:w-48 text-[0.75rem]'>
									{[
										['Subtotal', amount],
										['Total', amount, true],
									].map(([lbl, val, bold]) => (
										<div
											key={lbl}
											className={`flex justify-between ${
												bold ? 'mt-2 font-semibold text-[0.8rem]' : ''
											}`}
										>
											<span className={bold ? '' : 'opacity-70'}>{lbl}</span>
											<span className={bold ? '' : 'font-medium'}>
												${Number(val).toFixed(2)}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* terms/conditions */}
						<div className='grid sm:grid-cols-2 gap-3 mt-4'>
							{[
								['Terms', invoice.terms],
								['Conditions', invoice.conditions],
							]
								.filter(([, text]) => !!text)
								.map(([title, text]) => (
									<div
										key={title}
										className='p-3 rounded-md bg-neutral-50 border border-border break-words'
									>
										<h6 className='uppercase text-[0.65rem] mb-1'>{title}</h6>
										<p className='text-[0.7rem] leading-snug'>{text}</p>
									</div>
								))}
						</div>
					</div>
				</div>

				{/* actions (не участвуют в принте) */}
				<footer className='flex justify-end gap-2 p-3 sm:p-4 bg-neutral-50 border-t border-border print:hidden'>
					<button
						onClick={() => setModal(false)}
						className='py-2 px-4 rounded-lg border border-neutral-300 hover:bg-neutral-100 transition'
					>
						Close
					</button>
					<button className='py-2 px-4 rounded-lg bg-accent text-white hover:opacity-90 transition'>
						Save
					</button>
					<button
						onClick={() => window.print()}
						className='py-2 px-4 rounded-lg bg-accent text-white hover:opacity-90 transition'
					>
						Download
					</button>
				</footer>

				<style>{`
          @media print {
            @page { size: A4; margin: 10mm }
            html,body { width:210mm; height:297mm }
            .rounded-2xl { border-radius: 0 !important }
            section { box-shadow: none !important }
            section * { font-size: 11px !important }
            header, .p-4, .p-3 { padding: 8px !important }
          }
        `}</style>
			</section>
		</div>,
		document.body
	)
}
