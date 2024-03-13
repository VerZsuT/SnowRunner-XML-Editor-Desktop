<template>
  <Header
    :text="title"
    with-back
    @back="route(Page.lists)"
  >
    <template #extra>
      <Dropdown
        class="menu-button"
        trigger="click"
      >
        <MenuOutlined style="font-size: 25px" />
        <template #overlay>
          <Menu mode="vertical">
            <Menu.Item @click="onReset">
              <Text>{{ texts.resetMenuItemLabel }}</Text>
              <UndoOutlined class="item-icon" />
            </Menu.Item>
            <Menu.Item @click="exportFile()">
              <Text>{{ texts.export }}</Text>
              <ExportOutlined class="item-icon" />
            </Menu.Item>
            <Menu.Item @click="importFile()">
              <Text>{{ texts.import }}</Text>
              <ImportOutlined class="item-icon" />
            </Menu.Item>
          </Menu>
        </template>
      </Dropdown>
      <Tooltip
        key="save"
        :title="texts.saveButton"
      >
        <Button
          id="save"
          class="save-button"
          type="text"
          shape="circle"
          @click="onSave()"
        >
          <template #icon>
            <SaveOutlined style="font-size: 25px" />
          </template>
        </Button>
      </Tooltip> 
    </template>
  </Header>
</template>

<script lang='ts' setup>
import { ExportOutlined, ImportOutlined, MenuOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons-vue'
import { Button, Dropdown, Menu, Modal, Tooltip, Typography } from 'ant-design-vue'

import { Page } from '../../enums'
import { EditedAction, useEditorStore, usePageStore } from '../../store'
import texts from '../texts'
import { ExportUtils, ImportUtils, ResetUtils, SaveUtils } from '../utils'

import type { TruckXML } from '/mods/renderer'
import { Archive, Edited, File, GameTexts, Messages, Mods, TruckFileType } from '/mods/renderer'
import { Header } from '/rend/components'
import { lastItem, prettyString } from '/utils/renderer'

const { Text } = Typography

export type MainHeaderProps = {
  xml: TruckXML
  file: File
}

const { xml, file } = defineProps<MainHeaderProps>()

const { route } = usePageStore()
const { editedAction, showMessages, setEditedAction, info } = useEditorStore()

defineExpose({
  save: onSave,
  reset: reset,
  import: importFile,
  export: exportFile
})

const mod = Mods.findByFile(file)
const title = getMainTitle()

async function onSave(updateFiles = true) {
  const hideLoading = showMessages.value
    ? Messages.loading(texts.savingMessage)
    : () => {}

  try {
    await save(updateFiles)
    success(texts.successSaveFiles)
  }
  catch (error) {
    Messages.error(String(error))
  }

  hideLoading()
}

async function save(updateFiles = true) {
  await SaveUtils.emitSave()

  if (updateFiles) {
    if (info.mod) {
      await Archive.updateFiles(info.mod)
    }
    await Archive.updateFiles()
  }

  switch (editedAction.value) {
    case EditedAction.markAsEdited: {
      Edited.markAsEdited(file, xml.Type === TruckFileType.trailer); break
    }
    case EditedAction.markAsNotEdited: {
      Edited.markAsNotEdited(file); break
    }
  }

  setEditedAction(EditedAction.markAsEdited)
}

function getMainTitle(): string {
  if (xml.GameData?.UiDesc) {
    const text = xml.GameData.UiDesc.UiName
    return GameTexts.get(text, Mods.getModID(file)) ?? text ?? 'TITLE_ERROR'
  }

  const separator = file.path.includes('/') ? '/' : '\\'
  return prettyString(new File(lastItem(file.path.split(separator))!).name).toUpperCase()
}

async function importFile(toImport?: File) {
  try {
    await ImportUtils.importFile(file, toImport)
    success(texts.wasImported)
  }
  catch (error) {
    Messages.error(String(error))
  }
}

async function exportFile(toExport?: File) {
  try {
    await ExportUtils.exportFile(file, toExport)
    success(texts.wasExported)
  }
  catch (error) {
    Messages.error(String(error))
  }
}

async function reset() {
  try {
    await ResetUtils.emit(ResetUtils.globalID)
    setEditedAction(EditedAction.markAsNotEdited)
    if (showMessages.value) {
      Messages.success(texts.successReset)
    }
  }
  catch (error) {
    Messages.error(String(error))
  }
}

function success(text: string) {
  if (showMessages.value) {
    Messages.success(text)
  }
}

function onReset() {
  if (mod) return

  Modal.confirm({
    okText: texts.ok, cancelText: texts.cancel,
    title: texts.resetConfirmMessage,
    onOk: reset
  })
}
</script>

<style lang='scss' scoped>
.item-icon {
  float: right;
  margin-left: 10px;
  margin-top: 5px;
}
.save-button {
  margin-right: 20px;
  margin-bottom: 5px;
}

.save-button > span,
.menu-button > :global(.ant-dropdown-trigger) > span {
  color: white;
  font-size: 25px !important;
}
</style>
