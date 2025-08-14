import { ArrowBigDown, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { navLinks } from '../../constants/Navigation'

export const BurgerMenu = () => {
	const [menu, setMenu] = useState(false)

	const btnStyles = 'text-primary stroke-[1.25]'

	return (
		<div className='md:hidden flex items-center'>
			<button onClick={() => setMenu(!menu)}>
				{!menu ? <Menu className={btnStyles} /> : <X className={btnStyles} />}
			</button>

			{menu &&
				createPortal(
					<section className='absolute top-16 left-0 h-[calc(100vh-4rem)] w-full bg-background px-[2.5vw] md:hidden'>
						<ul className='flex flex-col w-full gap-1 py-5'>
							{navLinks.map(link => (
								<li key={link.title} className='w-full'>
									<Link
										to={link.url}
										className='border-b-1 border-border w-full flex items-center justify-between p-2'
										onClick={() => setMenu(false)}
									>
										<h6 className='text-md'>{link.title}</h6>
										<ArrowBigDown className={`{btnStyles}`} />
									</Link>
								</li>
							))}
						</ul>
					</section>,
					document.body
				)}
		</div>
	)
}
