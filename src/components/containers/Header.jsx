import { Link } from 'react-router-dom'
import { navLinks } from '../../constants/Navigation'
import { BurgerMenu } from '../ui/BurgerMenu'
import logo from '/assets/logo.svg'

export const Header = () => {
	return (
		<header className='h-16 bg-background-accent border-b-1 border-border px-[2.5vw] flex items-center justify-between'>
			<img src={logo} alt='logo' className='h-16' />

			<BurgerMenu />

			<nav className='hidden md:flex'>
				<ul className='flex'>
					{navLinks.map(link => (
						<li key={link.title}>
							<Link to={link.url}>
								<h6 className='px-5 py-1.5 rounded-md text-accent text-base'>
									{link.title}
								</h6>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
