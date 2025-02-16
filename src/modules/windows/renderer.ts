import { Bridge } from 'emr-bridge/renderer'
import type { Page, ProgramWindow } from './enums'
import type MainWindows from './main'
import { PubKeys } from './public'
import { initMain, mainMethod } from '/utils/bridge/renderer'

export * from './enums'
export type * from './types'

const bridge = Bridge.as<object>()

/**
 * Работа с окнами программы.  
 * _renderer process_
 */
@initMain()
class Windows {
  /** Открыть окно программы. */
  @mainMethod()
  openWindow!: typeof MainWindows.openWindow

  /**
   * Обработать событие роутинга.
   * @param handler Обработчик.
   * @returns Функция отписки.
   */
  onRoute(handler: (page: Page) => void) {
    return bridge.on(PubKeys.routeEvent, handler)
  }

  /**
   * Вызвать событие готовности контента окна.
   * @param window Окно.
   */
  windowReady(window: ProgramWindow) {
    bridge.emit(PubKeys.windowReadyEvent, window)
  }
}

/**
 * Работа с окнами программы.  
 * _renderer process_
 */
export default new Windows()
