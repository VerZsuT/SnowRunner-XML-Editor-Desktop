<template>
  <Header
    :text="title"
    with-back
    @back="() => route(Page.lists)"
  >
    <template #extra>
      <Dropdown
        v-model:open="menuIsOpened"
        trigger="click"
      >
        <MenuUnfoldOutlined
          v-if="menuIsOpened"
          class="menu-button"
        />
        <MenuFoldOutlined
          v-else
          class="menu-button"
        />
        <template #overlay>
          <Menu mode="vertical">
            <Menu.Item @click="onReset">
              <Text>{{ texts.resetMenuItemLabel }}</Text>
              <UndoOutlined class="menu-item-icon" />
            </Menu.Item>
            <Menu.Item @click="exportFile()">
              <Text>{{ texts.export }}</Text>
              <ExportOutlined class="menu-item-icon" />
            </Menu.Item>
            <Menu.Item @click="importFile()">
              <Text>{{ texts.import }}</Text>
              <ImportOutlined class="menu-item-icon" />
            </Menu.Item>
            <FilesMenu v-if="config.advancedMode" />
          </Menu>
        </template>
      </Dropdown>
      <Button
        id="save"
        class="menu-save-button"
        type="text"
        shape="circle"
        @click="onSave()"
      >
        <template #icon>
          <SaveOutlined style="font-size: 25px" />
        </template>
      </Button>
    </template>
  </Header>
</template>

<script lang='ts' setup>
import { ExportOutlined, ImportOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons-vue'
import type { IFile } from '@modules/files/types'
import { Page } from '@modules/windows/enums'
import { TruckFileType, type TruckXML } from '@modules/xml/renderer'
import Header from '@renderer/components/header.vue'
import { EditedAction, useEditorStore } from '@renderer/pages/general/store/editor'
import { usePageStore } from '@renderer/pages/general/store/page'
import { lastItem } from '@utilities/checks'
import { di } from '@utilities/di/container'
import { ARCHIVER_TOKEN, CONFIG_TOKEN, EDITED_TOKEN, FILES_TOKEN, GAME_TEXTS_TOKEN, MESSAGES_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import { prettyString } from '@utilities/strings'
import { Button, Dropdown, Menu, Modal, Typography } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { EDITOR_LOCALIZATION as texts } from '../../localization'
import { exportUtils } from '../../utilities/export'
import { importUtils } from '../../utilities/import'
import { resetUtils } from '../../utilities/reset'
import { saveUtils } from '../../utilities/save'
import FilesMenu from '../files-menu/files-menu.vue'

const { Text } = Typography

export type MainHeaderProps = {
	xml: TruckXML
	file: IFile
}

const config = di.resolve(CONFIG_TOKEN)
const mods = di.resolve(MODS_TOKEN)
const messages = di.resolve(MESSAGES_TOKEN)

const { xml, file } = defineProps<MainHeaderProps>()
const { route } = usePageStore()
const editorStore = useEditorStore()
const { showMessages, info, editedAction } = storeToRefs(editorStore)
const { setIsSaving, setEditedAction } = editorStore

defineExpose({
	save: onSave,
	reset: reset,
	import: importFile,
	export: exportFile
})

const menuIsOpened = ref(false)
const mod = mods.findByFile(file)
const title = getMainTitle()

async function onSave(updateFiles = true) {
	const hideLoading = showMessages.value
		? messages.loading(texts.savingMessage)
		: () => {}

	setIsSaving(true)

	try {
		await save(updateFiles)
		success(texts.successSaveFiles)
	} catch (error: any) {
		messages.error(error)
	}

	setIsSaving(false)
	hideLoading()
}

async function save(updateFiles = true) {
	await saveUtils.emitSave()
	
	if (updateFiles) {
		const archiver = di.resolve(ARCHIVER_TOKEN)

		if (info.value.mod) {
			await archiver.updateFiles(info.value.mod)
		}

		await archiver.updateFiles()
	}

	const edited = di.resolve(EDITED_TOKEN)

	switch (editedAction.value) {
		case EditedAction.markAsEdited:
			edited.markAsEdited(file, xml.Type === TruckFileType.trailer)

			break
		case EditedAction.markAsNotEdited:
			edited.markAsNotEdited(file)
			
			break
	}

	setEditedAction(EditedAction.markAsEdited)
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
		messages.error(error)
	}
}

async function exportFile(toExport?: IFile) {
	try {
		await exportUtils.exportFile(file, toExport)
		success(texts.wasExported)
	} catch (error: any) {
		messages.error(error)
	}
}

async function reset() {
	try {
		await resetUtils.emit(resetUtils.globalID)
		setEditedAction(EditedAction.markAsNotEdited)

		if (showMessages.value) {
			messages.success(texts.successReset)
		}
	} catch (error: any) {
		messages.error(error)
	}
}

function success(text: string) {
	if (showMessages.value) {
		messages.success(text)
	}
}

function onReset() {
	if (mod) {
		return
	}

	Modal.confirm({
		okText: texts.ok, cancelText: texts.cancel,
		title: texts.resetConfirmMessage,
		onOk: reset
	})
}
</script>
