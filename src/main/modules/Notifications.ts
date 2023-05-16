import { Notification } from 'electron'

import Paths from './Paths'

class NotificationsClass {
  async show(title: string, message: string): Promise<void> {
    if (!Notification.isSupported()) return

    const notification = new Notification({
      title,
      icon: Paths.icon,
      body: message
    })

    notification.show()
    await new Promise(resolve => notification.once('click', resolve))
  }
}

const Notifications = new NotificationsClass()

export default Notifications
