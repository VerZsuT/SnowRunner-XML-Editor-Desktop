import { Notification } from 'electron'

import { paths } from './paths'

class Notifications {
  async show(title: string, message: string): Promise<void> {
    if (Notification.isSupported()) {
      const notification = new Notification({
        title,
        icon: paths.icon,
        body: message
      })

      notification.show()
      await new Promise(resolve => notification.once('click', resolve))
    }
  }
}

export const notifications = new Notifications()
