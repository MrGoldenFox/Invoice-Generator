import { useRef, useState } from 'react'

export default function FormInput({ type, id, label, ...rest }) {
	const [preview, setPreview] = useState('/assets/logo.svg')
	const fileInputRef = useRef(null)

	function handleChange(e) {
		if (type === 'file') {
			const file = e.target.files[0]
			if (file) {
				const url = URL.createObjectURL(file)
				setPreview(url)
			}
		}
	}

	return (
		<div className='w-full my-5'>
			<label htmlFor={id} className='mb-1 block lg:text-lg text-body'>
				{label} :
			</label>
			{type === 'file' ? (
				<>
					<div className='w-full grid grid-cols-2 gap-10'>
						<button
							className='bg-accent text-background py-1.25 self-start rounded-md'
							onClick={() => fileInputRef.current.click()}
							type='button'
						>
							Set Logo
						</button>
						<div className='w-full min-h-20 flex justify-center items-center border-1 border-border rounded-md'>
							<img
								src={preview}
								alt='Preview your logo'
								className='w-auto max-h-16'
							/>
						</div>

						<input
							type='file'
							ref={fileInputRef}
							className='hidden'
							onChange={handleChange}
							name='logo'
						/>
					</div>
				</>
			) : (
				<>
					<input
						type={type}
						id={id}
						name={id}
						className='border-1 border-border block w-full p-1 outline-0 rounded-md'
						{...rest}
					/>
				</>
			)}
		</div>
	)
}
