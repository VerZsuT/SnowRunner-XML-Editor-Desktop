import { initMain, mainMethod } from '@bridge/renderer'
import { Bridge } from 'emr-bridge/renderer'
import type { Page, ProgramWindow } from './enums'
import type { Windows as WindowsMain } from './main'
import { PubKeys } from './public'

export * from './enums'
export type * from './types'

/**
 * Работа с окнами программы.
 * _renderer process_
 */
@initMain()
export class Windows {
	private readonly bridge = Bridge.as<object>()

  /** Открыть окно программы. */
  @mainMethod()
  openWindow!: WindowsMain['openWindow']

  /**
   * Обработать событие роутинга.
   * @param handler Обработчик.
   * @returns Функция отписки.
   */
  onRoute(handler: (page: Page) => void) {
    return this.bridge.on(PubKeys.routeEvent, handler)
  }

  /**
   * Вызвать событие готовности контента окна.
   * @param window Окно.
   */
  windowReady(window: ProgramWindow) {
    this.bridge.emit(PubKeys.windowReadyEvent, window)
  }
}

/**
 * Работа с окнами программы.
 * _renderer process_
 */
export default new Windows()
