import type { PathsDto } from '@/api/bindings'
import {
	backupArchive,
	isArchiveChanged,
	refreshArchive,
	restoreBackup,
	updateArchive
} from '@/api/archive'
import { loadPaths } from '@/api/settings'
import { openPath, openUrl, quitApp, resetToDefaults, uninstallApp } from '@/api/system'
import { useArchiveGuard } from '@/components/archive-guard'
import { useRecovery } from '@/components/recovery'
import { useConfig } from '@/config'
import { formatString } from '@/utilities/strings'
import type { Locale } from '@/utilities/localization'
import { LOCALES, T } from '@/utilities/localization'
import { App as AntApp, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useState } from 'react'
import './menu-bar.scss'

/** Ссылки меню «Помощь». */
const LINKS = {
	/** Руководство на mod.io. */
	guide: 'https://snowrunner.mod.io/guides/snowrunner-xml-editor',

	/** Исходный код программы. */
	github: 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop',

	/** Видео о программе. */
	youtube: 'https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2',

	/** Поддержка автора. */
	donation: 'https://www.donationalerts.com/r/verzsut'
}

/** Клиент меню: подменяется в тестах. */
export interface MenuBarClient {
	/** Пути программы. */
	paths(): Promise<PathsDto>

	/** Делает бэкап архива; возвращает путь копии. */
	backup(archivePath: string): Promise<string>

	/** Перечитывает архив; возвращает число файлов. */
	refresh(archivePath: string): Promise<number>

	/** Обновляет архив; возвращает число записей. */
	update(archivePath: string): Promise<number>

	/** Восстанавливает архив из бэкапа. */
	restore(archivePath: string): Promise<void>

	/** Открывает каталог программой по умолчанию. */
	openPath(path: string): Promise<void>

	/** Открывает ссылку в браузере. */
	openUrl(url: string): Promise<void>

	/** Сбрасывает программу к первоначальному состоянию. */
	reset(): Promise<void>

	/** Запускает деинсталлятор программы. */
	uninstall(): Promise<void>

	/** Закрывает программу. */
	quit(): Promise<void>

	/** Перезагружает интерфейс: нужен после перечитывания архива. */
	reload(): void
}

/** Клиент команд ядра. */
export const menuBarClient: MenuBarClient = {
	paths: loadPaths,
	backup: backupArchive,
	refresh: () => refreshArchive().then(result => result.files),
	update: path => updateArchive(path, null),
	restore: restoreBackup,
	openPath,
	openUrl,
	reset: resetToDefaults,
	uninstall: uninstallApp,
	quit: quitApp,
	reload: () => window.location.reload()
}

/** Состояние, от которого зависят доступность и обработчики пунктов. */
export interface MenuBarState {
	/** Путь к `initial.pak`: без него работа с архивом заблокирована. */
	initialPath: string | null

	/** Идёт операция с архивом. */
	busy: boolean

	/** Архив изменился или не проверен: запись в него запрещена. */
	readOnly: boolean

	/** Есть документы, которые можно восстановить после обновления игры. */
	recoveryAvailable: boolean
}

/** Обработчики пунктов меню. */
export interface MenuBarHandlers {
	/** Открыть каталог данных или бэкапов. */
	openFolder(kind: 'files' | 'backup'): void

	/** Выполнить операцию с архивом. */
	run(action: 'backup' | 'update' | 'unpack' | 'restore'): void

	/** Открыть ссылку. */
	openLink(url: string): void

	/** Сбросить программу к первоначальному состоянию. */
	reset(): void

	/** Удалить программу. */
	uninstall(): void

	/** Закрыть программу. */
	quit(): void

	/** Открыть окно настроек. */
	onSettings?(): void

	/** Открыть окно «Что нового». */
	onWhatsNew?(): void

	/** Открыть окно восстановления параметров после обновления игры. */
	recover(): void
}

