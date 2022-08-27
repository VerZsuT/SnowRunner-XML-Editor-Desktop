import {BrowserWindow, ipcMain} from 'electron'

import {BuildType} from 'enums'
import type {CreateWindowAttributes, Windows} from 'types'

import {config} from './config'
import {paths} from './paths'
import {settings} from './settings'

export const wins: Windows = {
    loading: null
}

/** Открыть модальное окно */
export function openModal(args: CreateWindowAttributes): BrowserWindow {
    return createWindow({
        ...args,
        modal: true,
        parent: BrowserWindow.getFocusedWindow()
    })
}

/** Создать окно с указанными атрибутами */
export function createWindow(args: CreateWindowAttributes): BrowserWindow {
    const {
        width = 800,
        height = 600,
        minWidth = 0,
        minHeight = 0,
        resizable = true,
        show = false,
        modal = false,
        frame = true,
        parent, preload, type
    } = args
    const { icon } = paths

    const wind = new BrowserWindow({
        width,
        minWidth,
        height,
        minHeight,
        resizable,
        show,
        parent,
        modal,
        frame,
        icon,
        paintWhenInitiallyHidden: false,
        webPreferences: {
            preload,
            devTools: config.buildType === BuildType.dev,
            contextIsolation: false,
            webviewTag: false,
            sandbox: false
        }
    })
    wind.setMenuBarVisibility(false)
    wind.removeMenu()

    ipcMain.once(`window-${type}-ready`, () => {
        if (wind && !wind.isDestroyed()) {
            wind.show()
            wind.focus()

            if (settings.devTools)
                wind.webContents.toggleDevTools()
        }
    })

    wind.loadURL(args.path)
        .catch(error => console.error(error))

    return wind
}
