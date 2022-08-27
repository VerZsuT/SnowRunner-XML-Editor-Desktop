import {Notification} from 'electron'

import {paths} from './paths'

/** Вывести `windows-notification` на экран */
export async function showNotification(title: string, message: string) {
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
