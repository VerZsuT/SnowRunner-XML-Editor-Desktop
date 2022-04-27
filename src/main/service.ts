import { join, resolve as res } from "path";
import { existsSync, lstatSync, readdirSync, mkdirSync, rmSync } from "fs";
import type IPaths from "./types/IPaths";
import type IFindItem from "modules/list/types/IFindItem";

const resolve = (...args: string[]) => res(__dirname, ...args);
const updaterURL = "https://verzsut.github.io/sxmle_updater";
const mainURL    = "https://verzsut.github.io/SnowRunner-XML-Editor-Desktop";

/** Пути, используемые в программе. */
export const paths: IPaths = {
    /** URL json файла обновления. */
    publicInfo: `${updaterURL}/public.json`,
    /** URL страницы скачивании программы. */
    downloadPage: `${mainURL}/download.html`,
    /** URL папки с файлами обновления. */
    updateFiles: `${updaterURL}/files`,
    /** URL с hash-картой файлов обновления.*/
    updateMap: `${updaterURL}/updateMap.json`,
    /** Путь к папке src. */
    root: resolve("../../"),
    /** Путь к config. */
    config: resolve("config.json"),
    /** Путь к файлу с переводами игры */
    texts: resolve("ingame_texts.json"),
    /** Путь к папке с бэкапами. */
    backupFolder: resolve("backups"),
    /** Путь к иконке программы. */
    icon: resolve("favicon.ico"),
    /** Путь к бэкапу initial.pak. */
    backupInitial: resolve("backups/initial.pak"),
    /** Путь к папке WinRAR(x32) */
    winrar_x32: resolve("winrar"),
    /** Путь к временной папке для основных файлов. */
    mainTemp: resolve("mainTemp"),
    /** Путь к временной папке для файлов модификаций. */
    modsTemp: resolve("modsTemp"),
    /** Путь к временной папке [strings] */
    strings: resolve("mainTemp/[strings]"),
    /** Путь к временной папке _dlc */
    dlc: resolve("mainTemp/[media]/_dlc"),
    /** Путь к временной папке classes */
    classes: resolve("mainTemp/[media]/classes"),
    /** Путь к uninstall.exe */
    uninstall: resolve("../../../../unins000.exe")
};

/**
 * Найти в папке все соответствия.
 * @param startPath - путь, с которого начинается поиск.
 * @param onlyDirs - искать только папки, игнорируя файлы.
 * @param extension - расширение, по которому ведётся поиск файлов.
 * @param inner - искать ли во внутренних папках (по умолчанию они игнорируются).
 * @returns массив путей
*/
export const findInDir = (startPath: string, onlyDirs?: boolean, extension = ".xml", inner?: boolean): IFindItem[] => {
    let array: IFindItem[] = [];
    let files: string[];

    if (!existsSync(startPath))
        return [];

    files = readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filePath = join(startPath, files[i]);
        const stat = lstatSync(filePath);

        if (onlyDirs) {
            if (!stat.isDirectory()) {
                continue;
            }
            else {
                array.push({
                    name: files[i],
                    path: filePath
                });
            }
        }
        if (stat.isDirectory() && inner) {
            array = [...array, ...findInDir(filePath, false, extension, true)];
        }
        else if (files[i].indexOf(extension) >= 0) {
            array.push({
                name: files[i].replace(extension, ""),
                path: filePath
            });
        }
    }
    return array;
}

/** Очистить папку для временных файлов программы */
export function clearTemp() {
    rmSync(paths.backupInitial, { force: true });
    rmSync(paths.mainTemp, { recursive: true, force: true });
    mkdirSync(paths.mainTemp);
    rmSync(paths.modsTemp, { recursive: true, force: true });
    mkdirSync(paths.modsTemp);
}
