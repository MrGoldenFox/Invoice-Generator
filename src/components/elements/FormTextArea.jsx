export default function FormTextArea({ id, label, ...rest }) {
	return (
		<div>
			<label htmlFor={id} className='mb-1 block lg:text-lg text-body'>
				{label}
			</label>

			<textarea
				name={id}
				id={id}
				className='border-1 border-border block w-full p-1 outline-0 rounded-md resize-none min-h-22 mb-4'
				{...rest}
			></textarea>
		</div>
	)
}
