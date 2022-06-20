import { app } from "electron";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "fs";

import BuildType from "enums/BuildType";

import { unpackMain } from "./archive";
import config from "./config";
import { error } from "./dialogs";
import { showNotification } from "./notifications";
import paths from "./paths";
import { publicFunction } from "./renderChannel";
import settings from "./settings";
import texts from "./texts";

const {
    DELETE_OLD_INITIAL_BACKUP_ERROR,
    DELETE_CURRENT_INITIAL_BACKUP_ERROR,
    SAVE_INITIAL_BACKUP_ERROR,
    SUCCESS_INITIAL_RESTORE,
    SUCCESS_BACKUP_SAVE,
    SUCCESS
} = texts;

publicFunction("saveBackup", saveBackup);
publicFunction("copyBackup", copyBackup);
publicFunction("recoverFromBackup", recoverBackup);

/**
 * Сохранить бэкап `initial.pak` и распаковать файлы
 * @param reload - перезагрузить после завершения
 * @param hideLoading - скрыть окно загрузки по завершению 
 */
export async function saveBackup(reload?: boolean, hideLoading?: boolean) {
    await unpackMain(hideLoading);

    if (!existsSync(paths.backupFolder)) 
        mkdirSync(paths.backupFolder);
    
    if (existsSync(paths.backupInitial)) {
        try {
            rmSync(paths.backupInitial);
        }
        catch {
            throw new Error(DELETE_OLD_INITIAL_BACKUP_ERROR);
        }
    }

    // Не сохранять бэкап в development режиме
    if (config.buildType === BuildType.prod) 
        copyBackup();
    
    if (reload) {
        settings.isQuit = true;
        app.relaunch();
        app.quit();
    }
}

/** Сохранить бэкап `initial.pak` без распаковки */
export function copyBackup() {
    try {
        copyFileSync(config.initial, paths.backupInitial);
        showNotification(SUCCESS, SUCCESS_BACKUP_SAVE);
    }
    catch {
        throw new Error(SAVE_INITIAL_BACKUP_ERROR);
    }
}

/** Заменить оригинальный `initial.pak` на сохранённый. */
export async function recoverBackup() {
    if (!existsSync(paths.backupInitial)) 
        return;

    if (existsSync(config.initial)) {
        try {
            rmSync(config.initial);
        }
        catch {
            error(DELETE_OLD_INITIAL_BACKUP_ERROR);
        }
    }

    try {
        copyFileSync(paths.backupInitial, config.initial);
        await unpackMain();
        await showNotification(SUCCESS, SUCCESS_INITIAL_RESTORE);
    }
    catch {
        error(DELETE_CURRENT_INITIAL_BACKUP_ERROR);
    }
}
