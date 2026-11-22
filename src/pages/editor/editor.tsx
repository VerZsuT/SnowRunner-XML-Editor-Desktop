import {
	ExportOutlined,
	FileTextOutlined,
	ImportOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SaveOutlined,
	UndoOutlined
} from '@ant-design/icons'
import type { AddonFile, DefaultValue, GameTexts, Truck, TruckAddon } from '@/api/bindings'
import type { DocumentClient, DocumentSession } from '@/api/documents'
import { DocumentSession as Session, documentClient } from '@/api/documents'
import { openPath } from '@/api/system'
import { loadGameTexts, translate } from '@/api/texts'
import { Header } from '@/components/header'
import { useConfig } from '@/config'
import { open, save as saveFileDialog } from '@tauri-apps/plugin-dialog'
import { formatString, prettyString } from '@/utilities/strings'
import { App, Button, Dropdown, Menu, Result, Spin, Tooltip } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useReducer, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { AddonDocument } from './components/addons'
import { DefaultsProvider } from './components/defaults'
import type { DefaultsStore, DocumentDefaults } from './components/defaults'
import type { RelatedDocument } from './components/related'
import { loadRelated } from './components/related'
import { TrailerTable } from './components/trailer-table'
import { TruckTable } from './components/truck-table'
import { texts } from './texts'
import './editor.scss'

/** Загруженный редактор. */
interface EditorData {
	/** Документ трака. */
	session: DocumentSession

	/** Модель трака. */
	truck: Truck

	/** Открытые связанные документы. */
	related: RelatedDocument[]

	/** Открытые аддоны. */
	addons: AddonDocument[]
}

/** До какого времени события watcher игнорируются: своё сохранение тоже меняет файлы. */
let suppressWatcherUntil = 0

/** Параметры страницы редактора. */
export interface EditorPageProps {
	/** Имя файла трака без расширения. */
	name: string

	/** Вид документа: трак или прицеп. */
	kind?: 'truck' | 'trailer'

	/** Мод, из которого открыт файл. */
	modName?: string | null

	/** Вернуться к списку. */
	onBack(): void

	/** Клиент команд: подменяется в тестах. */
	client?: DocumentClient

	/** Загрузчик игровых переводов: подменяется в тестах. */
	texts?(): Promise<GameTexts>
}

