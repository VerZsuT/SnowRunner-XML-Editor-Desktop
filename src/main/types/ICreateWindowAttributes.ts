import type { BrowserWindow } from 'electron'

interface ICreateWindowAttributes {
    path: string
    width?: number
    minWidth?: number
    height?: number
    minHeight?: number
    resizable?: boolean
    show?: boolean
    parent?: BrowserWindow
    modal?: boolean
    frame?: boolean
    preload?: string
}

export default ICreateWindowAttributes
