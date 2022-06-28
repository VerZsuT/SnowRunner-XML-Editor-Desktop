import { app } from "electron";
import { createWriteStream, existsSync, lstatSync, mkdirSync, readdirSync, rmSync } from "fs";
import { get } from "https";
import { basename, dirname, join } from "path";

import { getHash } from "main/scripts/hash";
import type IDownloadParams from "types/IDownloadParams";
import IUpdateMap from "types/IUpdateMap";

import { regFunctions } from "./bridge";
import { exportConfig } from "./configMethods";
import paths from "./paths";
import { clearTemp } from "./service";
import settings from "./settings";
import { wins } from "./windows";

regFunctions([[update, "updateApp"]]);

/** Загрузить файл(ы) из сети */
export function download(params: IDownloadParams, callback: (data?: any) => any) {
    const { array, isRoot, inMemory, loadingPage, path, url, fromJSON } = params;

    if (array) {
        const { url, path } = array[0];

        if (isRoot)
            loadingPage.setCount(array.length);
        loadingPage.setText(basename(path));

        download({ url, path, loadingPage }, () => {
            callback();
            if (array.length > 1) {
                download({
                    array: array.slice(1),
                    loadingPage
                }, callback);
            }
        });
        return;
    }

    get(url, response => {
        if (inMemory) {
            let chunks = "";

            response.on("data", chunk => chunks += chunk);
            response.on("end", () => {
                if (fromJSON)
                    callback(JSON.parse(chunks));
                else
                    callback(chunks);
            });
        }
        else {
            const file = createWriteStream(path);
            if (loadingPage) {
                const len = parseInt(response.headers["content-length"], 10);
                let cur = 0;

                response.on("data", chunk => {
                    cur += chunk.length;
                    loadingPage.setPercent((100.0 * (cur / len)).toFixed(2));
                });
            }

            response.pipe(file);
            response.on("end", () => {
                loadingPage.success();
                file.on("close", callback);
                file.close();
            });
        }
    });
}

/** Запустить процесс обновления программы */
export function update() {
    const page = wins.loading;
    let flagToReload = false;

    page.download();
    page.show();
    clearTemp();

    download({
        url: paths.updateMap,
        fromJSON: true,
        inMemory: true
    }, updateMap => {
        const checked = processMap(updateMap);
        const toRemove = checked[0];
        let forCreateOrChange = checked[1];

        for (const path of toRemove) {
            if (lstatSync(path).isFile())
                rmSync(path);
            else
                rmSync(path, { recursive: true });
        }

        if (forCreateOrChange.length === 0) {
            settings.saveWhenReload = false;
            exportConfig();
            settings.isQuit = true;
            app.relaunch();
            app.quit();
        }
        const toDownload = [];
        for (const relativePath of forCreateOrChange) {
            const path = join(paths.root, relativePath);
            const webPath = relativePath.replaceAll("\\", "/").replace(".webpack", "webpack");
            const url = `${paths.updateFiles}/${webPath}`;

            if (!existsSync(dirname(path)))
                mkdirSync(path, { recursive: true });

            toDownload.push({ url, path });
        }
        download({
            array: toDownload,
            loadingPage: page,
            isRoot: true
        }, () => {
            forCreateOrChange = forCreateOrChange.slice(1);
            if (forCreateOrChange.length === 0 && flagToReload === false) {
                settings.saveWhenReload = false;
                settings.isQuit = true;
                flagToReload = true;

                exportConfig();
                app.relaunch();
                app.quit();
            }
        });
    });
}

/**
 * Найти по указанному пути все файлы, которые должны быть удалены в процессе обновления
 * @param path - начальный путь (вложенные папки тоже проверяются)
 * @param map - карта обновления
 */
function getPathsForDelete(path: string, map: IUpdateMap) {
    const toRemove: string[] = [];
    const items = readdirSync(path);

    for (const item of items) {
        const path2 = join(path, item);

        if (lstatSync(path2).isDirectory()) {
            const array = getPathsForDelete(path2, map);
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
 * Обработать карту обновления
 * @param map - карта обновления
 * @returns `[пути_для_удаления, для_обновления]`
 */
function processMap(map: IUpdateMap) {
    const toRemove = getPathsForDelete(paths.root, map);
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
            if (getHash(absolutePath) !== map[relativePath])
                toCreateOrChange.push(relativePath);
        }
    }

    return [toRemove, toCreateOrChange];
}
