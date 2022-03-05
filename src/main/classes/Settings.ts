import type ISettings from 'main/types/ISettings'

/** Для неявной передачи настроек в остальные классы программы. */
export default class Settings {
    /** Объект настроек. */
    public static obj: ISettings = {}

    /** Установить настройки. */
    public static set(newObj: ISettings): ISettings {
        for (const key in newObj) {
            this.obj[key] = newObj[key]
        }
        return this.obj
    }
}
