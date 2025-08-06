import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import ChecklistInvoices from './pages/ChecklistInvoices'
import CreateInvoice from './pages/CreateInvoice'
import Home from './pages/Home'

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<main className='container px-[2.5vw] mx-auto'>
					<Routes>
						<Route path={'/'} element={<Home />} />
						<Route path={'/create-invoice'} element={<CreateInvoice />} />
						<Route
							path={'/checklist-invoices'}
							element={<ChecklistInvoices />}
						/>
					</Routes>
				</main>
			</BrowserRouter>
		</>
	)
}

export default App
