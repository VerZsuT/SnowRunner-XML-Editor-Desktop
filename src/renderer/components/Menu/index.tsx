import type { ReactNode } from 'react'

import { Menu as ANTMenu } from 'antd'
import { Bridge } from 'emr-bridge/renderer'
import { afcMemo } from 'react-afc'

import {
  BACKUP_MENU_LABEL,
  EXIT_MENU_ITEM_LABEL,
  FILE_MENU_LABEL,
  HELP_MENU_LABEL,
  HOW_TO_USE_TITLE,
  RESTORE_MENU_ITEM_LABEL,
  SETTINGS_MENU_LABEL,
  UNINSTALL_MENU_ITEM_LABEL,
  VERSION_MENU_ITEM_LABEL
} from '../texts'
import type { MenuItemType } from './items'
import { Divider, MenuItem, NestedMenuItem } from './items'

import { menuService } from '#components/Menu/service'
import { BuildType, ProgramWindow } from '#enums'
import { OPEN_BUTTON, RESET_MENU_ITEM_LABEL, SAVE_BUTTON } from '#globalTexts/renderer'
import { config } from '#services'
import type { IMPC } from '#types'

const bridge = Bridge.as<IMPC>()
const paths = bridge.paths

/** Верхнее сервисное меню */
export const Menu = afcMemo(() => {
  const MOD_IO_LINK = 'https://snowrunner.mod.io/guides/snowrunner-xml-editor'
  const GITHUB_LINK = 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop'
  const YOUTUBE_LINK = 'https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2'

  const hasInitial = !config.initial
  const isDev = config.buildType === BuildType.dev

  const fileMenu = [
    ...onDev(
      MenuItem(
        'Export defaults',
        () => menuService.exportDefaults()
      )
    ),
    MenuItem(
      EXIT_MENU_ITEM_LABEL,
      () => bridge.quitApp()
    )
  ] as MenuItemType[]

  const backupMenu = [
    MenuItem(
      OPEN_BUTTON,
      () => bridge.openPath(paths.backupFolder)
    ),
    Divider(),
    MenuItem(
      SAVE_BUTTON,
      () => bridge.copyBackup()
    ),
    MenuItem(
      RESTORE_MENU_ITEM_LABEL,
      () => bridge.recoverFromBackup()
    )
  ] as MenuItemType[]

  const settingsMenu = [
    MenuItem(
      SETTINGS_MENU_LABEL,
      () => bridge.openWindow(ProgramWindow.Settings),
      hasInitial
    ),
    Divider(),
    MenuItem(
      RESET_MENU_ITEM_LABEL,
      () => bridge.resetConfig(),
      hasInitial
    ),
    MenuItem(
      UNINSTALL_MENU_ITEM_LABEL,
      () => bridge.runUninstall()
    )
  ] as MenuItemType[]

  const helpMenu = [
    MenuItem(
      VERSION_MENU_ITEM_LABEL,
      () => bridge.openWindow(ProgramWindow.WhatsNew)
    ),
    Divider(),
    MenuItem(
      HOW_TO_USE_TITLE,
      () => bridge.openLink(MOD_IO_LINK)
    ),
    MenuItem(
      'GitHub',
      () => bridge.openLink(GITHUB_LINK)
    ),
    MenuItem(
      'YouTube(RU)',
      () => bridge.openLink(YOUTUBE_LINK)
    )
  ] as MenuItemType[]

  const menuItems = [
    NestedMenuItem(
      FILE_MENU_LABEL,
      fileMenu
    ),
    NestedMenuItem(
      BACKUP_MENU_LABEL,
      backupMenu,
      hasInitial
    ),
    NestedMenuItem(
      SETTINGS_MENU_LABEL,
      settingsMenu
    ),
    NestedMenuItem(
      HELP_MENU_LABEL,
      helpMenu
    )
  ] as MenuItemType[]

  function render(): ReactNode {
    return (
      <ANTMenu
        className='menu'
        mode='horizontal'
        selectable={false}
        items={menuItems}
      />
    )
  }

  function onDev(...items: MenuItemType[]): MenuItemType[] {
    return isDev ? items : []
  }

  return render
})
