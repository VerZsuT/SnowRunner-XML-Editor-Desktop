import { CloudDownloadOutlined, DownOutlined } from '@ant-design/icons'
import { T } from '@localization'
import { errorMessage } from '@renderer/api/errors'
import {
	checkUpdate,
	disableUpdateChecks,
	downloadUpdate,
	installUpdate,
	onUpdateProgress
} from '@renderer/api/updates'
import type { UpdateProgress } from '@renderer/api/updates'
import { applyConfig } from '@renderer/config'
import { formatString } from '@utilities/strings'
import { Alert, Button, Dropdown, Modal, Progress, Space } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import './update-alert.scss'

/** Тексты окна. */
const texts = T.updateAlert

/** Состояние загрузки обновления. */
interface DownloadState {
	/** Процент загрузки. */
	percent: number

	/** Текст ошибки. */
	error: string | null
}

/** Параметры уведомления об обновлении. */
export interface UpdateAlertProps {
	/** Проверка версии: подменяется в тестах. */
	check?(): Promise<string | null>

	/** Загрузка файла: подменяется в тестах. */
	download?(version: string, portable: boolean): Promise<string>

	/** Запуск обновления: подменяется в тестах. */
	install?(path: string, portable: boolean): Promise<void>

	/** Отключение проверки обновлений: подменяется в тестах. */
	disable?(): Promise<void>

	/** Подписка на прогресс: подменяется в тестах. */
	subscribe?(handler: (progress: UpdateProgress) => void): Promise<() => void>
}

/** Уведомление о новой версии программы с загрузкой установщика. */
export function UpdateAlert({
	check = checkUpdate,
	download = downloadUpdate,
	install = installUpdate,
	disable = disableUpdateChecks,
	subscribe = onUpdateProgress
}: UpdateAlertProps) {
	const [version, setVersion] = useState<string | null>(null)
	const [visible, setVisible] = useState(true)
	const [downloadState, setDownloadState] = useState<DownloadState | null>(null)

	useEffect(() => {
		let cancelled = false

		void check()
			.then(value => {
				if (!cancelled) {
					setVersion(value)
				}
			})
			.catch(() => {
				// Проверка при старте не должна мешать работе программы.
			})

		return () => {
			cancelled = true
		}
	}, [check])

	useEffect(() => {
		let cancelled = false
		let unlisten: (() => void) | undefined

		void subscribe(progress => {
			setDownloadState(current => current && !current.error
				? { ...current, percent: progress.percent }
				: current)
		})
			.then(stop => {
				if (cancelled) {
					stop()
				} else {
					unlisten = stop
				}
			})
			.catch(() => {
				// Без события прогресса проценты просто не обновляются.
			})

		return () => {
			cancelled = true
			unlisten?.()
		}
	}, [subscribe])

	async function startUpdate(portable: boolean) {
		if (!version) {
			return
		}

		setDownloadState({ percent: 0, error: null })

		try {
			const path = await download(version, portable)

			setDownloadState(current => current && { ...current, percent: 100 })
			await install(path, portable)
			setDownloadState(null)
			setVisible(false)
		} catch (reason) {
			setDownloadState(current => current && {
				...current,
				error: errorMessage(reason)
			})
		}
	}

	async function ignore() {
		try {
			await disable()
			applyConfig({ checkUpdates: false })
		} catch {
			// Настройка не сохранена — уведомление всё равно скрываем до перезапуска.
		}

		setVisible(false)
	}

	if (!version || !visible) {
		return null
	}

	const menuItems: MenuProps['items'] = [
		{ key: 'installer', label: texts.installer },
		{ key: 'portable', label: texts.portable }
	]
	const onUpdateClick: MenuProps['onClick'] = ({ key }) => {
		void startUpdate(key === 'portable')
	}

	return (
		<>
			<Alert
				className="update-alert"
				type="info"
				showIcon
				icon={<CloudDownloadOutlined />}
				title={texts.title}
				description={formatString(texts.available, `v${version}`)}
				closable
				onClose={() => setVisible(false)}
				action={(
					<Space className="update-alert-buttons" orientation="vertical">
						<Dropdown menu={{ items: menuItems, onClick: onUpdateClick }} trigger={['click']}>
							<Button size="small" type="primary">
								{texts.update}
								<DownOutlined />
							</Button>
						</Dropdown>
						<Button size="small" danger type="primary" onClick={() => void ignore()}>
							{texts.ignore}
						</Button>
					</Space>
				)}
			/>
			<Modal
				open={downloadState !== null}
				title={texts.downloading}
				footer={downloadState?.error
					? <Button onClick={() => setDownloadState(null)}>{texts.close}</Button>
					: null}
				closable={false}
				mask={{ closable: false }}
			>
				{downloadState?.error
					? (
						<Alert
							type="error"
							showIcon
							title={texts.downloadError}
							description={downloadState.error}
						/>
					)
					: (
						<>
							<Progress percent={downloadState?.percent ?? 0} status="active" />
							{downloadState?.percent === 100 && <p>{texts.downloaded}</p>}
						</>
					)}
			</Modal>
		</>
	)
}
