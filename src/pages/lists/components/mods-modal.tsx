import type { ModCandidate, ModEntry } from '@/api/bindings'
import { addMod, findMods, listMods, removeMod, syncMods } from '@/api/mods'
import type { Locale } from '@/utilities/localization'
import { DeleteOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons'
import { open as openDialog } from '@tauri-apps/plugin-dialog'
import { App as AntApp, Button, Checkbox, Empty, Modal, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import './mods-modal.scss'

/** Клиент управления модами: подменяется в тестах. */
export interface ModsClient {
	/** Установленные моды. */
	list(): Promise<ModEntry[]>

	/** Моды, найденные по стандартному пути SnowRunner. */
	find(): Promise<ModCandidate[]>

	/** Добавляет `.pak`; возвращает новый список. */
	add(path: string): Promise<ModEntry[]>

	/** Убирает мод; возвращает новый список. */
	remove(name: string): Promise<ModEntry[]>

	/** Пересобирает распакованные моды; возвращает новый список. */
	sync(): Promise<ModEntry[]>
}

/** Клиент управления модами по умолчанию. */
export const modsClient: ModsClient = {
	list: listMods,
	find: findMods,
	add: addMod,
	remove: removeMod,
	sync: syncMods
}

/** Параметры окна модов. */
export interface ModsModalProps {
	/** Окно открыто. */
	open: boolean

	/** Тексты экрана «Данные игры». */
	texts: Locale['setup']

	/** Подпись кнопки закрытия. */
	closeText: string

	/** Закрыть окно. */
	onClose(): void

	/** Список модов изменился: страница списков обновляет файлы. */
	onChanged(): void

	/** Клиент команд: подменяется в тестах. */
	client?: ModsClient
}

/**
 * Окно управления модами из списка автомобилей.
 *
 * Повторяет кнопку «Изменить» из 1.4.0: добавление `.pak`, удаление и
 * синхронизация без перехода на экран «Данные игры».
 */
export function ModsModal({
	open,
	texts,
	closeText,
	onClose,
	onChanged,
	client = modsClient
}: ModsModalProps) {
	const { message } = AntApp.useApp()
	const [items, setItems] = useState<ModEntry[] | null>(null)
	const [found, setFound] = useState<ModCandidate[] | null>(null)
	const [selected, setSelected] = useState<string[]>([])
	const [busy, setBusy] = useState(false)

	useEffect(() => {
		if (!open) {
			return
		}

		let cancelled = false

		client.list().then(
			value => {
				if (!cancelled) {
					setItems(value)
				}
			},
			reason => {
				if (!cancelled) {
					setItems([])
					message.error(toMessage(reason))
				}
			}
		)
		client.find().then(
			value => {
				if (!cancelled) {
					setFound(value)
				}
			},
			reason => {
				if (!cancelled) {
					setFound([])
					message.error(toMessage(reason))
				}
			}
		)

		return () => {
			cancelled = true
		}
	}, [client, message, open])

	function close() {
		setItems(null)
		setFound(null)
		setSelected([])
		onClose()
	}

	async function addFiles() {
		const selected = await openDialog({
			multiple: true,
			directory: false,
			filters: [{ name: 'mods', extensions: ['pak'] }]
		})
		const files = typeof selected === 'string' ? [selected] : selected

		if (!files?.length) {
			return
		}

		setBusy(true)

		try {
			let next = items ?? []

			for (const path of files) {
				next = await client.add(path)
			}

			setItems(next)
			onChanged()
			message.success(texts.saved)
		} catch (reason) {
			message.error(toMessage(reason))
		} finally {
			setBusy(false)
		}
	}

	async function addSelected() {
		if (selected.length === 0) {
			return
		}

		setBusy(true)

		try {
			let next = items ?? []

			for (const path of selected) {
				next = await client.add(path)
			}

			setItems(next)
			setSelected([])
			onChanged()
			message.success(texts.saved)
		} catch (reason) {
			message.error(toMessage(reason))
		} finally {
			setBusy(false)
		}
	}

	async function removeItem(name: string) {
		setBusy(true)

		try {
			setItems(await client.remove(name))
			onChanged()
		} catch (reason) {
			message.error(toMessage(reason))
		} finally {
			setBusy(false)
		}
	}

	async function syncItems() {
		setBusy(true)

		try {
			setItems(await client.sync())
			onChanged()
			message.success(texts.saved)
		} catch (reason) {
			message.error(toMessage(reason))
		} finally {
			setBusy(false)
		}
	}

	const installedPaths = new Set((items ?? []).map(mod => mod.path.toLowerCase()))
	const available = (found ?? []).filter(candidate => !installedPaths.has(candidate.path.toLowerCase()))

	return (
		<Modal
			open={open}
			title={texts.mods}
			width={520}
			onCancel={close}
			footer={<Button type="primary" onClick={close}>{closeText}</Button>}
		>
			{items === null
				? <div className="mods-modal-spin"><Spin /></div>
				: (
					<>
						{items.length === 0
							? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={texts.noMods} />
							: (
								<div className="mods-modal-list">
									{items.map(mod => (
										<div key={mod.name} className="mods-modal-item">
											<div className="mods-modal-info">
												<Typography.Text ellipsis={{ tooltip: mod.path }}>
													{mod.name}
												</Typography.Text>
												<Typography.Text type="secondary" ellipsis={{ tooltip: mod.path }}>
													{mod.path}
												</Typography.Text>
											</div>
											<Button
												type="text"
												danger
												disabled={busy}
												icon={<DeleteOutlined />}
												title={texts.removeMod}
												onClick={() => void removeItem(mod.name)}
											/>
										</div>
									))}
								</div>
							)}
						<div className="mods-modal-found">
							<Typography.Text strong>{texts.foundMods}</Typography.Text>
							{found === null
								? <div className="mods-modal-spin"><Spin size="small" /></div>
								: available.length === 0
									? <Typography.Text type="secondary">{texts.noFoundMods}</Typography.Text>
									: (
										<div className="mods-modal-list mods-modal-found-list">
											{available.map(candidate => (
												<Checkbox
													key={candidate.path}
													checked={selected.includes(candidate.path)}
													disabled={busy}
													onChange={event => setSelected(current => event.target.checked
														? [...current, candidate.path]
														: current.filter(path => path !== candidate.path))}
												>
													<span title={candidate.path}>{candidate.name}</span>
												</Checkbox>
											))}
										</div>
									)}
							{available.length > 0 && (
								<Button
									type="primary"
									loading={busy}
									disabled={selected.length === 0}
									onClick={() => void addSelected()}
								>
									{texts.addSelected}
								</Button>
							)}
						</div>
						<div className="mods-modal-actions">
							<Button loading={busy} icon={<PlusOutlined />} onClick={() => void addFiles()}>
								{texts.addMod}
							</Button>
							<Button disabled={busy} icon={<SyncOutlined />} onClick={() => void syncItems()}>
								{texts.syncMods}
							</Button>
						</div>
					</>
				)}
		</Modal>
	)
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
