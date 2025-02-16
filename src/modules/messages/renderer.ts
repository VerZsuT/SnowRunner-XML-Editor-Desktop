import { message, notification } from 'ant-design-vue'
import { Bridge } from 'emr-bridge/renderer'
import { MainMessageType } from './enums'
import { PubKeys } from './public'

export * from './enums'
export type * from './types'

/** Мост main-rend. */
const bridge = Bridge.as<object>()

/**
 * Работа с сообщениями программы.  
 * _renderer process_
 */
class Messages {
  /** Остановить загрузку. */
  private stopLoading?: ReturnType<typeof message.loading>

  /** Обработать сообщения из main процесса. */
  handleMessages() {
    bridge.on(PubKeys.messageEvent, ({ type, text }: {type: MainMessageType, text: string}) => {
      switch (type) {
        case MainMessageType.error:
          this.error(text)
          
          break
        case MainMessageType.info:
          this.info(text)
          
          break
        case MainMessageType.success:
          this.success(text)
          
          break
        case MainMessageType.warning:
          this.warning(text)
          
          break
        case MainMessageType.startLoading:
          this.stopLoading = this.loading(text)
          
          break
        case MainMessageType.stopLoading:
          this.stopLoading?.()
          
          break
      }
    })
  }

  /**
   * Вывести сообщение об ошибке.
   * @param error Объект ошибки.
   */
  error(error: Error): void
  /**
   * Вывести сообщение об ошибке.
   * @param error Текст ошибки.
   */
  error(error: string): void
  error(error: string | Error): void {
    notification.error({ message: 'Error', description: String(error), duration: 10_000 })
    console.error(error)
  }

  /**
   * Вывести информационное сообщение.
   * @param text Текст сообщения.
   */
  info(text: string) {
    void message.info(text)
  }

  /**
   * Вывести уведомление об успехе.
   * @param text Текст уведомления.
   */
  success(text: string) {
    void message.success(text)
  }

  /**
   * Показать уведомление загрузки.
   * @param text Текст уведомления.
   */
  loading(text: string) {
    return message.loading(text)
  }

  /**
   * Вывести предупреждение.
   * @param text Текст предупреждения.
   */
  warning(text: string) {
    notification.warning({ message: 'Error', description: text, duration: 10_000 })
  }
}

/**
 * Работа с сообщениями программы.  
 * _renderer process_
 */
export default new Messages()
