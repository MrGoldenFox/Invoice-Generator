// npm i jspdf html2canvas
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { useRef, useState } from 'react'

export default function LoadBtn({ invoice }) {
	const [busy, setBusy] = useState(false)
	const pageRef = useRef(null)

	const fmt = n =>
		new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: 'USD',
		}).format(Number(n || 0))
	const lineTotal = s => Number(s?.hours || 0) * Number(s?.rate || 0)
	const grandTotal = () =>
		(invoice?.services || []).reduce((sum, s) => sum + lineTotal(s), 0)

	const download = async () => {
		if (!pageRef.current) return
		setBusy(true)
		try {
			// ensure layout is painted
			await new Promise(r => setTimeout(r, 0))
			const canvas = await html2canvas(pageRef.current, {
				scale: Math.min(2, window.devicePixelRatio || 1),
				backgroundColor: '#ffffff',
				useCORS: true,
			})
			const img = canvas.toDataURL('image/png')

			const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' })
			const pageW = pdf.internal.pageSize.getWidth()
			const pageH = pdf.internal.pageSize.getHeight()
			// capture is exactly A4 aspect; fill page with small margins
			const margin = 8
			const w = pageW - margin * 2
			const h = pageH - margin * 2
			pdf.addImage(img, 'PNG', margin, margin, w, h, '', 'FAST')
			pdf.save(`invoice_${invoice?.invoice_number || 'draft'}.pdf`)
		} finally {
			setBusy(false)
		}
	}

	return (
		<>
			<button
				type='button'
				onClick={download}
				disabled={busy}
				className='py-1 px-3 bg-background rounded-md text-accent font-bold disabled:opacity-50'
			>
				{busy ? 'Preparing…' : 'Load on device'}
			</button>

			{/* Hidden A4 page to render */}
			<div
				ref={pageRef}
				style={{
					position: 'fixed',
					left: '-10000px',
					top: '-10000px',
					width: '794px', // ~ A4 at 96dpi
					height: '1123px', // ~ A4 at 96dpi
					background: '#fff',
					color: '#111',
					padding: '24px',
					boxSizing: 'border-box',
				}}
			>
				{/* Header */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						gap: 16,
						marginBottom: 16,
					}}
				>
					<div>
						<div style={{ fontSize: 22, fontWeight: 700 }}>Invoice</div>
						{invoice?.logoPreview && (
							<img
								alt='logo'
								src={invoice.logoPreview}
								style={{
									maxWidth: 80,
									maxHeight: 80,
									marginTop: 8,
									borderRadius: 6,
									background: '#f3f4f6',
									padding: 4,
								}}
							/>
						)}
					</div>
					<div style={{ textAlign: 'right', lineHeight: 1.4 }}>
						<div style={{ fontSize: 18, fontWeight: 700 }}>{invoice?.name}</div>
						<div>{invoice?.phone}</div>
						<div>{invoice?.email}</div>
						<div>{invoice?.address}</div>
						<div>{invoice?.website}</div>
					</div>
				</div>

				{/* Meta */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 16,
						borderBottom: '2px solid #e5e7eb',
						paddingBottom: 12,
						marginBottom: 16,
					}}
				>
					<div style={{ lineHeight: 1.6 }}>
						<div style={{ fontWeight: 700 }}>INVOICE INFORMATION</div>
						<div>Invoice number: {invoice?.invoice_number}</div>
						<div>Date of issue: {invoice?.date_of_issue}</div>
						<div>Due date: {invoice?.due_date}</div>
					</div>
					<div style={{ lineHeight: 1.6, textAlign: 'right' }}>
						<div style={{ fontWeight: 700 }}>CUSTOMER INFORMATION</div>
						<div>{invoice?.customer_name || invoice?.name}</div>
						<div>{invoice?.customer_address}</div>
					</div>
				</div>

				{/* Table header */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '2fr 4fr 1fr 1fr 1.4fr',
						borderBottom: '2px solid #e5e7eb',
						padding: '6px 8px',
						fontWeight: 700,
						marginBottom: 8,
					}}
				>
					<div>NAME</div>
					<div>DESC</div>
					<div>HOURS</div>
					<div>RATE</div>
					<div>SUB-TOTAL</div>
				</div>

				{/* Rows */}
				<div style={{ display: 'grid', rowGap: 6 }}>
					{(invoice?.services || []).map((s, i) => (
						<div
							key={i}
							style={{
								display: 'grid',
								gridTemplateColumns: '2fr 4fr 1fr 1fr 1.4fr',
								padding: '6px 8px',
								border: '1px solid #e5e7eb',
								borderRadius: 4,
							}}
						>
							<div style={{ fontWeight: 600 }}>{s?.name}</div>
							<div>{s?.description}</div>
							<div>{s?.hours}</div>
							<div>{fmt(s?.rate)}</div>
							<div>{fmt(lineTotal(s))}</div>
						</div>
					))}
				</div>

				{/* Total */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						gap: 12,
						marginTop: 16,
						padding: '16px 8px',
					}}
				>
					<div style={{ fontWeight: 700 }}>TOTAL</div>
					<div>{fmt(grandTotal())}</div>
				</div>

				{/* Terms */}
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: '1fr 1fr',
						gap: 12,
						borderTop: '2px solid #e5e7eb',
						paddingTop: 12,
						marginTop: 'auto',
					}}
				>
					<div
						style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}
					>
						<div style={{ fontWeight: 700, marginBottom: 6 }}>TERMS:</div>
						<div>{invoice?.terms}</div>
					</div>
					<div
						style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}
					>
						<div style={{ fontWeight: 700, marginBottom: 6 }}>CONDITIONS:</div>
						<div>{invoice?.conditions}</div>
					</div>
				</div>
			</div>
		</>
	)
}
