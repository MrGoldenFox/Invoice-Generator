import { X } from 'lucide-react'
import FormInput from './FormInput.jsx'
import FormTextArea from './FormTextArea.jsx'

export default function FormArticle({
	title,
	data,
	type = 'input',
	services = [],
	removeService,
}) {
	return (
		<article className='card'>
			<div className='flex justify-between items-center'>
				<h2 className='mb-4 text-xl text-balance lg:text-2xl'>{title}</h2>
				{services.length > 1 ? (
					<button
						className='bg-accent text-background p-1 rounded-md'
						type='button'
						onClick={removeService}
					>
						<X />
					</button>
				) : (
					''
				)}
			</div>
			<ul className='md:grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
				{data.map((props, i) => (
					<li key={i}>
						{type === 'input' ? (
							<FormInput {...props} />
						) : (
							<FormTextArea {...props} />
						)}
					</li>
				))}
			</ul>
		</article>
	)
}
