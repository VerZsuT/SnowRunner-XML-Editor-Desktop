import { message, notification } from 'ant-design-vue'
import { Bridge } from 'emr-bridge/renderer'

import { MainMessageType } from '../enums'
import type { PubType } from '../public'
import { PubKeys } from '../public'

export * from '../enums'
export type * from '../types'

/** Мост main-rend */
const Main = Bridge.as<PubType>()

/**
 * Работа с сообщениями программы  
 * _renderer process_
*/
class Messages {
  /** Остановить загрузку */
  private stopLoading?: ReturnType<typeof message.loading>

  /** Прослушать сообщения из main процесса */
  handleMessages() {
    Main[PubKeys.onMessage](({ type, text }) => {
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
          this.stopLoading = this.loading(text); break
        }
        case MainMessageType.stopLoading: {
          this.stopLoading?.(); break
        }
      }
    })
  }

  /** Сообщение об ошибке */
  error(error: Error): void
  error(error: string): void
  error(error: string | Error): void {
    notification.error({ message: 'Error', description: String(error), duration: 10_000 })
    console.error(error)
  }

  /** Информационное сообщение */
  info(text: string) {
    void message.info(text)
  }

  /** Сообщение об успехе */
  success(text: string) {
    void message.success(text)
  }

  /** Загрузка */
  loading(text: string) {
    return message.loading(text)
  }

  /** Предупреждение */
  warning(text: string) {
    notification.warning({ message: 'Error', description: text, duration: 10_000 })
  }
}

export default new Messages()
