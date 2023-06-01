import { Menu as ANTMenu } from 'antd'
import { afcMemo } from 'react-afc'

import $ from '../texts'
import type { MenuItemType } from './items'
import { Divider, MenuItem, NestedMenuItem } from './items'
import MenuController from './menu.controller'
import MenuModel from './menu.model'

import { updateOnLangChange } from '#g/texts/renderer'

/** Верхнее сервисное меню */
function MenuView() {
  const model = new MenuModel()
  const ctrlr = new MenuController(model)

  const file = updateOnLangChange<MenuItemType[]>(() => [
    ...onDev(
      MenuItem($.EXPORT_DEFAULTS_TITLE, ctrlr.exportDefaults)
    ),
    MenuItem($.EXIT_MENU_ITEM_LABEL, ctrlr.quitApp)
  ])

  const backup = updateOnLangChange<MenuItemType[]>(() => [
    MenuItem($.OPEN_BUTTON, ctrlr.openBackupFolder),
    Divider(),
    MenuItem($.SAVE_BUTTON, ctrlr.saveBackup),
    MenuItem($.RESTORE_MENU_ITEM_LABEL, ctrlr.restoreBackup)
  ])

  const settings = updateOnLangChange<MenuItemType[]>(() => [
    MenuItem($.SETTINGS_MENU_LABEL, ctrlr.openSettings, model.hasInitial),
    Divider(),
    MenuItem($.RESET_MENU_ITEM_LABEL, ctrlr.resetConfig, model.hasInitial),
    MenuItem($.UNINSTALL_MENU_ITEM_LABEL, ctrlr.uninstall)
  ])

  const help = updateOnLangChange<MenuItemType[]>(() => [
    MenuItem($.VERSION_MENU_ITEM_LABEL, ctrlr.showWhatsNew),
    Divider(),
    MenuItem($.HOW_TO_USE_TITLE, ctrlr.openModio),
    MenuItem($.GITHUB_TITLE, ctrlr.openGithub),
    MenuItem($.YOUTUBE_TITLE, ctrlr.openYoutube)
  ])

  const items = updateOnLangChange<MenuItemType[]>(() => [
    NestedMenuItem($.FILE_MENU_LABEL, file.val),
    NestedMenuItem($.BACKUP_MENU_LABEL, backup.val, model.hasInitial),
    NestedMenuItem($.SETTINGS_MENU_LABEL, settings.val),
    NestedMenuItem($.HELP_MENU_LABEL, help.val)
  ])

  return () => (
    <ANTMenu
      className='menu'
      triggerSubMenuAction='click'
      mode='horizontal'
      selectable={false}
      items={items.val}
    />
  )

  function onDev(...items: MenuItemType[]): MenuItemType[] {
    return model.isDev ? items : []
  }
}

export default afcMemo(MenuView)
