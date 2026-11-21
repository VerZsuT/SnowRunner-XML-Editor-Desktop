import { ExportOutlined, ImportOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons'
import { reportError } from '@modules/errors/renderer'
import type { IFile } from '@modules/files/types'
import { Page } from '@modules/windows/enums'
import { TruckFileType } from '@modules/xml/renderer'
import type { TruckXML } from '@modules/xml/renderer'
import { Header } from '@renderer/components/header'
import { EditedAction, useEditorStore } from '@renderer/pages/general/store/editor'
import { usePageStore } from '@renderer/pages/general/store/page'
import { useConfig } from '@renderer/utilities/use-reactive'
import { lastItem } from '@utilities/checks'
import { di } from '@utilities/di/container'
import { ARCHIVER_TOKEN, EDITED_TOKEN, FILES_TOKEN, GAME_TEXTS_TOKEN, MESSAGES_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import { prettyString } from '@utilities/strings'
import { Button, Dropdown, Modal, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { EDITOR_LOCALIZATION as texts } from '../../localization'
import { exportUtils } from '../../utilities/export'
import { useFilesMenuItems } from '../files-menu/files-menu'
import { useResetBucket, emitReset } from '../../utilities/reset'
import { importUtils } from '../../utilities/import'
import { saveUtils } from '../../utilities/save'

const { Text } = Typography

/** Параметры главного заголовка редактора. */
export interface MainHeaderProps {
	/** XML файла. */
	xml: TruckXML

	/** Файл. */
	file: IFile
}

/** Методы главного заголовка. */
export interface MainHeaderHandle {
	/** Сохранить. */
	save(updateFiles?: boolean): Promise<void>

	/** Сбросить. */
	reset(): Promise<void>

	/** Импортировать. */
	import(toImport?: IFile): Promise<void>

	/** Экспортировать. */
	export(toExport?: IFile): Promise<void>
}

/** Главный заголовок редактора. */
export const MainHeader = forwardRef<MainHeaderHandle, MainHeaderProps>(function MainHeader({ xml, file }, ref) {
	const configState = useConfig()
	const mods = di.resolve(MODS_TOKEN)
	const messages = di.resolve(MESSAGES_TOKEN)
	const route = usePageStore(state => state.route)
	const resetBucket = useResetBucket()
	const filesMenuItems = useFilesMenuItems()
	const [menuIsOpened, setMenuIsOpened] = useState(false)

	const mod = mods.findByFile(file)
	const title = getMainTitle()

	useImperativeHandle(ref, () => ({
		save: onSave,
		reset,
		import: importFile,
		export: exportFile
	}))

	const menuItems: MenuProps['items'] = [
		{
			key: 'reset',
			label: (
				<>
					<Text>{texts.resetMenuItemLabel}</Text>
					<UndoOutlined className="menu-item-icon" />
				</>
			),
			onClick: onReset
		},
		{
			key: 'export',
			label: (
				<>
					<Text>{texts.export}</Text>
					<ExportOutlined className="menu-item-icon" />
				</>
			),
			onClick: () => void exportFile()
		},
		{
			key: 'import',
			label: (
				<>
					<Text>{texts.import}</Text>
					<ImportOutlined className="menu-item-icon" />
				</>
			),
			onClick: () => void importFile()
		},
		...(configState.advancedMode ? filesMenuItems : [])
	]

	async function onSave(updateFiles = true) {
		const state = useEditorStore.getState()
		const hideLoading = state.showMessages
			? messages.loading(texts.savingMessage)
			: () => {}

		state.setIsSaving(true)

		try {
			await save(updateFiles)
			success(texts.successSaveFiles)
		} catch (error: any) {
			reportError(error, 'ui')
		}

		state.setIsSaving(false)
		hideLoading()
	}

	async function save(updateFiles = true) {
		await saveUtils.emitSave()

		if (updateFiles) {
			const archiver = di.resolve(ARCHIVER_TOKEN)
			const info = useEditorStore.getState().info

			if (info.mod) {
				await archiver.updateFiles(info.mod)
			}

			await archiver.updateFiles()
		}

		const edited = di.resolve(EDITED_TOKEN)
		const state = useEditorStore.getState()

		switch (state.editedAction) {
			case EditedAction.markAsEdited:
				edited.markAsEdited(file, xml.Type === TruckFileType.trailer)

				break
			case EditedAction.markAsNotEdited:
				edited.markAsNotEdited(file)

				break
		}

		state.setEditedAction(EditedAction.markAsEdited)
	}

	function getMainTitle(): string {
		if (xml.GameData?.UiDesc) {
			const text = xml.GameData.UiDesc.UiName ?? xml.GameData.UiDesc.DefaultRegion?.UiName

			return di.resolve(GAME_TEXTS_TOKEN).get(text, mods.getModID(file)) ?? text ?? 'TITLE_ERROR'
		}

		const separator = file.path.includes('/') ? '/' : '\\'
		const files = di.resolve(FILES_TOKEN)

		return prettyString(files.newFile(lastItem(file.path.split(separator))!).name).toUpperCase()
	}

	async function importFile(toImport?: IFile) {
		try {
			await importUtils.importFile(file, toImport)
			success(texts.wasImported)
		} catch (error: any) {
			reportError(error, 'ui')
		}
	}

	async function exportFile(toExport?: IFile) {
		try {
			await exportUtils.exportFile(file, toExport)
			success(texts.wasExported)
		} catch (error: any) {
			reportError(error, 'ui')
		}
	}

	async function reset() {
		try {
			await emitReset(resetBucket)
			useEditorStore.getState().setEditedAction(EditedAction.markAsNotEdited)

			if (useEditorStore.getState().showMessages) {
				messages.success(texts.successReset)
			}
		} catch (error: any) {
			reportError(error, 'ui')
		}
	}

	function success(text: string) {
		if (useEditorStore.getState().showMessages) {
			messages.success(text)
		}
	}

	function onReset() {
		if (mod) {
			return
		}

		Modal.confirm({
			okText: texts.ok,
			cancelText: texts.cancel,
			title: texts.resetConfirmMessage,
			onOk: reset
		})
	}

	return (
		<Header
			text={title}
			withBack
			onBack={() => route(Page.lists)}
			extra={(
				<>
					<Dropdown
						open={menuIsOpened}
						onOpenChange={setMenuIsOpened}
						trigger={['click']}
						menu={{ items: menuItems }}
					>
						<span className="menu-button">
							{menuIsOpened
								? <MenuUnfoldOutlined />
								: <MenuFoldOutlined />}
						</span>
					</Dropdown>
					<Button
						id="save"
						className="menu-save-button"
						type="text"
						shape="circle"
						icon={<SaveOutlined style={{ fontSize: 25 }} />}
						onClick={() => void onSave()}
					/>
				</>
			)}
		/>
	)
})
