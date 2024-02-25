import type { MenuProps } from 'ant-design-vue'
import { computed } from 'vue'

import texts from './texts'
import { links } from './utils'

import { Backup, Config, Files, Helpers, Paths, ProgramWindow, Windows } from '/mods/renderer'

const initialNotFound = !Config.initialPath

type MenuItemType = Required<MenuProps>['items'][number]

const file = computed(() => [
  MenuItem(texts.exitMenuItemLabel, () => Helpers.quitApp())
] satisfies MenuItemType[])
const backup = computed(() => [
  MenuItem(texts.openButton, () => Helpers.openPath(Paths.backupFolder)),
  Divider(),
  MenuItem(texts.saveButton, () => Backup.save()),
  MenuItem(texts.restoreMenuItemLabel, () => Backup.recoverFromIt())
] satisfies MenuItemType[])
const settings = computed(() => [
  MenuItem(texts.settingsMenuLabel, () => Windows.openWindow(ProgramWindow.settings), initialNotFound),
  Divider(),
  MenuItem(texts.resetMenuItemLabel, () => Config.reset(), initialNotFound),
  MenuItem(texts.uninstallMenuItemLabel, () => Files.uninstall.exec())
] satisfies MenuItemType[])
const help = computed(() => [
  MenuItem(texts.versionMenuItemLabel, () => Windows.openWindow(ProgramWindow.whatsNew)),
  Divider(),
  MenuItem(texts.howToUseTitle, () => Helpers.openLink(links.modio)),
  MenuItem(texts.githubTitle, () => Helpers.openLink(links.github)),
  MenuItem(texts.youtubeTitle, () => Helpers.openLink(links.youtube))
] satisfies MenuItemType[])
const items = computed(() => [
  NestedMenuItem(texts.fileMenuLabel, file.value),
  NestedMenuItem(texts.backupMenuLabel, backup.value, initialNotFound),
  NestedMenuItem(texts.settingsMenuLabel, settings.value),
  NestedMenuItem(texts.helpMenuLabel, help.value)
] satisfies MenuItemType[])
export default items

function MenuItem(
  label: string,
  onClick: () => void,
  disabled = false,
  key = Math.random().toString()
): MenuItemType { return { label, onClick, disabled, key } }

function NestedMenuItem(
  label: string,
  children: MenuItemType[],
  disabled = false,
  key = Math.random().toString()
): MenuItemType { return { label, children, disabled, key } }

function Divider(): MenuItemType { return { type: 'divider' as const } }
