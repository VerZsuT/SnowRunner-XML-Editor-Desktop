import type {BrowserWindow} from 'electron'

import type {Window} from 'enums'

export interface CreateWindowAttributes {
    path: string
    preload: string
    width?: number
    minWidth?: number
    height?: number
    minHeight?: number
    resizable?: boolean
    show?: boolean
    parent?: BrowserWindow
    modal?: boolean
    frame?: boolean
    type: Window
}
