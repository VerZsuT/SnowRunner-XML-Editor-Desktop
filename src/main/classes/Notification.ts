import { Notification as ElNotification } from "electron";

import { ITexts } from "texts";
import texts from "./Texts";
import { paths } from "../service";

type TKeys = keyof ITexts;

/** Отвечает за показ `windows-notification`. */
class Notification {
    /** Вывести `windows-notification` на экран. */
    public async show(titleKey: TKeys, messageKey: TKeys) {
        if (ElNotification.isSupported()) {
            const notification = new ElNotification({
                title: texts.get(titleKey),
                icon: paths.icon,
                body: texts.get(messageKey)
            });

            notification.show();
            await new Promise(resolve => notification.once("click", resolve));
        }
    }
}

export default new Notification();
