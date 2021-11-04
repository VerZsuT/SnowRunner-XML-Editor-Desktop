import { Notification as ElNotification } from 'electron'

import type RU from '../../scripts/translations/RU.json'
import Translations from './Translations'
import { paths } from '../service'

type TKeys = keyof typeof RU

/**
 * Отвечает за показ windows-уведомлений.
*/
export default class Notification {
    /**
     * Выводит windows-уведомление на экран.
    */
    public static show = (titleKey: TKeys, messageKey: TKeys) => {
        return new Promise(resolve => {
            if (ElNotification.isSupported()) {
                const notification = new ElNotification({
                    title: Translations.getText(titleKey),
                    icon: paths.icon,
                    body: Translations.getText(messageKey)
                })
    
                notification.show()
                notification.once('click', resolve)
            }
        })
    }
}
