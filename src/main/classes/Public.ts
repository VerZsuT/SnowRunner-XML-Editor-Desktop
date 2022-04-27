import { app, BrowserWindow, ipcMain, shell } from "electron";
import { existsSync, chmodSync } from "fs";
import { join } from "path";
import { execFile } from "child_process";
import { load } from "cheerio";
import type ITemplateParams from "../templates/types/ITemplateParams";

import { settings } from "./Settings";
import Config, { config } from "./Config";
import archiver from "./Archiver";
import dialog from "./Dialog";
import texts from "./Texts";
import { paths, findInDir } from "../service";
import { templates, extra } from "../templates";
import * as defaults from "scripts/defaults.json";
import { info, linkWithRender, linkFunction, linkProperty } from "../renderChannel";
import HasLinked from "../types/HasLinked";

/** Отвечает за публичные переменные/функции для `renderer-process` */
class Public extends HasLinked {
    /** Установить публичные для `renderer-process` методы и свойства */
    public init() {
        // Данный метод вызывается из renderer-процесса для инициализации mainProcess.
        ipcMain.on("getInfo", event => {
            event.returnValue = info;
        });

        linkProperty("defaults", () => defaults);
        linkProperty("texts", () => texts.obj);
        linkProperty("paths", () => paths);
        linkProperty("config", [
            () => config,
            (value: any) => config[value.key] = value.value
        ]);
        linkProperty("templates", () => templates);

        linkFunction("findInDir", findInDir);
        linkFunction("openLink", shell.openExternal);
        linkFunction("openPath", shell.openPath);
    }

    @linkWithRender
    public reload() {
        settings.isQuit = true;
        app.relaunch();
        app.quit();
    }

    @linkWithRender
    public quit() {
        settings.isQuit = true;
        app.quit();
    }

    @linkWithRender
    public enableDevTools() {
        settings.devTools = true;
    }

    @linkWithRender
    public disableDevTools() {
        settings.devTools = false;
    }

    @linkWithRender
    public toggleDevTools() {
        BrowserWindow.getFocusedWindow().webContents.toggleDevTools();
    }

    @linkWithRender
    public runUninstall() {
        if (!existsSync(paths.uninstall)) {
            dialog.alert({
                message: texts.get("ONLY_MANUAL_UNINS"),
                title: settings.appId
            });
            return;
        }
        else {
            execFile(paths.uninstall);
            settings.isQuit = true;
            app.quit();
        }
    }

    @linkWithRender
    public exportConfig(toBackups = true) {
        if (Config.export(toBackups)) {
            dialog.alert({
                message: texts.get("SUCCESS_EXPORT_MESSAGE"),
                title: settings.appId
            });
            return true;
        }
        return false;
    }

    @linkWithRender
    public importConfig(fromBackups = true) {
        if (Config.import(fromBackups)) {
            settings.isQuit = true;
            app.relaunch();
            app.quit();
            return true;
        }
        else {
            dialog.alert({
                message: texts.get("IMPORT_CONFIG_ERROR"),
                title: settings.appId
            });
            return false;
        }
    }

    @linkWithRender
    public updateFiles(modId?: string) {
        if (modId) {
            try {
                archiver.update(join(paths.modsTemp, modId), config.mods.items[modId].path, true);
            }
            catch {
                try {
                    chmodSync(config.mods.items[modId].path, 0o777);
                    archiver.update(join(paths.modsTemp, modId), config.mods.items[modId].path, true);
                }
                catch {
                    dialog.alert({
                        title: texts.get("ERROR"),
                        message: texts.get("SAVE_MOD_ERROR")
                    });
                }
            }
        }
        else {
            try {
                archiver.update(paths.mainTemp, config.initial);
            }
            catch {
                try {
                    chmodSync(config.initial, 0o777);
                    archiver.update(paths.mainTemp, config.initial);
                }
                catch {
                    dialog.alert({
                        title: texts.get("ERROR"),
                        message: texts.get("SAVE_ORIGINAL_ERROR")
                    });
                }
            }
        }
    }

    @linkWithRender
    public getParams(domString: string, name: keyof typeof templates, fileName: string) {
        const fileDOM = load(domString, { xmlMode: true });
        const mainActions = templates[name].actions;
        const extraActions = extra[fileName]?.actions;
        const extraTemplate = extra[fileName]?.template;
        const extraExclude = extra[fileName]?.exclude;

        let resultActions: string[] = [];
        let params = <ITemplateParams>templates[name].template.getParams({ fileDOM });

        if (mainActions)
            resultActions.push(...mainActions);

        if (extraTemplate) {
            params = [
                ...params,
                ...extraTemplate.getParams({ fileDOM })
            ];
        }
        
        if (extraActions)
            resultActions.push(...extraActions);

        if (extraExclude)
            resultActions = resultActions.filter(action => !extraExclude.includes(action));

        return {
            dom: fileDOM.html(),
            actions: resultActions,
            params
        };
    }
}

export default new Public();
