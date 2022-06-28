import dns from "dns";
import { app, shell } from "electron";
import { accessSync, constants, existsSync, writeFileSync } from "fs";
import https from "https";
import { join } from "path";

import Window from "enums/Window";

import openWindow from "../windows";
import { unpackMain } from "./archive";
import { saveBackup } from "./backup";
import { regFunctions } from "./bridge";
import config from "./config";
import { alert, error } from "./dialogs";
import { getSize } from "./hash";
import { showNotification } from "./notifications";
import paths from "./paths";
import texts from "./texts";
import { wins } from "./windows";

const {
    ADMIN_REQUIRED_MESSAGE,
    ALLOW_NEW_VERSION,
    NOTIFICATION,
    INITIAL_NOT_FOUND,
    CLASSES_NOT_FOUND,
    DLC_FOLDER_NOT_FOUND
} = texts;

const MEDIA_FOLDER = "[media]";
const DNS_TO_RESOLVE = "www.google.com";

regFunctions([checkUpdate]);

/**
 * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
 *
 * Выводит уведомление и закрывает программу при неудаче
 */
export function hasAdminPrivileges() {
    try {
        writeFileSync(paths.config, JSON.stringify(config, null, "\t"));
        return true;
    }
    catch {
        wins.loading.setPercent(0);
        alert({
            message: ADMIN_REQUIRED_MESSAGE,
            type: "warning",
            buttons: ["Exit"],
            title: "Error"
        });
        setTimeout(app.quit, 2000);
        return false;
    }
}

/**
 * Проверить на стороннее изменение `initial.pak`.
 *
 * Если изменения присутствуют, то обновляет файлы в программе
 */
export async function checkInitialChanges() {
    if (!existsSync(join(paths.mainTemp, MEDIA_FOLDER)) || getSize(config.initial) !== config.sizes.initial) {
        if (existsSync(config.initial)) {
            if (!existsSync(paths.backupInitial))
                await saveBackup();
            else
                await unpackMain(false);
        }
    }
}

/**
 * Проверить наличие обновления
 *
 * Выводит оповещение при наличии
 * @param whateverCheck игнорировать настройку `settings.updates` в `config.json`
 */
export function checkUpdate(whateverCheck?: boolean) {
    if (!config.settings.updates && !whateverCheck)
        return;

    dns.resolve(DNS_TO_RESOLVE, error => {
        if (error)
            return;

        https.get(paths.publicInfo, res => {
            let rawData = "";

            res.setEncoding("utf-8");
            res.on("data", chunk => rawData += chunk);
            res.on("end", () => {
                const data = JSON.parse(rawData);

                if (config.version < data.latestVersion || (
                    config.version.includes("-beta")
                    && config.version.split("-beta")[0] === data.latestVersion)
                ) {
                    if (config.version >= data.minVersion) {
                        openWindow(Window.Update, data.latestVersion);
                    }
                    else {
                        showNotification(NOTIFICATION, ALLOW_NEW_VERSION)
                            .then(() => {
                                shell.openExternal(paths.downloadPage);
                            });
                    }
                }
            });
        });
    });
}

/**
 * Проверить наличие всех путей для работы программы. `config.paths`.
 *
 * В случае неудачи выводит уведомление
 */
export function hasAllPaths() {
    if (!existsSync(config.initial)) {
        error(INITIAL_NOT_FOUND);
        return false;
    }

    if (!existsSync(paths.classes)) {
        error(CLASSES_NOT_FOUND);
        return false;
    }

    if (config.settings.DLC && !existsSync(paths.dlc)) {
        error(DLC_FOLDER_NOT_FOUND);
        config.settings.DLC = false;
    }

    return true;
}

/** Проверить наличие у программы прав на чтение/запись файла по переданному пути */
export function hasPermissions(path: string) {
    try {
        accessSync(path, constants.W_OK);
        return true;
    }
    catch {
        return false;
    }
}
