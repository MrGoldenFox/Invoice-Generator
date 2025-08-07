import { useState } from 'react'
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
	const [modal, setModal] = useState(true)
	const [invoice, setInvoice] = useState({})

	function handleSubmit(e) {
		e.preventDefault()

		const form = e.target
		const formData = new FormData(form)

		const data = {}

		for (let [key, value] of formData.entries()) {
			data[key] = value
		}

		data.logoPreview = URL.createObjectURL(formData.get('logo'))

		setInvoice(data)
		setModal(true)
		console.log(JSON.stringify(invoice))
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
				<FormArticle title='Enter service' data={serviceInput} />
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
