import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/containers/Header.jsx'
import { ModalProvider } from './context/ModalContext.jsx'
import ChecklistInvoices from './pages/ChecklistInvoices.jsx'
import CreateInvoice from './pages/CreateInvoice.jsx'
import Home from './pages/Home.jsx'

function App() {
	return (
		<>
			<BrowserRouter>
				<ModalProvider>
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
				</ModalProvider>
			</BrowserRouter>
		</>
	)
}

export default App
