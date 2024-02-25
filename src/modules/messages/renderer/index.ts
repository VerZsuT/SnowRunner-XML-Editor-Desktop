import { message, notification } from 'ant-design-vue'
import { Bridge } from 'emr-bridge/renderer'

import { MainMessageType } from '../enums'
import type { IPublic } from '../public'
import { Keys } from '../public'

export * from '../enums'
export type * from '../types'

/**
 * Работа с сообщениями программы  
 * _renderer process_
*/
class Messages {
  private loadingStopper?: ReturnType<typeof message.loading>

  /** Мост main-rend */
  private readonly Bridge = Bridge.as<IPublic>()

  /** Прослушать сообщения из main процесса */
  handleMessages() {
    this.Bridge[Keys.onMessage](({ type, text }) => {
      switch (type) {
        case MainMessageType.error: {
          this.error(text); break
        }
        case MainMessageType.info: {
          this.info(text); break
        }
        case MainMessageType.success: {
          this.success(text); break
        }
        case MainMessageType.warning: {
          this.warning(text); break
        }
        case MainMessageType.startLoading: {
          this.loadingStopper = this.loading(text); break
        }
        case MainMessageType.stopLoading: {
          this.loadingStopper?.(); break
        }
      }
    })
  }

  /** Сообщение об ошибке */
  error(text: string) { notification.error({ message: 'Error', description: text, duration: 10_000 }) }

  /** Информационное сообщение */
  info(text: string) { void message.info(text) }

  /** Сообщение об успехе */
  success(text: string) { void message.success(text) }

  /** Загрузка */
  loading(text: string) { return message.loading(text) }

  /** Предупреждение */
  warning(text: string) { notification.warning({ message: 'Error', description: text, duration: 10_000 }) }
}

export default new Messages()
