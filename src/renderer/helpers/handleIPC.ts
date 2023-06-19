import { message } from 'antd'

/** Добавляет обработку входящих IPC сообщений (ошибок) */
export default function handleIPC() {
  window.handleErrorMessage = (msg: string) => {
    void message.error(msg, 2)
  }
}
