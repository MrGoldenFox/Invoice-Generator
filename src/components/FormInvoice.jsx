import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	additional,
	billTo,
	companyData,
	invoiceDetails,
	serviceInput,
} from '../constants/FormInputs'
import FormArticle from './FormArticle'
import Modal from './Modal'

export default function FormInvoice() {
	const [modal, setModal] = useState(false)
	const [invoice, setInvoice] = useState({ services: [] })
	const [services, setServices] = useState([crypto.randomUUID()])

	useEffect(() => {
		document.body.style.overflowY = modal ? 'hidden' : 'auto'
	}, [modal])

	function handleSubmit(e) {
		e.preventDefault()

		const formData = new FormData(e.target)
		const data = {}
		const servicesArr = []

		for (let [key, value] of formData.entries()) {
			const m = key.match(/^service-(\d+)-(.+)$/)
			if (m) {
				const idx = Number(m[1])
				const field = m[2]
				if (!servicesArr[idx]) servicesArr[idx] = {}

				const coerced = ['quantity', 'rate'].includes(field)
					? Number(value)
					: value
				servicesArr[idx][field] = coerced
			} else {
				data[key] = value
			}
		}

		const logo = formData.get('logo')
		if (logo instanceof File && logo.size > 0) {
			data.logoPreview = URL.createObjectURL(logo)
		}

		data.services = servicesArr.filter(Boolean)

		setInvoice(data)
		setModal(true)
		console.log(data)
	}

	function addNewService() {
		setServices(prev => [...prev, crypto.randomUUID()])
	}

	return (
		<>
			<form className='flex flex-col gap-4 my-5' onSubmit={handleSubmit}>
				<FormArticle
					title='Enter information about your company'
					data={companyData}
				/>
				<FormArticle title='Enter invoice details' data={invoiceDetails} />
				<FormArticle title='Enter bill to' data={billTo} />
				<div>
					<div className='flex items-center justify-between my-5'>
						<h2 className='text-[6.5vw] sm:text-2xl md:text-3xl xl:text-4xl'>
							Create new service
						</h2>
						<button
							className='p-1 rounded bg-accent text-background flex gap-1 items-center'
							onClick={addNewService}
							type='button'
						>
							<Plus />
							<div className='hidden md:block text-background font-bold'>
								Create new service
							</div>
						</button>
					</div>
					<ul>
						{services.map((id, i) => (
							<li key={id}>
								<FormArticle
									title={`Service# ${i + 1}`}
									data={serviceInput.map(field => ({
										...field,
										name: `service-${i}-${field.id}`,
									}))}
									services={services}
									removeService={() =>
										setServices(prev => prev.filter(s => s !== id))
									}
								/>
							</li>
						))}
					</ul>
				</div>
				<FormArticle
					title='Enter additional information'
					data={additional}
					type='textarea'
				/>

				<button className='bg-accent text-background p-2 rounded-md md:max-w-50'>
					Create invoice
				</button>
			</form>
			{modal && <Modal setModal={setModal} invoice={invoice} />}
		</>
	)
}
