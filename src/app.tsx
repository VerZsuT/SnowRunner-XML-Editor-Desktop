import { gameDataReady, saveConfig } from '@/api/settings'
import { ArchiveGuardProvider } from '@/components/archive-guard'
import { MenuBar } from '@/components/menu-bar'
import { SettingsModal } from '@/components/settings'
import { UpdateAlert } from '@/components/update-alert'
import { WhatsNew } from '@/components/whats-new'
import { applyConfig, useConfig } from '@/config'
import { EditorPage } from '@/pages/editor'
import { ListsPage } from '@/pages/lists'
import { WelcomePage } from '@/pages/welcome'
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
 * Корневой экран: списки, редактор и первоначальная настройка.
 *
 * Навигация плоская: экран задаётся открытым документом или проверкой игровых данных.
 * Уведомление об обновлении и окно «Что нового» живут над экраном.
 */
export function App() {
	const config = useConfig()
	const [selected, setSelected] = useState<Selection | null>(null)
	const [settings, setSettings] = useState(false)
	const [gameReady, setGameReady] = useState<boolean | null>(null)
	const [whatsNew, setWhatsNew] = useState(false)

	useEffect(() => {
		let cancelled = false

		gameDataReady().then(
			ready => {
				if (!cancelled) {
					setGameReady(ready)
				}
			},
			() => {
				// Ошибка проверки не должна запирать программу в первоначальной настройке.
				if (!cancelled) {
					setGameReady(true)
				}
			}
		)

		return () => {
			cancelled = true
		}
	}, [])

	useEffect(() => {
		// Первоначальная настройка не перекрывается окном «Что нового».
		if (!config.openWhatsNew || !gameReady) {
			return
		}

		const timer = setTimeout(() => setWhatsNew(true), 1000)

		return () => clearTimeout(timer)
	}, [config.openWhatsNew, gameReady])

	async function closeWhatsNew(open: boolean) {
		setWhatsNew(open)

		if (open) {
			return
		}

		// Сохраняется текущий снимок настроек: повторное чтение файла
		// перезаписало бы правки, сделанные в окне настроек.
		const current = applyConfig({ openWhatsNew: false })

		try {
			await saveConfig({ ...current, openWhatsNew: false })
		} catch {
			// Несохранённый флаг покажет окно ещё раз при следующем запуске.
		}
	}

	const listsReady = gameReady === true
	const listsHidden = selected !== null

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
	} else if (gameReady === false) {
		page = <WelcomePage />
	}

	return (
		<ArchiveGuardProvider ready={gameReady === true}>
			<div className="app">
				<MenuBar
					onSettings={() => setSettings(true)}
					onWhatsNew={() => setWhatsNew(true)}
				/>
				<div className="app-body">
					{/* Список остаётся смонтированным: при возврате из редактора сохраняются
					    фильтры, вид и позиция скролла, а файлы не запрашиваются заново. */}
					{listsReady && (
						<div className={listsHidden ? 'app-screen app-screen-hidden' : 'app-screen'}>
							<ListsPage
								active={!listsHidden}
								onOpen={(name, kind, modName) => setSelected({ name, kind, modName })}
							/>
						</div>
					)}
					{page}
				</div>
				<SettingsModal open={settings} onClose={() => setSettings(false)} />
				<UpdateAlert />
				<WhatsNew open={whatsNew} onOpenChange={open => void closeWhatsNew(open)} />
			</div>
		</ArchiveGuardProvider>
	)
}
