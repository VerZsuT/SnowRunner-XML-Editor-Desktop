import { providePubFunc } from '/utils/bridge/renderer'

import type { IPublic } from './public'
import { Keys } from './public'

export * from './enums'
export type * from './types'

/**
 * Работа с окнами программы  
 * _renderer process_
*/
class Windows {
  /** Открыть окно программы */
  openWindow = providePubFunc<IPublic[Keys.openWindow]>(Keys.openWindow)

  /** Отследить событие контента окна обновления */
  onUpdateContent = providePubFunc<IPublic[Keys.onUpdateContent]>(Keys.onUpdateContent)

  /** Отследить событие текста окна загрузки */
  onLoadingText = providePubFunc<IPublic[Keys.onLoadingText]>(Keys.onLoadingText)

  /** Отследить событие успешности операции окна загрузки */
  onLoadingSuccess = providePubFunc<IPublic[Keys.onLoadingSuccess]>(Keys.onLoadingSuccess)

  /** Отследить событие статуса загрузки из интернета окна загрузки программы */
  onLoadingDownload = providePubFunc<IPublic[Keys.onLoadingDownload]>(Keys.onLoadingDownload)

  /** Отследить событие процента окна загрузки */
  onLoadingPercent = providePubFunc<IPublic[Keys.onLoadingPercent]>(Keys.onLoadingPercent)

  /** Событие готовкности контента окна */
  windowReady = providePubFunc<IPublic[Keys.windowReadyEvent]>(Keys.windowReadyEvent)
}

export default new Windows()
