import { createContext, useContext, useEffect, useState } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false)
	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	useEffect(() => {
		document.body.style.overflowY = isOpen ? 'hidden' : 'auto'
	}, [isOpen])

	return (
		<ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
			{children}
		</ModalContext.Provider>
	)
}

export function useModal() {
	const ctx = useContext(ModalContext)
	if (!ctx) throw new Error('useModal must be inside modal Provider')
	return ctx
}
