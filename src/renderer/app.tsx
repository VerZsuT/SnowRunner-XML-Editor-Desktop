import { EditorPage } from '@renderer/pages/editor'
import { ListsPage } from '@renderer/pages/lists'
import { SetupPage } from '@renderer/pages/setup'
import { useState } from 'react'

/** Открытый документ автомобиля. */
interface Selection {
	/** Имя файла без расширения. */
	name: string

	/** Вид документа. */
	kind: 'truck' | 'trailer'
}

/**
 * Корневой экран текущего этапа: списки, редактор и настройка.
 *
 * Навигация плоская: экран задаётся открытым документом или флагом настройки.
 */
export function App() {
	const [selected, setSelected] = useState<Selection | null>(null)
	const [setup, setSetup] = useState(false)

	if (selected) {
		return (
			<EditorPage
				name={selected.name}
				kind={selected.kind}
				onBack={() => setSelected(null)}
			/>
		)
	}

	if (setup) {
		return <SetupPage onBack={() => setSetup(false)} />
	}

	return (
		<ListsPage
			onOpen={(name, kind) => setSelected({ name, kind })}
			onSetup={() => setSetup(true)}
		/>
	)
}

