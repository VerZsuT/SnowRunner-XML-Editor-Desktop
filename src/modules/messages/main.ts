import { emitEvent } from 'emr-bridge/main'
import { MainMessageType } from './enums'
import { PubKeys } from './public'
import type { IMainMessage } from './types'

export * from './enums'
export type * from './types'

/**
 * Работа с сообщениями программы.  
 * _main process_
 */
class Messages {
  /**
   * Вызвать событие сообщения.
   * @param message Сообщение.
   */
  private emitMessageEvent(message: IMainMessage) {
    emitEvent(PubKeys.messageEvent, message)
  }

  /**
   * Вывести ошибку.
   * @param text Текст ошибки.
   */
  error(text: string) {
    this.emitMessageEvent({ type: MainMessageType.error, text })
  }

  /**
   * Вывести информацию.
   * @param text Текст информации.
   */
  info(text: string) {
    this.emitMessageEvent({ type: MainMessageType.info, text })
  }

  /**
   * Вывести сообщение о успехе.
   * @param text Текст сообщения.
   */
  success(text: string) {
    this.emitMessageEvent({ type: MainMessageType.success, text })
  }

  /**
   * Вывести предупреждение.
   * @param text Текст предупреждения.
   */
  warn(text: string) {
    this.emitMessageEvent({ type: MainMessageType.warning, text })
  }

  /**
   * Показать загрузку.
   * @param text Текст уведомления.
   * @returns Функция завершения.
   */
  loading(text: string) {
    this.emitMessageEvent({ type: MainMessageType.startLoading, text })

    return () => this.emitMessageEvent({ type: MainMessageType.stopLoading, text })
  }
}

/**
 * Работа с сообщениями программы.  
 * _main process_
 */
export default new Messages()
