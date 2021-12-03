import { Notification as ElNotification } from 'electron'

import type RU from '../../scripts/texts/RU.json'
import Texts from './Texts'
import { paths } from '../service'

type TKeys = keyof typeof RU

/** Отвечает за показ `windows-notification`. */
export default class Notification {
    /** Выводит windows-notification на экран. */
    public static show = async (titleKey: TKeys, messageKey: TKeys) => {
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
