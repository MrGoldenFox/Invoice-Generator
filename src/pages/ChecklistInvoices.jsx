import { useEffect, useState } from 'react'
import Modal from '../components/containers/Modal'
import InvoiceCard from '../components/elements/invoiceCard'
import { useModal } from '../context/ModalContext'

const STORAGE_KEY = 'invoices'

export default function ChecklistInvoices() {
	const [invoices, setInvoices] = useState(() => {
		try {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
		} catch {
			return []
		}
	})
	const { isOpen, openModal } = useModal()
	const [activeInvoice, setActiveInvoice] = useState(null)

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices))
	}, [invoices])

	const handleDelete = idx => {
		if (!confirm('Delete this invoice?')) return
		setInvoices(prev => prev.filter((_, i) => i !== idx))
	}

	const handlePreview = invoice => {
		setActiveInvoice(invoice) // set data to show
		openModal() // then open
	}

	return (
		<section>
			<h1 className='my-6'>CheckList Invoices</h1>
			<ul className='my-4 flex flex-col gap-2'>
				{invoices.map((invoice, idx) => (
					<li key={invoice.id ?? invoice.invoice_number ?? idx}>
						<InvoiceCard
							invoice={invoice}
							onPreview={() => handlePreview(invoice)}
							onDelete={() => handleDelete(idx)}
						/>
					</li>
				))}
			</ul>
			{isOpen && <Modal invoice={activeInvoice} />}
		</section>
	)
}
