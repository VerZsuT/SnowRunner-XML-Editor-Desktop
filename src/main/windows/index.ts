import type {Window} from 'enums'

import {regFunctions} from '../scripts/bridge'
import {windows} from './winsObject'
import './Loading'
import './Main'
import './Settings'
import './Setup'
import './Update'
import './WhatsNew'

regFunctions([[openWindow, 'openWindow']])

export async function openWindow(window: Window, ...args: any[]) {
    const wind = await windows[window](...args)
    await new Promise(resolve => {
        wind.once('show', resolve)
    })
}
