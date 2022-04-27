import type ISettings from "main/types/ISettings";

/** Для неявной передачи настроек в остальные классы программы. */
class Settings {
    /** Объект настроек. */
    public obj: ISettings = {};

    /** Установить настройки. */
    public set(newObj: ISettings) {
        for (const key in newObj)
            this.obj[key] = newObj[key];
    }
}

const instance = new Settings();

export const settings = instance.obj;
export default instance;
