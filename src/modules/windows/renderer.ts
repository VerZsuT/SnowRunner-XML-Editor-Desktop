import { providePubFunc } from '/utils/bridge/renderer'

import type { PubType } from './public'
import { PubKeys } from './public'

export * from './enums'
export type * from './types'

/**
 * Работа с окнами программы  
 * _renderer process_
*/
class Windows {
  /** Открыть окно программы */
  openWindow = providePubFunc<PubType[PubKeys.openWindow]>(PubKeys.openWindow)

  /** Отследить событие контента окна обновления */
  onUpdateContent = providePubFunc<PubType[PubKeys.onUpdateContent]>(PubKeys.onUpdateContent)

  /** Отследить событие текста окна загрузки */
  onLoadingText = providePubFunc<PubType[PubKeys.onLoadingText]>(PubKeys.onLoadingText)

  /** Отследить событие успешности операции окна загрузки */
  onLoadingSuccess = providePubFunc<PubType[PubKeys.onLoadingSuccess]>(PubKeys.onLoadingSuccess)

  /** Отследить событие статуса загрузки из интернета окна загрузки программы */
  onLoadingDownload = providePubFunc<PubType[PubKeys.onLoadingDownload]>(PubKeys.onLoadingDownload)

  /** Отследить событие процента окна загрузки */
  onLoadingPercent = providePubFunc<PubType[PubKeys.onLoadingPercent]>(PubKeys.onLoadingPercent)

  /** Событие готовкности контента окна */
  windowReady = providePubFunc<PubType[PubKeys.windowReadyEvent]>(PubKeys.windowReadyEvent)
}

export default new Windows()
