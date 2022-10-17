import { message } from 'antd'

export function handleIPCMessage() {
  window.handleErrorMessage = (msg: string) => {
    void message.error(msg, 2)
  }
}
