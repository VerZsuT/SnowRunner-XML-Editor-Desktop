import { Notification as ElNotification } from 'electron'
import { ITexts } from 'texts'
import { Texts } from './Texts'
import { paths } from '../service'

type TKeys = keyof ITexts

/** Отвечает за показ `windows-notification`. */
export class Notification {
    /** Выводит windows-notification на экран. */
    static show = async (titleKey: TKeys, messageKey: TKeys) => {
        if (ElNotification.isSupported()) {
            const notification = new ElNotification({
                title: Texts.get(titleKey),
                icon: paths.icon,
                body: Texts.get(messageKey)
            })

            notification.show()
            await new Promise(resolve => notification.once('click', resolve))
        }
    }
}
