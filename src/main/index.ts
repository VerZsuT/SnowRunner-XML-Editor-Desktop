import { app } from "electron";
import { existsSync } from "fs";
import { join } from "path";

import Config, { config } from "./classes/Config";
import Settings, { settings } from "./classes/Settings";
import checker from "./classes/Checker";
import texts from "./classes/Texts";
import windows from "./classes/Windows";
import hasher from "./classes/Hasher";
import archiver from "./classes/Archiver";
import Public from "./classes/Public";
import { findInDir, paths } from "./service";

Settings.set({
    appId: "SnowRunner XML editor",
    saveWhenReload: true,
    devTools: false,
    showWinRAR: false
});

Public.init();

app.disableHardwareAcceleration();
app.setAppUserModelId(settings.appId);
app.whenReady().then(() => {
    windows.open("Loading");
    windows.loading.once("show", () => {
        windows.loading.setText(texts.get("LOADING"));
        initProgram();
    });
});

app.on("before-quit", () => {
    settings.isQuit = true;
    if (settings.saveWhenReload)
        Config.save();
});
process.once("uncaughtExceptionMonitor", () => {
    app.exit()
});

/** `Main`функция */
async function initProgram() {
    if (!checker.checkAdmin())
        return;

    if (!config.initial) {
        windows.open("Setup").then(() => {
            checker.checkUpdate();
        });
    }
    else {
        await checker.checkInitial();

        if (checker.hasAllPaths()) {
            await Promise.all([
                texts.addIngame(),
                initDLC(),
                initMods()
            ]);
            windows.open("Categories").then(() => {
                checker.checkUpdate();
            });
        }
        else {
            Config.reset();
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
        name = name.replace(".pak", "");
        delete config.mods.items[name];
        --config.mods.length;
        --counter;
    }
    for (const modName in config.mods.items) {
        const mod = config.mods.items[modName];

        if (!existsSync(mod.path)) {
            deleteFromList(config.mods.items[modName].name);
            continue;
        }
        else if (!checker.checkPermissions(mod.path)) {
            deleteFromList(config.mods.items[modName].name);
            continue;
        }

        if (hasher.getSize(mod.path) === config.sizes.mods[modName] && existsSync(paths.modsTemp[modName])) {
            --counter;
            continue;
        }
        else {
            await archiver.unpackMod(mod.path);

            if (!existsSync(join(paths.modsTemp, modName, "classes")))
                deleteFromList(config.mods.items[modName].name);
            else
                --counter;

            if (counter === 0) {
                texts.addFromMods();
                return;
            }
        }
    }
    
    if (counter <= 0)
        texts.addFromMods();
}
