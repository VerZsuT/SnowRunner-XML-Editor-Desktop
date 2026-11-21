import { ReloadOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons'
import type { Truck } from '@renderer/api/bindings'
import type { DocumentClient, DocumentSession } from '@renderer/api/documents'
import { DocumentSession as Session, documentClient } from '@renderer/api/documents'
import { Header } from '@renderer/components/header'
import { prettyString } from '@utilities/strings'
import { App, Button, Result, Spin, Tooltip } from 'antd'
import { useEffect, useReducer, useState } from 'react'
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
}

/** Параметры страницы редактора. */
export interface EditorPageProps {
	/** Имя файла трака без расширения. */
	name: string

	/** Вид документа: трак или прицеп. */
	kind?: 'truck' | 'trailer'

	/** Вернуться к списку. */
	onBack(): void

	/** Клиент команд: подменяется в тестах. */
	client?: DocumentClient
}

/** Страница редактора трака. */
export function EditorPage({ name, kind = 'truck', onBack, client = documentClient }: EditorPageProps) {
	const { message, modal } = App.useApp()
	const [data, setData] = useState<EditorData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [reload, setReload] = useState(0)
	const [busy, setBusy] = useState(false)
	const [, forceRender] = useReducer((value: number) => value + 1, 0)
	const sessions = data ? [data.session, ...data.related.map(item => item.session)] : []

	useEffect(() => {
		let cancelled = false

		void (async () => {
			try {
				const session = await Session.open(kind, name, client)
				const truck = await session.readTruck()
				const related = await loadRelated(client, truck)

				if (!cancelled) {
					setData({ session, truck, related })
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
	}, [client, kind, name, reload])

	useEffect(() => {
		const opened = data ? [data.session, ...data.related.map(item => item.session)] : []
		const unsubscribers = opened.map(session => session.subscribe(forceRender))

		return () => {
			for (const unsubscribe of unsubscribers) {
				unsubscribe()
			}
		}
	}, [data])

	const dirty = sessions.some(session => session.dirty)
	const title = getTitle(data, name)

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
						? <TruckTable key={reload} session={data.session} truck={data.truck} related={data.related} />
						: <Spin className="editor-page-spin" size="large" />}
			</div>
		</div>
	)
}

/** Заголовок редактора: имя трака из UI-блока или имя файла. */
function getTitle(data: EditorData | null, name: string): string {
	const uiDesc = data?.truck.gameData?.uiDesc
	const uiName = uiDesc?.defaultRegion?.uiName ?? uiDesc?.uiName
	const text = uiName ? uiName.value ?? uiName.defaultValue : null

	return text
		? String(text)
		: prettyString(name).toUpperCase()
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
