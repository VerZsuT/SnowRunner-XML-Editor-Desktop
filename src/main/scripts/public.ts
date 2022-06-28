import { execFile } from "child_process";
import { app, BrowserWindow, ipcMain, shell } from "electron";
import { chmodSync, existsSync } from "fs";
import { join } from "path";

import globalTexts from "globalTexts/main";
import * as defaults from "scripts/defaults.json";
import type IDefaults from "types/IDefaults";

import { updateArchive } from "./archive";
import { info, regFunctions, regProperties } from "./bridge";
import config from "./config";
import { exportConfig, importConfig } from "./configMethods";
import { alert, error } from "./dialogs";
import paths from "./paths";
import { findInDir } from "./service";
import settings from "./settings";
import texts, { gameTexts } from "./texts";

// Для инициализации публичных функций
import "./epf";
import "./updates";

const {
    ONLY_MANUAL_UNINS,
    IMPORT_CONFIG_ERROR,
    SAVE_MOD_ERROR,
    SAVE_ORIGINAL_ERROR
} = texts;
const { SUCCESS_EXPORT_MESSAGE } = globalTexts;

ipcMain.on("getInfo", event => {
    event.returnValue = info;
});

regProperties({
    defaults: () => <IDefaults><unknown>defaults,
    texts: () => gameTexts,
    paths: () => paths,
    config: [
        () => config,
        (value: any) => config[value.key] = value.value
    ]
});

regFunctions([
    devTools,
    findInDir,
    updateFiles,
    [publicExportConfig, "exportConfig"],
    [publicImportConfig, "importConfig"],
    [shell.openExternal, "openLink"],
    [shell.openPath, "openPath"],
    [uninstall, "runUninstall"],
    [reload, "relaunchApp"],
    [quit, "quitApp"]
]);

/** Перезапустить программу */
export function reload() {
    settings.isQuit = true;
    app.relaunch();
    app.quit();
}

/** Закрыть программу */
export function quit() {
    settings.isQuit = true;
    app.quit();
}

/** Управление `DevTools` */
export function devTools(state: boolean = null) {
    if (state === null) {
        const activeWindow = BrowserWindow.getFocusedWindow();
        if (activeWindow)
            activeWindow.webContents.toggleDevTools();
    }
    else {
        settings.devTools = state;
    }
}

/** Запустить деинсталлятор */
export function uninstall() {
    if (!existsSync(paths.uninstall)) {
        alert({
            message: ONLY_MANUAL_UNINS,
            title: settings.appId
        });
    }
    else {
        execFile(paths.uninstall);
        settings.isQuit = true;
        app.quit();
    }
}

export function publicExportConfig(toBackups = true) {
    if (exportConfig(toBackups)) {
        alert({
            message: SUCCESS_EXPORT_MESSAGE,
            title: settings.appId
        });
        return true;
    }
    return false;
}

export function publicImportConfig(fromBackups = true) {
    if (importConfig(fromBackups)) {
        settings.isQuit = true;
        app.relaunch();
        app.quit();
        return true;
    }

    alert({
        message: IMPORT_CONFIG_ERROR,
        title: settings.appId
    });
    return false;
}

export function updateFiles(modId?: string) {
    if (modId) {
        try {
            updateArchive(join(paths.modsTemp, modId), config.mods.items[modId].path, true);
        }
        catch {
            try {
                chmodSync(config.mods.items[modId].path, 0o777);
                updateArchive(join(paths.modsTemp, modId), config.mods.items[modId].path, true);
            }
            catch {
                error(SAVE_MOD_ERROR);
            }
        }
    }
    else {
        try {
            updateArchive(paths.mainTemp, config.initial);
        }
        catch {
            try {
                chmodSync(config.initial, 0o777);
                updateArchive(paths.mainTemp, config.initial);
            }
            catch {
                error(SAVE_ORIGINAL_ERROR);
            }
        }
    }
}
