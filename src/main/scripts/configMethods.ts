import { app } from "electron";
import { existsSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";

import DialogType from "enums/DialogType";
import type IConfig from "types/IConfig";

import config from "./config";
import { openDialog } from "./dialogs";
import paths from "./paths";
import { regFunctions } from "./bridge";
import { clearTemp } from "./service";
import settings from "./settings";
import texts from "./texts";

const { SAVE_CONFIG_ERROR } = texts;

regFunctions([resetConfig]);

/** Сохранить изменения в `config.json` */
export function saveConfig() {
    try {
        writeFileSync(paths.config, JSON.stringify(config, null, "\t"));
    }
    catch {
        throw new Error(SAVE_CONFIG_ERROR);
    }
}

/** Установить настройки */
export function setConfig(newObj: IConfig) {
    for (const key in newObj)
        config[key] = newObj[key];
}

/**
 * Сбросить `config.json` на "заводскую" версию
 * @param noReload - отмена перезагрузки после завершения.
 */
export function resetConfig(noReload?: boolean) {
    const { version, buildType } = config;

    setConfig({
        version,
        buildType,
        favorites: [],
        initial: null,
        dlc: [],
        mods: {
            length: 0,
            items: {}
        },
        settings: {
            updates: true,
            DLC: true,
            mods: true,
            showWhatsNew: true,
            advancedMode: false
        },
        sizes: {
            initial: null,
            mods: {}
        },
        lang: null
    });

    clearTemp();
    if (!noReload) {
        app.relaunch();
        app.quit();
    }
    else {
        saveConfig();
    }
}

/** Экспортировать `config.json`. */
export function exportConfig(toBackups = true) {
    if (toBackups) {
        if (!existsSync(paths.backupFolder))
            return false;

        writeFileSync(`${paths.backupFolder}\\config.json`, JSON.stringify(config));
        return true;
    }

    const path = <string> openDialog({
        extention: "ecf",
        type: DialogType.save,
        defaultPath: "config.ecf"
    });

    if (!path)
        return false;

    const copy = {
        ...config,
        type: "SXMLE_CONFIGURATION"
    };
    writeFileSync(path, JSON.stringify(copy, null, "\t"));
    return true;
}

/** Импортировать `config.json`. */
export function importConfig(fromBackups = true) {
    let exportedConfig: any;

    if (fromBackups) {
        if (!existsSync(join(paths.backupFolder, "config.json")))
            return false;

        exportedConfig = JSON.parse(readFileSync(`${paths.backupFolder}\\config.json`).toString());
    }
    else {
        const path = openDialog({ extention: "ecf" }) as string;
        if (!path || !existsSync(path))
            return false;

        exportedConfig = JSON.parse(readFileSync(path).toString());
        if (exportedConfig.type !== "SXMLE_CONFIGURATION")
            return false;

        delete exportedConfig.type;
    }

    settings.saveWhenReload = false;
    exportedConfig.settings.showWhatsNew = true;

    before066d(exportedConfig);
    before067(exportedConfig);
    before068(exportedConfig);

    exportedConfig.version = config.version;
    writeFileSync(paths.config, JSON.stringify(exportedConfig));
    if (fromBackups)
        rmSync(`${paths.backupFolder}\\config.json`, { force: true });

    return true;
}

/** Преобразовать к версии 0.6.8. */
function before068(exportedConfig: any) {
    if (exportedConfig.version < "0.6.8")
        exportedConfig.settings.advancedMode = false;
}

/** Преобразовать к версии 0.6.7. */
function before067(exportedConfig: any) {
    if (exportedConfig.version < "0.6.7") {
        const mods: any = {};
        let length = 0;

        exportedConfig.initial = exportedConfig.paths.initial;
        exportedConfig.dlc = [...exportedConfig.dlcList];

        if (exportedConfig.modsList.length !== 0) {
            for (const modName in exportedConfig.modsList) {
                if (modName !== "length") {
                    mods[modName] = { ...exportedConfig.modsList[modName] };
                    ++length;
                }
            }
        }

        exportedConfig.mods = {
            length,
            items: mods
        };
        exportedConfig.favorites = [];

        delete exportedConfig.paths;
        delete exportedConfig.dlcList;
        delete exportedConfig.modsList;
        delete exportedConfig.ADV;
        delete exportedConfig.ETR;
        delete exportedConfig.settings.resetButton;
        delete exportedConfig.settings.devMode;
    }
}

/** Преобразовать к версии 0.6.6d. */
function before066d(exportedConfig: any) {
    if (exportedConfig.version < "0.6.6d") {
        delete exportedConfig.sums;
        exportedConfig.sizes = {
            initial: null,
            mods: {}
        };
    }
}
