import {Window} from 'enums'
import type {CreateWindowAttributes} from 'types'

import {config} from '../scripts/config'
import {webpackEntries} from '../scripts/webpackEntries'
import {openModal} from '../scripts/windows'
import {regWindow} from './winsObject'

const createArgs: CreateWindowAttributes = {
    path: webpackEntries.whatsNew,
    preload: webpackEntries.whatsNewPreload,
    width: 600,
    minWidth: 600,
    height: 500,
    minHeight: 520,
    type: Window.WhatsNew
}

regWindow(Window.WhatsNew, async () => {
    const wind = openModal(createArgs)

    wind.once('close', () => config.settings.showWhatsNew = false)
    return wind
})
