import { ReloadOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons'
import type { AddonFile, GameTexts, Truck } from '@renderer/api/bindings'
import type { DocumentClient, DocumentSession } from '@renderer/api/documents'
import { DocumentSession as Session, documentClient } from '@renderer/api/documents'
import { loadGameTexts, translate } from '@renderer/api/texts'
import { Header } from '@renderer/components/header'
import { prettyString } from '@utilities/strings'
import { App, Button, Result, Spin, Tooltip } from 'antd'
import { useEffect, useReducer, useRef, useState } from 'react'
import type { AddonDocument } from './components/addons'
import type { RelatedDocument } from './components/related'
import { loadRelated } from './components/related'
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
	const [data, setData] = useState<EditorData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [reload, setReload] = useState(0)
	const [busy, setBusy] = useState(false)
	const [gameTexts, setGameTexts] = useState<GameTexts | null>(null)
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
	async function refreshAddon(doc: AddonDocument) {
		const model = await doc.session.readAddon()

		setData(previous => previous
			? {
				...previous,
				addons: previous.addons.map(item => item.session.docId === doc.session.docId
					? { ...item, model }
					: item)
			}
			: previous)
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
				try {
					await Promise.all(sessions.map(async session => session.reset()))
					await Promise.all(data?.addons.map(async item => item.session.close(true).catch(() => false)) ?? [])
					setData(previous => previous ? { ...previous, addons: [] } : previous)
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

	return (
		<div className="editor-page">
			<Header
				text={title}
				withBack
				onBack={back}
				extra={(
					<>
						{dirty && <span className="editor-page-dirty">{texts.unsaved}</span>}
						<Tooltip title={texts.resetDocument}>
							<Button
								className="editor-page-button"
								type="text"
								shape="circle"
								disabled={!data}
								icon={<UndoOutlined />}
								onClick={reset}
							/>
						</Tooltip>
						<Tooltip title={texts.save}>
							<Button
								className="editor-page-button"
								type="text"
								shape="circle"
								loading={busy}
								disabled={!data}
								icon={<SaveOutlined />}
								onClick={() => void save()}
							/>
						</Tooltip>
						<Tooltip title={texts.refresh}>
							<Button
								className="editor-page-button"
								type="text"
								shape="circle"
								icon={<ReloadOutlined />}
								onClick={() => setReload(value => value + 1)}
							/>
						</Tooltip>
					</>
				)}
			/>

			<div className="editor-page-content">
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
						? (
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
			</div>
		</div>
	)
}

/** Заголовок редактора: перевод имени из UI-блока, ключ или имя файла. */
function getTitle(data: EditorData | null, name: string, texts: GameTexts | null): string {
	const uiDesc = data?.truck.gameData?.uiDesc
	const uiName = uiDesc?.defaultRegion?.uiName ?? uiDesc?.uiName
	const key = uiName ? uiName.value ?? uiName.defaultValue : null

	return translate(texts, key, data?.session.modName)
		?? (key ? String(key) : prettyString(name).toUpperCase())
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
