import blank from '/assets/blank-invoice.png'

export default function Hero() {
	return (
		<section className='flex flex-col gap-5 py-5 md:flex-row md:justify-evenly md:items-center'>
			<article className='flex flex-col gap-2 md:gap-4 card'>
				<h1>Invoice Generator</h1>
				<p className='text-balance max-w-96'>
					Create and send professional invoices easily with our online tool
				</p>
				<button className='max-w-40 bg-accent text-background py-2 rounded-md'>
					Create Invoice
				</button>
			</article>
			<img src={blank} alt='blank' className='md:w-1/4' />
		</section>
	)
}
