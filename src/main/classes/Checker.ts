import https from "https";
import dns from "dns";
import { writeFileSync, existsSync, lstatSync, readdirSync, accessSync, constants } from "fs";
import { join } from "path";
import { app, shell } from "electron";
import type IUpdateMap from "../types/IUpdateMap";

import { paths } from "../service";
import { config } from "./Config";
import dialog from "./Dialog";
import windows from "./Windows";
import texts from "./Texts";
import hasher from "./Hasher";
import notification from "./Notification";
import backup from "./Backup";
import archiver from "./Archiver";
import { linkWithRender } from "../renderChannel";
import HasLinked from "../types/HasLinked";

/** Отвечает за различные проверки. */
class Checker extends HasLinked {
    /**
     * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
     * 
     * _Выводит уведомление и закрывает программу при неудаче._
     */
    public checkAdmin() {
        try {
            writeFileSync(paths.config, JSON.stringify(config, null, "\t"));
            return true;
        }
        catch {
            windows.loading.setPercent(0);
            dialog.alert({
                message: texts.get("ADMIN_REQUIRED_MESSAGE"),
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
     * _Если изменения присутствуют, то обновляет файлы в программе._
     */
    public async checkInitial() {
        if (!existsSync(join(paths.mainTemp, "[media]")) || hasher.getSize(config.initial) !== config.sizes.initial) {
            if (existsSync(config.initial)) {
                if (!existsSync(paths.backupInitial))
                    await backup.save();
                else
                    await archiver.unpackMain();
            }
        }
    }

    /**
     * Найти по указанному пути все файлы, которые должны быть удалены в процессе обновления.
     * @param path начальный путь (вложенные папки тоже проверяются).
     * @param map карта обновления.
     */
    public checkPathToDelete(path: string, map: IUpdateMap) {
        const toRemove: string[] = [];
        const items = readdirSync(path);
        
        for (const item of items) {
            const path2 = join(path, item);

            if (lstatSync(path2).isDirectory()) {
                const array = this.checkPathToDelete(path2, map);
                if (array)
                    toRemove.push(...array);
            }
            else {
                const relativePath = path2.replace(join(paths.root, "/"), "");
                if (!map[relativePath])
                    toRemove.push(path2);
            }
        }

        return toRemove;
    }

    /**
     * Обработать карту обновления.
     * @param map карта обновления.
     * @returns `[пути_для_удаления, для_обновления]`
     */
    public checkMap(map: IUpdateMap) {
        const toRemove = this.checkPathToDelete(paths.root, map);
        const toCreateOrChange = [];

        for (const relativePath in map) {
            const absolutePath = join(paths.root, relativePath);

            if (!existsSync(absolutePath)) {
                toCreateOrChange.push(relativePath);
            }
            else {
                if (lstatSync(absolutePath).isDirectory()) {
                    toRemove.push(absolutePath);
                    toCreateOrChange.push(relativePath);
                    continue;
                }
                if (hasher.getHash(absolutePath) !== map[relativePath])
                    toCreateOrChange.push(relativePath);
            }
        }

        return [toRemove, toCreateOrChange];
    }

    /**
     * Проверить наличие обновления.
     * 
     * Выводит оповещение при наличии.
     * @param whateverCheck игнорировать настройку `settings.updates` в `config.json`
     */
    @linkWithRender
    public checkUpdate(whateverCheck?: boolean) {
        if (!config.settings.updates && !whateverCheck)
            return;

        dns.resolve("www.google.com", error => {
            if (!error) {
                https.get(paths.publicInfo, res => {
                    let rawData = "";
        
                    res.setEncoding("utf-8");
                    res.on("data", chunk => rawData += chunk);
                    res.on("end", () => {
                        const data = JSON.parse(rawData);
        
                        if (config.version < data.latestVersion || (
                            config.version.includes("-beta") &&
                            config.version.split("-beta")[0] === data.latestVersion)
                        ) {
                            if (config.version >= data.minVersion) {
                                windows.open("Update", data.latestVersion);
                            }
                            else {
                                notification.show("NOTIFICATION", "ALLOW_NEW_VERSION").then(() => {
                                    shell.openExternal(paths.downloadPage);
                                });
                            }
                        }
                    })
                })
            }
        })
    }


    /**
     * Проверить наличие всех путей для работы программы. `config.paths`
     * 
     * _В случае неудачи выводит уведомление._
     */
    public hasAllPaths() {
        let success = true;
        
        if (!existsSync(config.initial)) {
            dialog.alert({
                type: "warning",
                title: texts.get("ERROR"),
                message: texts.get("INITIAL_NOT_FOUND")
            });
            success = false;
        }
        else if (!existsSync(paths.classes)) {
            dialog.alert({
                type: "warning",
                title: texts.get("ERROR"),
                message: texts.get("CLASSES_NOT_FOUND")
            });
            success = false;
        }
        else if (config.settings.DLC && !existsSync(paths.dlc)) {
            dialog.alert({
                type: "warning",
                title: texts.get("ERROR"),
                message: texts.get("DLC_FOLDER_NOT_FOUND")
            });
            config.settings.DLC = false;
        }

        return success
    }

    /** Проверить наличие у программы прав на чтение/запись файла по переданному пути. */
    public checkPermissions(path: string) {
        try {
            accessSync(path, constants.W_OK);
            return true;
        }
        catch {
            return false;
        }
    }
}

export default new Checker();
