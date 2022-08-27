import {Window} from 'enums'
import type {CreateWindowAttributes} from 'types'

import {webpackEntries} from '../scripts/webpackEntries'
import {openModal} from '../scripts/windows'
import {regWindow} from './winsObject'

const createArgs: CreateWindowAttributes = {
    path: webpackEntries.settings,
    preload: webpackEntries.settingsPreload,
    width: 400,
    minWidth: 400,
    height: 330,
    minHeight: 350,
    type: Window.Settings
}

regWindow(Window.Settings, async () => {
    return openModal(createArgs)
})
