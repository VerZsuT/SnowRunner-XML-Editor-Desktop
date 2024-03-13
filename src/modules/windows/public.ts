import type { MainEvent } from 'emr-bridge'

import type { ProgramWindow } from './enums'
import type Windows from './main'

export enum PubKeys {
  openWindow = 'windows/open-window',

  windowReadyEvent = '-windows/window-ready-event',
  updateContentEvent = '-windows/update/content-event',
  onUpdateContent = `on${PubKeys.updateContentEvent}`,

  loadingTextEvent = '-windows/loading/text-event',
  loadingSuccessEvent = '-windows/loading/success-event',
  loadingDownloadEvent = '-windows/loading/download-event',
  loadingPercentEvent = '-windows/loading/percent-event',

  onLoadingText = `on${PubKeys.loadingTextEvent}`,
  onLoadingSuccess = `on${PubKeys.loadingSuccessEvent}`,
  onLoadingDownload = `on${PubKeys.loadingDownloadEvent}`,
  onLoadingPercent = `on${PubKeys.loadingPercentEvent}`
}

export type PubType = {
  [PubKeys.openWindow]: typeof Windows.openWindow
  [PubKeys.onUpdateContent]: MainEvent<string>

  [PubKeys.onLoadingText]: MainEvent<string>
  [PubKeys.onLoadingSuccess]: MainEvent<boolean>
  [PubKeys.onLoadingDownload]: MainEvent<boolean>
  [PubKeys.onLoadingPercent]: MainEvent<string | number>

  [PubKeys.windowReadyEvent](window: ProgramWindow): void
}
