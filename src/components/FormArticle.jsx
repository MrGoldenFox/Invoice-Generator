import FormInput from './FormInput'
import FormTextArea from './FormTextArea'

export default function FormArticle({ title, data, type = 'input' }) {
	return (
		<article className='card'>
			<h2 className='mb-4 text-xl text-balance lg:text-2xl'>{title}</h2>
			<ul className='md:grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
				{data.map(props => (
					<li key={props.id}>
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
