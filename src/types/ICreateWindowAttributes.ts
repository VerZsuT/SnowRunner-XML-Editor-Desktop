import type { BrowserWindow } from 'electron'

import type { ProgramWindow } from '#enums'

export interface ICreateWindowAttributes {
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
  type: ProgramWindow
}
