// companyData
export const companyData = [
	{
		type: 'text',
		id: 'name',
		label: 'Business name',
		placeholder: 'e.g. Invoice Gen LLC',
		maxLength: 50,
		required: true,
	},
	{
		type: 'tel',
		id: 'phone',
		label: 'Phone number',
		placeholder: 'e.g. +1 (123) 456_7890',
		maxLength: 20,
		required: true,
	},
	{
		type: 'email',
		id: 'email',
		label: 'Email address',
		placeholder: 'e.g. contact@invoice.gen',
		maxLength: 50,
		required: true,
	},
	{
		type: 'text',
		id: 'address',
		label: 'Street address',
		placeholder: 'e.g. 123 Main St, Los Angeles, CA',
		maxLength: 100,
		required: true,
	},
	{
		type: 'url',
		id: 'website',
		label: 'Website (optional)',
		placeholder: 'e.g. https://invoice.gen',
		maxLength: 100,
		required: false,
	},
	{
		type: 'file',
		id: 'logo',
		label: 'Company logo',
		required: true,
		accept: 'image/*',
	},
]

export const invoiceDetails = [
	{
		type: 'number',
		id: 'invoice_number',
		label: 'Invoice number',
		placeholder: 'e.g. 20250001',
		max: 9999,
		required: true,
	},
	{
		type: 'date',
		id: 'date_of_issue',
		label: 'Date of issue',
		required: true,
	},
	{
		type: 'date',
		id: 'due_date',
		label: 'Due date',
		required: true,
	},
]

export const billTo = [
	{
		type: 'text',
		id: 'customer_name',
		label: 'Customer name',
		placeholder: 'e.g. John Doe',
		maxLength: 50,
		required: true,
	},
	{
		type: 'text',
		id: 'customer_address',
		label: 'Customer address',
		placeholder: 'e.g. 456 Market St, San Francisco, CA',
		maxLength: 100,
		required: true,
	},
]

export const serviceInput = [
	{
		type: 'text',
		id: 'service_name',
		label: 'Service name',
		placeholder: 'e.g. Web Design',
		maxLength: 50,
		required: true,
	},
	{
		type: 'text',
		id: 'service_description',
		label: 'Service description',
		placeholder: 'e.g. Full website design with responsive layout',
		maxLength: 150,
		required: true,
	},
	{
		type: 'number',
		id: 'service_qty',
		label: 'Quantity / Hours',
		placeholder: 'e.g. 10',
		max: 1000,
		required: true,
	},
	{
		type: 'number',
		id: 'service_rate',
		label: 'Rate (USD)',
		placeholder: 'e.g. 100',
		max: 100000,
		required: true,
	},
]

export const additional = [
	{
		id: 'terms',
		label: 'Terms and conditions',
		placeholder: 'e.g. Payment due within 15 days of receipt.',
		maxLength: 150,
		required: false,
	},
	{
		id: 'conditions',
		label: 'Special instructions',
		placeholder: 'e.g. Include invoice number in bank transfer notes.',
		maxLength: 150,
		required: false,
	},
]
