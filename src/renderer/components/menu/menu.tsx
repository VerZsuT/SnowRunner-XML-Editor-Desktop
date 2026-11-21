import { Page } from '@modules/windows/enums'
import { usePageStore } from '@renderer/pages/general/store/page'
import { useConfig } from '@renderer/utilities/use-reactive'
import { di } from '@utilities/di/container'
import { APP_TOKEN, ARCHIVER_TOKEN, BACKUP_TOKEN, CONFIG_TOKEN, FILES_TOKEN, MESSAGES_TOKEN, MODS_TOKEN, PATHS_TOKEN, SYSTEM_TOKEN } from '@utilities/di/renderer/tokens'
import type { MenuProps } from 'antd'
import type { ItemType } from 'antd/es/menu/interface'
import { Menu as AntMenu } from 'antd'
import { useEffect, useState } from 'react'
import { Settings } from '../settings'
import { WhatsNew } from '../whats-new'
import { MENU_LOCALIZATION as texts } from './localization'
import './menu.scss'

/** Главное меню программы. */
export function Menu() {
	const config = di.resolve(CONFIG_TOKEN)
	const configState = useConfig()
	const system = di.resolve(SYSTEM_TOKEN)
	const paths = di.resolve(PATHS_TOKEN)
	const app = di.resolve(APP_TOKEN)
	const backup = di.resolve(BACKUP_TOKEN)
	const archiver = di.resolve(ARCHIVER_TOKEN)
	const route = usePageStore(state => state.route)

	const [settingsHasBeenOpened, setSettingsHasBeenOpened] = useState(false)
	const [settingsIsOpen, setSettingsIsOpen] = useState(false)
	const [whatsNewHasBeenOpened, setWhatsNewHasBeenOpened] = useState(false)
	const [whatsNewIsOpen, setWhatsNewIsOpen] = useState(false)

	/** Отсутствует `initial.pak`. */
	const initialNotFound = !config.initialPath

	/** Ссылки на медиа ресурсы. */
	const links = {
		/** mod.io. */
		modio: 'https://snowrunner.mod.io/guides/snowrunner-xml-editor',

		/** github.com. */
		github: 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop',

		/** youtube.com. */
		youtube: 'https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2',

		/** donationalerts.com. */
		donation: 'https://www.donationalerts.com/r/verzsut'
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (config.openWhatsNew) {
				openWhatsNew()
				config.openWhatsNew = false
			}
		}, 1000)

		return () => clearTimeout(timeout)
		// Намеренно один раз после монтирования.
	}, [])

	function inAdvancedMode(items: ItemType[]) {
		return configState.advancedMode
			? items
			: []
	}

	async function unpackFiles() {
		const mods = di.resolve(MODS_TOKEN)

		route(Page.none)
		await new Promise(resolve => setTimeout(resolve, 0))
		await Promise.all([
			archiver.unpackMain(),
			mods.procMods()
		])
		route(Page.lists)
	}

	async function updateFiles() {
		const messages = di.resolve(MESSAGES_TOKEN)
		const hideLoading = messages.loading(texts.savingMessage)

		try {
			await archiver.updateFiles()
			messages.success(texts.successSaveFiles)
		} catch (error: any) {
			messages.error(error)
		}

		hideLoading()
	}

	function openSettings() {
		setSettingsHasBeenOpened(true)
		setSettingsIsOpen(true)
	}

	function openWhatsNew() {
		setWhatsNewHasBeenOpened(true)
		setWhatsNewIsOpen(true)
	}

	/** Элементы меню. */
	const items: MenuProps['items'] = [
		// Файл.
		{
			key: 'file_menu',
			label: texts.fileMenuLabel,
			children: [
				...inAdvancedMode([
					{
						key: 'open_files_folder',
						label: texts.openFilesFolderItemLabel,
						disabled: initialNotFound,
						onClick: () => system.openPath(paths.mainTemp)
					},
					{
						key: 'save_files',
						label: texts.saveFilesItemLabel,
						disabled: initialNotFound,
						onClick: () => void updateFiles()
					},
					{
						key: 'unpack_files',
						label: texts.unpackFilesItemLabel,
						disabled: initialNotFound,
						onClick: () => void unpackFiles()
					},
					{ type: 'divider' }
				]),
				{
					key: 'exit',
					label: texts.exitMenuItemLabel,
					onClick: () => app.quit()
				}
			]
		},

		// Бэкап.
		{
			key: 'backup_menu',
			label: texts.backupMenuLabel,
			disabled: initialNotFound,
			children: [
				{
					key: 'open_backup',
					label: texts.openButton,
					onClick: () => system.openPath(paths.backupFolder)
				},
				{ type: 'divider' },
				{
					key: 'save_backup',
					label: texts.saveButton,
					onClick: () => void backup.save()
				},
				{
					key: 'recover_from_backup',
					label: texts.restoreMenuItemLabel,
					onClick: () => void backup.recoverFromIt()
				}
			]
		},

		// Настройки.
		{
			key: 'settings_menu',
			label: texts.settingsMenuLabel,
			children: [
				{
					key: 'open_settings',
					label: texts.settingsMenuLabel,
					disabled: initialNotFound,
					onClick: openSettings
				},
				{ type: 'divider' },
				{
					key: 'reset_settings',
					label: texts.resetMenuItemLabel,
					disabled: initialNotFound,
					onClick: () => void app.reset()
				},
				{
					key: 'uninstall_program',
					label: texts.uninstallMenuItemLabel,
					onClick: async () => {
						const files = di.resolve(FILES_TOKEN)

						await system.openFile(files.uninstall.path)
						app.quit()
					}
				}
			]
		},

		// Помощь.
		{
			key: 'help_menu',
			label: texts.helpMenuLabel,
			children: [
				{
					key: 'version_info',
					label: texts.versionMenuItemLabel,
					onClick: openWhatsNew
				},
				{ type: 'divider' },
				{
					key: 'how_to_use',
					label: texts.howToUseTitle,
					onClick: () => system.openLink(links.modio)
				},
				{
					key: 'github',
					label: texts.githubTitle,
					onClick: () => system.openLink(links.github)
				},
				{
					key: 'youtube',
					label: texts.youtubeTitle,
					onClick: () => system.openLink(links.youtube)
				},
				{
					key: 'donation',
					label: texts.donationTitle,
					onClick: () => system.openLink(links.donation)
				}
			]
		}
	]

	return (
		<div className="menu-wrapper">
			<AntMenu
				className="menu"
				triggerSubMenuAction="click"
				mode="horizontal"
				selectable={false}
				items={items}
			/>
			{settingsHasBeenOpened && (
				<Settings open={settingsIsOpen} onOpenChange={setSettingsIsOpen} />
			)}
			{whatsNewHasBeenOpened && (
				<WhatsNew open={whatsNewIsOpen} onOpenChange={setWhatsNewIsOpen} />
			)}
		</div>
	)
}
