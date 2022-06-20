import type ILocalizations from "types/ILocalizations";

import config from "./config";

const lang = config.lang;

/** Возвращает объект в зависимости от текущего языка программы */
export default <T extends ILocalizations<T["RU"]>>(obj: T): T["RU"] => {
    return obj[lang];
};
