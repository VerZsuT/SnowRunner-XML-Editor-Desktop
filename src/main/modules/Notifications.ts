import type { WebContents } from 'electron'
import { Notification } from 'electron'

import { WindowsManager } from '../windows'
import Paths from './Paths'

import $ from '#m/texts'

export default class Notifications {
  static async show(message: string, type: 'info' | 'warn' | 'error'): Promise<void> {
    let webContents: WebContents | undefined
    if (WindowsManager.mainWindow) webContents = WindowsManager.mainWindow.webContents
    if (WindowsManager.setupWindow) webContents = WindowsManager.setupWindow.webContents

    if (webContents) {
      webContents.send('notification', { type, text: message })
      return
    }

    if (!Notification.isSupported()) return

    const notification = new Notification({
      title: $.NOTIFICATION,
      icon: Paths.icon,
      body: message
    })

    notification.show()
    await new Promise(resolve => notification.once('click', resolve))
  }
}
