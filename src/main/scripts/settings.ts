import type ISettings from "types/ISettings";

/** Объект настроек */
const settings: ISettings = {};

/** Установить настройки */
export function setSettings(newObj: ISettings) {
    for (const key in newObj)
        settings[key] = newObj[key];
}

export default settings;