/** Пункты верхнего меню: состав повторяет меню 1.4.0. */
export function buildMenuItems(
	{ initialPath, busy, readOnly, recoveryAvailable }: MenuBarState,
	handlers: MenuBarHandlers,
	texts: Locale['menu'] = T.menu
): MenuProps['items'] {
	const archiveBlocked = !initialPath
	const archiveLocked = archiveBlocked || readOnly

	return [
		{
			key: 'file',
			label: texts.file,
			children: [
				{
					key: 'openFiles',
					label: texts.openFiles,
					disabled: archiveBlocked,
					onClick: () => handlers.openFolder('files')
				},
				{
					key: 'updateArchive',
					label: texts.updateArchive,
					disabled: archiveLocked || busy,
					onClick: () => handlers.run('update')
				},
				{
					key: 'unpackArchive',
					label: texts.unpackArchive,
					disabled: archiveLocked || busy,
					onClick: () => handlers.run('unpack')
				},
				{ type: 'divider' },
				{ key: 'exit', label: texts.exit, onClick: handlers.quit }
			]
		},
		{
			key: 'backup',
			label: texts.backup,
			disabled: archiveBlocked,
			children: [
				{
					key: 'openBackup',
					label: texts.openBackup,
					onClick: () => handlers.openFolder('backup')
				},
				{ type: 'divider' },
				{
					key: 'saveBackup',
					label: texts.saveBackup,
					disabled: busy,
					onClick: () => handlers.run('backup')
				},
				{
					key: 'restoreBackup',
					label: texts.restoreBackup,
					disabled: busy,
					onClick: () => handlers.run('restore')
				},
				{ type: 'divider' },
				{
					key: 'recoverPrevious',
					label: texts.recoverPrevious,
					disabled: !recoveryAvailable || readOnly || busy,
					onClick: handlers.recover
				}
			]
		},
		{
			key: 'settings',
			label: texts.settings,
			children: [
				{ key: 'openSettings', label: texts.openSettings, onClick: handlers.onSettings },
				{ type: 'divider' },
				{
					key: 'resetSettings',
					label: texts.reset,
					disabled: archiveBlocked || busy,
					onClick: handlers.reset
				},
				{ key: 'uninstall', label: texts.uninstall, onClick: handlers.uninstall }
			]
		},
		{
			key: 'help',
			label: texts.help,
			children: [
				{ key: 'version', label: texts.version, onClick: handlers.onWhatsNew },
				{ type: 'divider' },
				{ key: 'howToUse', label: texts.howToUse, onClick: () => handlers.openLink(LINKS.guide) },
				{ key: 'github', label: texts.github, onClick: () => handlers.openLink(LINKS.github) },
				{ key: 'youtube', label: texts.youtube, onClick: () => handlers.openLink(LINKS.youtube) },
				{ key: 'support', label: texts.support, onClick: () => handlers.openLink(LINKS.donation) }
			]
		}
	]
}

/** Параметры верхнего меню. */
export interface MenuBarProps {
	/** Открыть окно настроек. */
	onSettings?(): void

	/** Открыть окно «Что нового». */
	onWhatsNew?(): void

	/** Клиент команд: подменяется в тестах. */
	client?: MenuBarClient
}

/** Верхнее меню программы: файлы, бэкап, настройки и помощь. */
export function MenuBar({ onSettings, onWhatsNew, client = menuBarClient }: MenuBarProps) {
	const { message, modal } = AntApp.useApp()
	const config = useConfig()
	const { readOnly, reportChanged } = useArchiveGuard()
	const { available: recoveryAvailable, open: openRecovery } = useRecovery()
	// Меню читает тексты из состояния: смена языка в настройках видна сразу.
	const texts = LOCALES[config.lang].menu
	const setupTexts = LOCALES[config.lang].setup
	const [busy, setBusy] = useState(false)
	const [openKeys, setOpenKeys] = useState<string[]>([])
	const initialPath = config.initialPath

	async function openFolder(kind: 'files' | 'backup') {
		try {
			const paths = await client.paths()

			await client.openPath(kind === 'files' ? paths.mainTemp : paths.backupFolder)
		} catch (reason) {
			message.error(toMessage(reason))
		}
	}

	async function run(action: 'backup' | 'update' | 'unpack' | 'restore') {
		if (!initialPath || busy) {
			return
		}

		setBusy(true)

		try {
			if (action === 'backup') {
				message.success(formatString(setupTexts.backedUp, await client.backup(initialPath)))
			} else if (action === 'update') {
				message.success(formatString(setupTexts.updated, String(await client.update(initialPath))))
			} else if (action === 'restore') {
				await client.restore(initialPath)
				message.success(setupTexts.restored)
			} else {
				await client.backup(initialPath)
				message.success(formatString(setupTexts.unpacked, String(await client.refresh(initialPath))))
				client.reload()
			}
		} catch (reason) {
			if (isArchiveChanged(reason)) {
				reportChanged()
			} else {
				message.error(toMessage(reason))
			}
		}

		setBusy(false)
	}

	function openLink(url: string) {
		void client.openUrl(url).catch(reason => message.error(toMessage(reason)))
	}

	function quit() {
		void client.quit().catch(reason => message.error(toMessage(reason)))
	}

	function reset() {
		modal.confirm({
			title: texts.reset,
			content: texts.resetConfirm,
			okText: texts.reset,
			cancelText: setupTexts.cancel,
			okButtonProps: { danger: true },
			onOk: () => client.reset().catch(reason => message.error(toMessage(reason)))
		})
	}

	function uninstall() {
		modal.confirm({
			title: texts.uninstall,
			content: texts.uninstallConfirm,
			okText: texts.uninstall,
			cancelText: setupTexts.cancel,
			okButtonProps: { danger: true },
			onOk: () => client.uninstall().catch(reason => message.error(toMessage(reason)))
		})
	}

	const items = buildMenuItems({ initialPath, busy, readOnly, recoveryAvailable }, {
		openFolder: kind => void openFolder(kind),
		run: action => void run(action),
		openLink,
		quit,
		reset,
		uninstall,
		recover: openRecovery,
		onSettings,
		onWhatsNew
	}, texts)

	return (
		<Menu
			className="menu-bar"
			mode="horizontal"
			selectable={false}
			triggerSubMenuAction="click"
			openKeys={openKeys}
			onOpenChange={keys => setOpenKeys(keys)}
			items={items}
		/>
	)
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
