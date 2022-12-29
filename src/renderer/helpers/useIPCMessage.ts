import { message } from 'antd'

function useIPCMessage() {
  window.handleErrorMessage = (msg: string) => {
    void message.error(msg, 2)
  }
}

export default useIPCMessage
