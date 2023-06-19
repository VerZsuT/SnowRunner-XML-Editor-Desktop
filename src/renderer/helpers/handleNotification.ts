import { message as antdMessage } from 'antd'

import { IPC } from '../services'

export default function handleNotification() {
  IPC.on('notification', (_, message: { type: 'info' | 'warn' | 'error', text: string }) => {
    switch (message.type) {
      case 'info':
        antdMessage.info(message.text)
        break
      case 'warn':
        antdMessage.warning(message.text)
        break
      case 'error':
        antdMessage.error(message.text)
        break
    }
  })
}