/** Страница редактора трака. */
export function EditorPage({
	name,
	kind = 'truck',
	modName = null,
	onBack,
	client = documentClient,
	texts: loadTexts = loadGameTexts
}: EditorPageProps) {
	const { message, modal } = App.useApp()
	const config = useConfig()
	const [data, setData] = useState<EditorData | null>(null)
	const [menuOpen, setMenuOpen] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [reload, setReload] = useState(0)
	const [busy, setBusy] = useState(false)
	const [gameTexts, setGameTexts] = useState<GameTexts | null>(null)
	const [defaults, setDefaults] = useState<DefaultsStore>({})
	const [, forceRender] = useReducer((value: number) => value + 1, 0)
	const opening = useRef(new Set<string>())
	const identity = `${kind}:${name}:${modName ?? ''}`
	const identityRef = useRef(identity)
	const sessions = data
		? [
			data.session,
			...data.related.map(item => item.session),
			...data.addons.map(item => item.session)
		]
		: []

	useEffect(() => {
		let cancelled = false
		const sameTruck = identityRef.current === identity

		identityRef.current = identity

		void (async () => {
			try {
				const session = await Session.open(kind, name, client, modName)
				const truck = await session.readTruck()
				const related = await loadRelated(client, truck, session.modName)

				if (!cancelled) {
					setData(previous => ({
						session,
						truck,
						related,
						addons: sameTruck ? previous?.addons ?? [] : []
					}))
					setError(null)
				}
			} catch (reason) {
				if (!cancelled) {
					setData(null)
					setError(toMessage(reason))
				}
			}
		})()

		return () => {
			cancelled = true
		}
	}, [client, identity, kind, modName, name, reload])

	useEffect(() => {
		const opened = data
			? [
				data.session,
				...data.related.map(item => item.session),
				...data.addons.map(item => item.session)
			]
			: []
		const unsubscribers = opened.map(session => session.subscribe(forceRender))

		return () => {
			for (const unsubscribe of unsubscribers) {
				unsubscribe()
			}
		}
	}, [data])

	// Актуальная модель для обработчика watcher: подписка не пересоздаётся на каждую правку.
	const dataRef = useRef<EditorData | null>(null)
	const watchKey = data
		? [
			data.session.path,
			...data.related.map(item => item.session.path),
			...data.addons.map(item => item.session.path)
		].join('\u0000')
		: ''

	useEffect(() => {
		dataRef.current = data
	}, [data])

	// Файлы могли изменить во внешнем редакторе: перечитываем модели без потери окна.
	useEffect(() => {
		if (!watchKey || !client.watch) {
			return
		}

		const paths = watchKey.split('\u0000')
		let stop: (() => void) | undefined
		let disposed = false

		async function refresh(changed: string[]) {
			if (Date.now() < suppressWatcherUntil) {
				return
			}

			const current = dataRef.current

			if (!current) {
				return
			}

			try {
				if (changed.includes(current.session.path)) {
					await current.session.reset()

					const truck = await current.session.readTruck()

					setData(previous => previous ? { ...previous, truck } : previous)
				}

				for (const item of current.related) {
					if (!changed.includes(item.session.path)) {
						continue
					}

					await item.session.reset()

					const updated = await reloadRelated(item)

					setData(previous => previous
						? {
							...previous,
							related: previous.related.map(doc => doc.session.docId === updated.session.docId
								? updated
								: doc)
						}
						: previous)
				}

				for (const item of current.addons) {
					if (!changed.includes(item.session.path)) {
						continue
					}

					await item.session.reset()

					const model = await item.session.readAddon()

					setData(previous => previous
						? {
							...previous,
							addons: previous.addons.map(doc => doc.session.docId === item.session.docId
								? { ...doc, model }
								: doc)
						}
						: previous)
				}
			} catch (reason) {
				message.error(toMessage(reason))
			}
		}

		void client.watch(paths, changed => void refresh(changed))
			.then(unsubscribe => {
				if (disposed) {
					unsubscribe()
				} else {
					stop = unsubscribe
				}
			})
			.catch(() => {
				// Watcher не обязателен: без него остаётся ручное перечитывание.
			})

		return () => {
			disposed = true
			stop?.()
		}
	}, [client, message, watchKey])

	// Значения по умолчанию нужны для подсказок и сброса отдельных полей.
	useEffect(() => {
		if (!data) {
			return
		}

		let cancelled = false
		const opened = [
			data.session,
			...data.related.map(item => item.session),
			...data.addons.map(item => item.session)
		]

		void Promise.all(opened.map(async session => (
			[session.docId, toDefaultsStore(await session.readDefaults())] as const
		)))
			.then(entries => {
				if (!cancelled) {
					setDefaults(Object.fromEntries(entries) as DefaultsStore)
				}
			})
			.catch(() => {
				// Без выгрузки остаются значения по умолчанию из модели.
			})

		return () => {
			cancelled = true
		}
	}, [data])

	useEffect(() => {
		let cancelled = false

		void (async () => {
			try {
				const value = await loadTexts()

				if (!cancelled) {
					setGameTexts(value)
				}
			} catch {
				// Переводы не обязательны: без них остаются ключи и имена файлов.
			}
		})()

		return () => {
			cancelled = true
		}
	}, [loadTexts])

	const dirty = sessions.some(session => session.dirty)
	const title = getTitle(data, name, gameTexts)

	/** Открывает аддон трака; повторный выбор возвращает уже открытый. */
	async function openAddon(addon: AddonFile) {
		if (!data || data.addons.some(item => item.addon.path === addon.path)) {
			return
		}

		if (opening.current.has(addon.path)) {
			return
		}

		opening.current.add(addon.path)

		try {
			const session = await Session.openAt(addon.path, client)
			const model = await session.readAddon()

			setData(previous => {
				if (!previous || previous.addons.some(item => item.addon.path === addon.path)) {
					return previous
				}

				return {
					...previous,
					addons: [...previous.addons, { addon, session, model }]
				}
			})
		} finally {
			opening.current.delete(addon.path)
		}
	}

	/** Перечитывает модель открытого аддона после правки его дерева. */
	async function refreshAddon(doc: AddonDocument): Promise<TruckAddon | null> {
		const model = await doc.session.readAddon()

		setData(previous => previous
			? {
				...previous,
				addons: previous.addons.map(item => item.session.docId === doc.session.docId
					? { ...item, model }
					: item)
			}
			: previous)

		return model
	}

	/** Перечитывает модель трака после действия с аддонами. */
	async function refreshTruck() {
		if (!data) {
			return
		}

		const truck = await data.session.readTruck()

		setData(previous => previous ? { ...previous, truck } : previous)
	}

	async function save() {
		suppressWatcherUntil = Date.now() + 1500
		setBusy(true)

		try {
			await client.saveAll()
			message.success(texts.saved)
		} catch (reason) {
			message.error(toMessage(reason))
		}

		setBusy(false)
		forceRender()
	}

	/** Экспортирует параметры трака в файл `.epf`. */
	async function exportEpf() {
		if (!data) {
			return
		}

		const path = await saveFileDialog({
			defaultPath: `${name}.epf`,
			filters: [{ name: 'EPF', extensions: ['epf'] }]
		})

		if (!path) {
			return
		}

		setBusy(true)

		try {
			const report = await data.session.exportEpf(path)

			message.success(formatString(texts.exported, String(report.attributes)))
		} catch (reason) {
			message.error(toMessage(reason))
		}

		setBusy(false)
	}

	/** Импортирует параметры в трак и перечитывает модель. */
	async function importEpf() {
		if (!data) {
			return
		}

		const path = await open({
			multiple: false,
			directory: false,
			filters: [{ name: 'EPF', extensions: ['epf'] }]
		})

		if (typeof path !== 'string') {
			return
		}

		suppressWatcherUntil = Date.now() + 2000
		setBusy(true)

		try {
			const report = await data.session.importEpf(path)

			// Импорт сразу переносится в исходный архив, как и обычное сохранение.
			await client.saveAll()
			message.success(formatString(texts.imported, String(report.attributes)))
			setReload(value => value + 1)
		} catch (reason) {
			message.error(toMessage(reason))
		}

		setBusy(false)
	}

	async function close() {
		await Promise.all(sessions.map(async session => session.close(true).catch(() => false)))
		onBack()
	}

	function reset() {
		modal.confirm({
			title: texts.resetConfirm,
			okText: texts.resetDocument,
			cancelText: texts.cancel,
			onOk: async () => {
				suppressWatcherUntil = Date.now() + 2000

				try {
					await Promise.all(sessions.map(async session => session.resetDefaults()))
					setReload(value => value + 1)
					message.success(texts.resetDone)
				} catch (reason) {
					message.error(toMessage(reason))
				}
			}
		})
	}

	function back() {
		if (!dirty) {
			void close()

			return
		}

		modal.confirm({
			title: texts.discardConfirm,
			okText: texts.close,
			cancelText: texts.cancel,
			onOk: close
		})
	}

	function openFile(session: DocumentSession) {
		void openPath(session.path).catch((reason: unknown) => message.error(toMessage(reason)))
	}

	const fileGroups = data
		? [
			{ key: 'main', label: texts.main, sessions: [data.session] },
			{
				key: 'engines',
				label: texts.engines,
				sessions: data.related.filter(item => item.kind === 'engines').map(item => item.session)
			},
			{
				key: 'gearboxes',
				label: texts.gearboxes,
				sessions: data.related.filter(item => item.kind === 'gearboxes').map(item => item.session)
			},
			{
				key: 'suspensions',
				label: texts.suspensions,
				sessions: data.related.filter(item => item.kind === 'suspensions').map(item => item.session)
			},
			{
				key: 'wheels',
				label: texts.wheels,
				sessions: data.related.filter(item => item.kind === 'wheels').map(item => item.session)
			},
			{
				key: 'winches',
				label: texts.winches,
				sessions: data.related.filter(item => item.kind === 'winches').map(item => item.session)
			}
		].filter(group => group.sessions.length > 0)
		: []

	const items: MenuProps['items'] = [
		{
			key: 'reset',
			label: menuLabel(texts.reset, <UndoOutlined />),
			disabled: !data,
			onClick: reset
		},
		{
			key: 'export',
			label: menuLabel(texts.exportEpf, <ExportOutlined />),
			disabled: !data,
			onClick: () => void exportEpf()
		},
		{
			key: 'import',
			label: menuLabel(texts.importEpf, <ImportOutlined />),
			disabled: !data,
			onClick: () => void importEpf()
		}
	]

	if (config.advancedMode && fileGroups.length > 0) {
		items.push({ type: 'divider' })
		items.push({
			key: 'files',
			label: texts.files,
			children: fileGroups.map(group => ({
				key: `files-${group.key}`,
				label: group.label,
				children: group.sessions.map(session => ({
					key: `file-${session.path}`,
					label: menuLabel(fileName(session.path), <FileTextOutlined />),
					onClick: () => openFile(session)
				}))
			}))
		})
	}

	return (
		<div className="editor-page">
			<Header
				text={title}
				withBack
				onBack={back}
				extra={(
					<>
						<Dropdown
							menu={{ items }}
							placement="bottomRight"
							trigger={['click']}
							open={menuOpen}
							onOpenChange={setMenuOpen}
						>
							<Button
								aria-label="editor-menu"
								className="editor-page-button"
								type="text"
								shape="circle"
								icon={menuOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							/>
						</Dropdown>
						<div className="editor-save">
							<Tooltip title={texts.save}>
								<Button
									aria-label="save"
									className="editor-page-button"
									type="text"
									shape="circle"
									loading={busy}
									disabled={!data}
									icon={<SaveOutlined />}
									onClick={() => void save()}
								/>
							</Tooltip>
							{dirty && (
								<span
									className="editor-page-dirty"
									aria-label="unsaved"
									title={texts.unsaved}
								>
									*
								</span>
							)}
						</div>
					</>
				)}
			/>

			<div className="editor-page-content">
				<DefaultsProvider values={defaults}>
					{error
					? (
						<Result
							status="error"
							title={texts.loadError}
							subTitle={error}
							extra={<Button onClick={back}>{texts.close}</Button>}
						/>
					)
					: data
						? kind === 'trailer'
							? (
								<TrailerTable
									key={reload}
									session={data.session}
									truck={data.truck}
								/>
							)
							: (
								<TruckTable
									key={reload}
									session={data.session}
									truck={data.truck}
									related={data.related}
									addons={data.addons}
									gameTexts={gameTexts}
									onOpenAddon={openAddon}
									onRefreshAddon={refreshAddon}
									onRefresh={refreshTruck}
								/>
							)
							: <Spin className="editor-page-spin" size="large" />}
				</DefaultsProvider>
			</div>
		</div>
	)
}

/** Пункт меню с иконкой справа, как в 1.4.0. */
function menuLabel(text: string, icon: ReactNode) {
	return (
		<span className="editor-menu-item">
			<span>{text}</span>
			{icon}
		</span>
	)
}

/** Имя файла с расширением. */
function fileName(path: string): string {
	return path.split(/[\\/]/).pop() ?? path
}

/** Перечитывает модель связанного документа после изменения файла. */
async function reloadRelated(doc: RelatedDocument): Promise<RelatedDocument> {
	switch (doc.kind) {
		case 'engines':
			return { ...doc, models: await doc.session.readEngines() }
		case 'gearboxes':
			return { ...doc, models: await doc.session.readGearboxes() }
		case 'suspensions':
			return { ...doc, models: await doc.session.readSuspensions() }
		case 'winches':
			return { ...doc, models: await doc.session.readWinches() }
		case 'wheels':
			return { ...doc, model: await doc.session.readWheels() }
	}
}

/** Заголовок редактора: перевод имени из UI-блока, ключ или имя файла. */
function getTitle(data: EditorData | null, name: string, texts: GameTexts | null): string {
	const uiDesc = data?.truck.gameData?.uiDesc
	const uiName = uiDesc?.defaultRegion?.uiName ?? uiDesc?.uiName
	const key = uiName ? uiName.value ?? uiName.defaultValue : null

	return translate(texts, key, data?.session.modName)
		?? (key ? String(key) : prettyString(name).toUpperCase())
}

/** Раскладывает плоский список значений в карту selector → имя → значение. */
function toDefaultsStore(values: DefaultValue[]): DocumentDefaults {
	const store: DocumentDefaults = {}

	for (const value of values) {
		const selector = store[value.selector] ?? {}

		selector[value.name] = value.value
		store[value.selector] = selector
	}

	return store
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
