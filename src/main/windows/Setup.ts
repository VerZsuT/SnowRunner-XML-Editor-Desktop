import {app} from 'electron'

import {Window} from 'enums'
import type {CreateWindowAttributes} from 'types'

import {webpackEntries} from '../scripts/webpackEntries'
import {createWindow, wins} from '../scripts/windows'
import {regWindow} from './winsObject'

const createArgs: CreateWindowAttributes = {
    path: webpackEntries.setup,
    preload: webpackEntries.setupPreload,
    width: 620,
    minWidth: 620,
    height: 290,
    minHeight: 310,
    type: Window.Setup
}

regWindow(Window.Setup, async () => {
    const wind = createWindow(createArgs)

    wind.once('focus', () => {
        wins.loading.hide()
    })
    wind.once('close', app.quit)

    return wind
})
