import {Window} from 'enums'
import type {CreateWindowAttributes} from 'types'

import {webpackEntries} from '../scripts/webpackEntries'
import {openModal} from '../scripts/windows'
import {regWindow} from './winsObject'

const createArgs: CreateWindowAttributes = {
    path: webpackEntries.update,
    preload: webpackEntries.updatePreload,
    width: 400,
    minWidth: 400,
    height: 160,
    minHeight: 180,
    frame: false,
    type: Window.Update
}

regWindow(Window.Update, async (...args: any[]) => {
    const wind = openModal(createArgs)

    wind.once('show', () => wind.webContents.postMessage('content', args[0]))
    return wind
})
