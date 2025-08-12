import { useState } from 'react'

const STORAGE_KEY = 'invoices'

export default function SaveBtn({ invoice }) {
	const [saving, setSaving] = useState(false)
	const [saved, setSaved] = useState(false)

	const toDataURL = async url => {
		try {
			const res = await fetch(url)
			const blob = await res.blob()
			return await new Promise((resolve, reject) => {
				const r = new FileReader()
				r.onloadend = () => resolve(r.result)
				r.onerror = reject
				r.readAsDataURL(blob)
			})
		} catch {
			return null
		}
	}

	const onSave = async () => {
		if (!invoice) return
		setSaving(true)
		setSaved(false)
		try {
			const copy = { ...invoice }
			copy.id = copy.id ?? crypto.randomUUID()
			copy.updatedAt = new Date().toISOString()

			if (
				typeof copy.logoPreview === 'string' &&
				copy.logoPreview.startsWith('blob:')
			) {
				const dataUrl = await toDataURL(copy.logoPreview)
				if (dataUrl) copy.logoPreview = dataUrl
				else delete copy.logoPreview
			}

			let list
			try {
				list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
				if (!Array.isArray(list)) list = []
			} catch {
				list = []
			}

			const idx = list.findIndex(
				x => (x.id || x.invoice_number) === (copy.id || copy.invoice_number)
			)
			if (idx >= 0) list[idx] = { ...list[idx], ...copy }
			else {
				copy.createdAt = new Date().toISOString()
				list.push(copy)
			}

			localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
			setSaved(true)
		} finally {
			setSaving(false)
		}
	}

	const base =
		'py-1 px-3 rounded-md font-bold transition-colors disabled:opacity-50'
	const defaultStyles = 'bg-background text-accent'
	const savedStyles = 'bg-green-600 text-white'

	return (
		<button
			type='button'
			onClick={onSave}
			disabled={saving || !invoice || saved}
			className={`${base} ${saved ? savedStyles : defaultStyles}`}
		>
			{saving ? 'Saving…' : saved ? 'Saved' : 'Save on website'}
		</button>
	)
}
