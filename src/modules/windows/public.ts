import type { MainEvent } from 'emr-bridge'

import type { ProgramWindow } from './enums'
import type Windows from './main'

export enum Keys {
  openWindow = 'windows.open-window',

  windowReadyEvent = 'windows.window-ready-event',
  updateContentEvent = 'update-window.content-event',
  onUpdateContent = 'onUpdate-window.content-event',

  loadingTextEvent = 'loading-window.text-event',
  loadingSuccessEvent = 'loading-window.success-event',
  loadingDownloadEvent = 'loading-window.download-event',
  loadingPercentEvent = 'loading-window.percent-event',

  onLoadingText = 'onLoading-window.text-event',
  onLoadingSuccess = 'onLoading-window.success-event',
  onLoadingDownload = 'onLoading-window.download-event',
  onLoadingPercent = 'onLoading-window.percent-event'
}

export interface IPublic {
  [Keys.openWindow]: typeof Windows.openWindow
  [Keys.onUpdateContent]: MainEvent<string>

  [Keys.onLoadingText]: MainEvent<string>
  [Keys.onLoadingSuccess]: MainEvent<boolean>
  [Keys.onLoadingDownload]: MainEvent<boolean>
  [Keys.onLoadingPercent]: MainEvent<string | number>

  [Keys.windowReadyEvent](window: ProgramWindow): void
}
