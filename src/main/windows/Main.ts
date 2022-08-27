import {app, ipcMain} from 'electron'

import {Window} from 'enums'
import type {CreateWindowAttributes} from 'types'

import {webpackEntries} from '../scripts/webpackEntries'
import {createWindow, wins} from '../scripts/windows'
import {regWindow} from './winsObject'

const createArgs: CreateWindowAttributes = {
    path: webpackEntries.main,
    preload: webpackEntries.mainPreload,
    width: 840,
    minWidth: 800,
    height: 700,
    minHeight: 630,
    type: Window.Main
}

regWindow(Window.Main, async () => {
    const wind = createWindow(createArgs)

    ipcMain.once('enable-list-resize', () => {
        wind.on('resize', () => {
            wind.webContents.send('window-resize')
        })
    })

    wind.once('close', () => {
        app.quit()
    })
    wind.once('focus', () => {
        wins.loading.hide()
    })

    return wind
})
