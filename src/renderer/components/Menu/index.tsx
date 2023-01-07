import { Menu as ANTMenu } from 'antd'
import { pafcMemo } from 'react-afc'

import $ from '../texts'
import MenuController from './controller'
import type { MenuItemType } from './items'
import { Divider, MenuItem, NestedMenuItem } from './items'
import MenuModel from './model'

/** Верхнее сервисное меню */
function Menu() {
  const m = new MenuModel()
  const c = new MenuController(m)

  const file: MenuItemType[] = [
    ...onDev(
      MenuItem($.EXPORT_DEFAULTS_TITLE, c.exportDefaults)
    ),
    MenuItem($.EXIT_MENU_ITEM_LABEL, c.quitApp)
  ]

  const backup: MenuItemType[] = [
    MenuItem($.OPEN_BUTTON, c.openBackupFolder),
    Divider(),
    MenuItem($.SAVE_BUTTON, c.saveBackup),
    MenuItem($.RESTORE_MENU_ITEM_LABEL, c.restoreBackup)
  ]

  const settings: MenuItemType[] = [
    MenuItem($.SETTINGS_MENU_LABEL, c.openSettings, m.hasInitial),
    Divider(),
    MenuItem($.RESET_MENU_ITEM_LABEL, c.resetConfig, m.hasInitial),
    MenuItem($.UNINSTALL_MENU_ITEM_LABEL, c.uninstall)
  ]

  const help: MenuItemType[] = [
    MenuItem($.VERSION_MENU_ITEM_LABEL, c.showWhatsNew),
    Divider(),
    MenuItem($.HOW_TO_USE_TITLE, c.openModio),
    MenuItem($.GITHUB_TITLE, c.openGithub),
    MenuItem($.YOUTUBE_TITLE, c.openYoutube)
  ]

  const items: MenuItemType[] = [
    NestedMenuItem($.FILE_MENU_LABEL, file),
    NestedMenuItem($.BACKUP_MENU_LABEL, backup, m.hasInitial),
    NestedMenuItem($.SETTINGS_MENU_LABEL, settings),
    NestedMenuItem($.HELP_MENU_LABEL, help)
  ]

  return () => (
    <ANTMenu
      className='menu'
      mode='horizontal'
      selectable={false}
      items={items}
    />
  )

  function onDev(...items: MenuItemType[]): MenuItemType[] {
    return m.isDev ? items : []
  }
}

export default pafcMemo(Menu)
