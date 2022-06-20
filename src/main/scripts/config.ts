import { readFileSync } from "fs";

import Lang from "enums/Lang";
import type IConfig from "types/IConfig";

import paths from "./paths";

export default getConfig();

/** Получить текущую конфигурацию. */
function getConfig() {
    const config: IConfig = JSON.parse(readFileSync(paths.config).toString());

    if (config.lang === null) {
        const locale = Intl.DateTimeFormat().resolvedOptions().locale.split("-")[1];
        config.lang = Object.keys(Lang).includes(locale) ? <Lang>locale : Lang.EN;
    }
    return config;
}
