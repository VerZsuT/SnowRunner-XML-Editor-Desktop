import { loadConfig, saveConfig } from '@renderer/api/settings'
import { UpdateAlert } from '@renderer/components/update-alert'
import { WhatsNew } from '@renderer/components/whats-new'
import { applyConfig, useConfig } from '@renderer/config'
import { EditorPage } from '@renderer/pages/editor'
import { ListsPage } from '@renderer/pages/lists'
import { SetupPage } from '@renderer/pages/setup'
import { useEffect, useState } from 'react'

/** Открытый документ автомобиля. */
interface Selection {
	/** Имя файла без расширения. */
	name: string

	/** Вид документа. */
	kind: 'truck' | 'trailer'

	/** Мод, из которого открыт файл. */
	modName: string | null
}

/**
 * Корневой экран: списки, редактор и настройка.
 *
 * Навигация плоская: экран задаётся открытым документом или флагом настройки.
 * Уведомление об обновлении и окно «Что нового» живут над экраном.
 */
export function App() {
	const config = useConfig()
	const [selected, setSelected] = useState<Selection | null>(null)
	const [setup, setSetup] = useState(false)
	const [whatsNew, setWhatsNew] = useState(false)

	useEffect(() => {
		if (!config.openWhatsNew) {
			return
		}

		const timer = setTimeout(() => setWhatsNew(true), 1000)

		return () => clearTimeout(timer)
	}, [config.openWhatsNew])

	async function closeWhatsNew(open: boolean) {
		setWhatsNew(open)

		if (open) {
			return
		}

		applyConfig({ openWhatsNew: false })

		try {
			const dto = await loadConfig()

			await saveConfig({ ...dto, openWhatsNew: false })
		} catch {
			// Несохранённый флаг покажет окно ещё раз при следующем запуске.
		}
	}

	let page

	if (selected) {
		page = (
			<EditorPage
				name={selected.name}
				kind={selected.kind}
				modName={selected.modName}
				onBack={() => setSelected(null)}
			/>
		)
	} else if (setup) {
		page = <SetupPage onBack={() => setSetup(false)} />
	} else {
		page = (
			<ListsPage
				onOpen={(name, kind, modName) => setSelected({ name, kind, modName })}
				onSetup={() => setSetup(true)}
			/>
		)
	}

	return (
		<>
			{page}
			<UpdateAlert />
			<WhatsNew open={whatsNew} onOpenChange={open => void closeWhatsNew(open)} />
		</>
	)
}
