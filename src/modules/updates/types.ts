import type { BrowserWindow } from 'electron'

export interface IDownloadParams {
  array?: {
    url: string
    path: string
  }[]
  isRoot?: boolean
  inMemory?: boolean
  fromJSON?: boolean
  loadingPage?: IDownloadWindow | null
  url?: string
  path?: string
}

export interface IDownloadWindow extends BrowserWindow {
  setText(text: string): void
  setCount(count: number): void
  setPercent(percent: number | string): void
  showAndWait(): Promise<void>
  success(): void
  download(): void
}

export interface IUpdateWindow extends BrowserWindow {
  setVersion(version: string): void
}

export type UpdateMap = Record<string, string>
