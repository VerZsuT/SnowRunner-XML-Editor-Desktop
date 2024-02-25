import { publicMainEvent } from 'emr-bridge'

import { MainMessageType } from './enums'
import { Keys } from './public'
import type { IMainMessage } from './types'

export * from './enums'
export type * from './types'

/**
 * Работа с сообщениями программы  
 * _main process_
*/
class Messages {
  private emitMessageEvent = publicMainEvent<IMainMessage>(Keys.messageEvent)

  /** Сообщение об ошибке */
  error(text: string) { this.emitMessageEvent({ type: MainMessageType.error, text }) }

  /** Информационное сообщение */
  info(text: string) { this.emitMessageEvent({ type: MainMessageType.info, text }) }

  /** Сообщение об успехе */
  success(text: string) { this.emitMessageEvent({ type: MainMessageType.success, text }) }

  /** Предупреждение */
  warn(text: string) { this.emitMessageEvent({ type: MainMessageType.warning, text }) }

  /** Загрузка */
  loading(text: string) {
    this.emitMessageEvent({ type: MainMessageType.startLoading, text })
    return () => this.emitMessageEvent({ type: MainMessageType.stopLoading, text })
  }
}

export default new Messages()
