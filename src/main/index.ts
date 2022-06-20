import { app } from "electron";
import { existsSync } from "fs";
import { join } from "path";

import Window from "enums/Window";
import globalTexts from "globalTexts/main";

import { unpackMod} from "./scripts/archive";
import { checkInitialChanges, checkUpdate, hasAdminPrivileges, hasAllPaths, hasPermissions } from "./scripts/checks";
import config from "./scripts/config";
import { resetConfig, saveConfig } from "./scripts/configMethods";
import { getSize } from "./scripts/hash";
import paths from "./scripts/paths";
import { initPublic } from "./scripts/public";
import { findInDir } from "./scripts/service";
import settings, { setSettings } from "./scripts/settings";
import { getGameTexts, getModsTexts } from "./scripts/texts";
import { wins } from "./scripts/windows";
import openWindow from "./windows";

const { LOADING } = globalTexts;

setSettings({
    appId: "SnowRunner XML editor",
    saveWhenReload: true,
    devTools: false,
    debugWinRAR: false
});

initPublic();

app.disableHardwareAcceleration();
app.setAppUserModelId(settings.appId);
app.whenReady().then(async () => {
    await openWindow(Window.Loading);
    await wins.loading.showAndWait();
    wins.loading.setText(LOADING);
    initProgram();
});

app.on("before-quit", () => {
    settings.isQuit = true;
    if (settings.saveWhenReload)
        saveConfig();
});
process.once("uncaughtExceptionMonitor", () => {
    app.exit();
});

/** `Main` функция */
async function initProgram() {
    if (!hasAdminPrivileges())
        return;

    if (!config.initial) {
        await openWindow(Window.Setup);
        checkUpdate();
    }
    else {
        await checkInitialChanges();

        if (hasAllPaths()) {
            await Promise.all([
                getGameTexts(),
                initDLC(),
                initMods()
            ]);
            await openWindow(Window.App);
            checkUpdate();
        }
        else {
            resetConfig();
        }
    }
}

/** Находит и инициализирует игровые DLC */
async function initDLC() {
    if (!config.settings.DLC)
        return;

    config.dlc = findInDir(paths.dlc, true);
}

/** Инициализирует модификации, указанные в `config.json` */
async function initMods() {
    if (!config.settings.mods)
        return;

    if (config.mods.length === 0)
        return;

    let counter = config.mods.length;

    function deleteFromList(name: string) {
        const modName = name.replace(".pak", "");
        delete config.mods.items[modName];
        --config.mods.length;
        --counter;
    }
    for (const modName in config.mods.items) {
        const mod = config.mods.items[modName];

        if (!existsSync(mod.path)) {
            deleteFromList(config.mods.items[modName].name);
            continue;
        }
        else if (!hasPermissions(mod.path)) {
            deleteFromList(config.mods.items[modName].name);
            continue;
        }

        if (getSize(mod.path) === config.sizes.mods[modName] && existsSync(paths.modsTemp[modName])) {
            --counter;
        }
        else {
            await unpackMod(mod.path);

            if (!existsSync(join(paths.modsTemp, modName, "classes")))
                deleteFromList(config.mods.items[modName].name);
            else
                --counter;

            if (counter === 0) {
                getModsTexts();
                return;
            }
        }
    }

    if (counter <= 0)
        getModsTexts();
}
