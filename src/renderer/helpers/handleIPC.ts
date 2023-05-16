import { message } from 'antd'

/** Добавляет обработку входящих IPC сообщений (ошибок) */
function handleIPC() {
  window.handleErrorMessage = (msg: string) => {
    void message.error(msg, 2)
  }
}

export default handleIPC
