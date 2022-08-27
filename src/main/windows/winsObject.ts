import type {BrowserWindow} from 'electron'

import type {Window} from 'enums'

type WindowsObject = {
    [key in Window]?: WindowCreator
}

type WindowCreator = (...args: any[]) => Promise<BrowserWindow>

export function regWindow(win: Window, creator: WindowCreator) {
    windows[win] = creator
}

export const windows: WindowsObject = {}
