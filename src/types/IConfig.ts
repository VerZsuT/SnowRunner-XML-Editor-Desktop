import type BuildType from "enums/BuildType";
import type Lang from "enums/Lang";

import type IConfigDLC from "./IConfigDLC";
import type IConfigMods from "./IConfigMods";
import type IConfigSettings from "./IConfigSettings";

interface IConfig {
    /** Версия программы. */
    version: string;

    /** Текущий язык перевода программы. */
    lang: Lang;

    /** Тип билда, при dev доступны некоторые функции для отладки. */
    buildType: BuildType;

    /** Путь к `initial.pak` */
    initial: string;

    /** Настройки программы. */
    settings: IConfigSettings;

    /** Размеры `initial.pak` и модификаций. Используется для определения изменений ИЗВНЕ. */
    sizes: {
        initial: number;
        mods: {
            [name: string]: number;
        };
    };

    /** Список модов. */
    mods: IConfigMods;

    /** Список DLC. */
    dlc: IConfigDLC[];

    /** Список "избранных" автомобилей */
    favorites: string[];
}

export default IConfig;
