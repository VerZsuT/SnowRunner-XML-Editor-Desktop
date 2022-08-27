import {memo} from 'react'

import type {MenuProps} from 'antd'
import {Menu as ANTMenu} from 'antd'
import {BuildType, Window} from 'enums'
import {globalTexts} from 'globalTexts/renderer'
import {config} from 'scripts/config'
import {getExported} from 'scripts/dom'
import {main} from 'scripts/main'
import type {FindItem} from 'types'

import {componentsTexts} from './texts'

const MOD_IO_LINK = 'https://snowrunner.mod.io/guides/snowrunner-xml-editor'
const GITHUB_LINK = 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop'
const YOUTUBE_LINK = 'https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2'

type MenuItem = Required<MenuProps>['items'][number]

const {
    quitApp, openLink, openPath, resetConfig, recoverFromBackup, copyBackup,
    runUninstall, importConfig, exportConfig, openWindow, paths, findInDir
} = main
const { writeFileSync, join } = window.service
const {
    EXIT_MENU_ITEM_LABEL,
    SETTINGS_MENU_LABEL,
    RESTORE_MENU_ITEM_LABEL,
    IMPORT_MENU_ITEM_LABEL,
    EXPORT_MENU_ITEM_LABEL,
    UNINSTALL_MENU_ITEM_LABEL,
    VERSION_MENU_ITEM_LABEL,
    HOW_TO_USE_TITLE,
    FILE_MENU_LABEL,
    BACKUP_MENU_LABEL,
    HELP_MENU_LABEL
} = componentsTexts
const {
    OPEN_BUTTON,
    SAVE_BUTTON,
    RESET_MENU_ITEM_LABEL
} = globalTexts

function exportDefaults() {
    const items: FindItem[] = []
    const exported: any = {}

    for (const dlcItem of config.dlc) {
        const path = `${dlcItem.path}\\classes`

        items.push(...findInDir(join(path, 'trucks')))
        items.push(...findInDir(join(path, 'trucks/trailers')))
        items.push(...findInDir(join(path, 'gearboxes')))
        items.push(...findInDir(join(path, 'engines')))
        items.push(...findInDir(join(path, 'suspensions')))
        items.push(...findInDir(join(path, 'winches')))
        items.push(...findInDir(join(path, 'wheels')))
    }

    items.push(...findInDir(join(paths.classes, 'trucks')))
    items.push(...findInDir(join(paths.classes, 'trucks/trailers')))
    items.push(...findInDir(join(paths.classes, 'gearboxes')))
    items.push(...findInDir(join(paths.classes, 'engines')))
    items.push(...findInDir(join(paths.classes, 'suspensions')))
    items.push(...findInDir(join(paths.classes, 'winches')))
    items.push(...findInDir(join(paths.classes, 'wheels')))

    for (const item of items) {
        const obj = getExported({
            filePath: item.path
        })
        if (!obj) continue

        const fileName = `${item.name}.xml`
        exported[fileName] = obj.data[fileName]
    }

    writeFileSync(join(paths.backupFolder, 'exported.json'), JSON.stringify(exported, null, '\t'))
}

const hasInitial = !config.initial
const isDev = config.buildType === BuildType.dev

function menuItem(label: string, onClick: ()=>void, disabled = false): MenuItem {
    return {
        label,
        onClick,
        disabled,
        key: Math.random().toString()
    }
}

function nestedMenuItem(label: string, children: MenuItem[], disabled = false): MenuItem {
    return {
        label,
        key: Math.random().toString(),
        children,
        disabled
    }
}

const divider: MenuItem = { type: 'divider' }

const fileMenu: MenuItem[] = [
    ...(isDev ? [menuItem(
        'Export defaults',
        exportDefaults
    )] : []),
    menuItem(
        EXIT_MENU_ITEM_LABEL,
        () => quitApp()
    )
]

const backupMenu: MenuItem[] = [
    menuItem(
        OPEN_BUTTON,
        () => openPath(paths.backupFolder)
    ),
    divider,
    menuItem(
        SAVE_BUTTON,
        () => copyBackup()
    ),
    menuItem(
        RESTORE_MENU_ITEM_LABEL,
        () => recoverFromBackup()
    )
]

const settingsMenu: MenuItem[] = [
    menuItem(
        SETTINGS_MENU_LABEL,
        () => openWindow(Window.Settings),
        hasInitial
    ),
    divider,
    menuItem(
        IMPORT_MENU_ITEM_LABEL,
        () => importConfig(false)
    ),
    menuItem(
        EXPORT_MENU_ITEM_LABEL,
        () => exportConfig(false),
        hasInitial
    ),
    divider,
    menuItem(
        RESET_MENU_ITEM_LABEL,
        () => resetConfig(),
        hasInitial
    ),
    menuItem(
        UNINSTALL_MENU_ITEM_LABEL,
        () => runUninstall()
    )
]

const helpMenu: MenuItem[] = [
    menuItem(
        VERSION_MENU_ITEM_LABEL,
        () => openWindow(Window.WhatsNew)
    ),
    divider,
    menuItem(
        HOW_TO_USE_TITLE,
        () => openLink(MOD_IO_LINK)
    ),
    menuItem(
        'GitHub',
        () => openLink(GITHUB_LINK)
    ),
    menuItem(
        'YouTube(RU)',
        () => openLink(YOUTUBE_LINK)
    )
]

const menuItems: MenuItem[] = [
    nestedMenuItem(
        FILE_MENU_LABEL,
        fileMenu
    ),
    nestedMenuItem(
        BACKUP_MENU_LABEL,
        backupMenu,
        hasInitial
    ),
    nestedMenuItem(
        SETTINGS_MENU_LABEL,
        settingsMenu
    ),
    nestedMenuItem(
        HELP_MENU_LABEL,
        helpMenu
    )
]

/** Верхнее сервисное меню */
export const Menu = memo(() => (
    <ANTMenu
        className='menu'
        mode='horizontal'
        selectable={false}
        items={menuItems}
    />
))
