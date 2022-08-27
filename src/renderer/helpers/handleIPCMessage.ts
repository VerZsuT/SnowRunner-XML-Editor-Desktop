import {message} from 'antd'

export function handleIPCMessage() {
    window.handleErrorMessage = (msg: string) => {
        message.error(msg, 2)
    }
}
