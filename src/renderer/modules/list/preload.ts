import { contextBridge } from "electron";
import { join, basename, extname } from "path";
import { existsSync, rmSync, readdirSync, readFileSync } from "fs";
import { homedir, userInfo } from "os";
import "scripts/mainPreload";

import type IFindItem from "./types/IFindItem";
import type IItem from "./types/IItem";
import type IListPreload from "./types/IListPreload";
import ListType from "./enums/ListType";
import SrcType from "./enums/SrcType";

import { findInDir } from "main/service";
import config from "scripts/config";
import main from "scripts/main";

const { unpack, openInitialDialog, paths } = main;

const listPreload: IListPreload = {
    removeDir: (path: string) => {
        rmSync(path, { recursive: true });
    },
    findMods: async () => {
        const pathToUser = userInfo().homedir || homedir() || process.env.HOME;
        const out: { name: string, path: string }[] = [];
        let pathToMods: string;

        if (!existsSync(pathToUser))
            return [];

        pathToMods = join(pathToUser, "Documents/My Games/SnowRunner/base/Mods/.modio/mods");
        if (!existsSync(pathToMods))
            return [];

        for (const folder of readdirSync(pathToMods, { withFileTypes: true })) {
            let modFolder: string;
            if (folder.isFile())
                continue;

            modFolder = join(pathToMods, folder.name);

            for (const file of readdirSync(modFolder, { withFileTypes: true })) {
                let filePath: string;
                if (file.isDirectory())
                    continue;

                filePath = join(modFolder, file.name);

                if (extname(file.name) === ".pak") {
                    unpack(filePath, join(paths.modsTemp, file.name), true);
                    if (existsSync(join(paths.modsTemp, file.name, "classes"))) {
                        const pathToModio = join(modFolder, "modio.json");
                        let modName = basename(file.name, ".pak");
                        if (existsSync(pathToModio))
                            modName = JSON.parse(readFileSync(pathToModio).toString()).name;

                        out.push({
                            name: modName,
                            path: filePath
                        });
                    }
                }
            }
        }
        for (const enabledModName in config.mods.items) {
            const enabledModPath = config.mods.items[enabledModName].path;
            let isExists = false;

            for (const founedModName in out) {
                if (out[founedModName].path === enabledModPath)
                    isExists = true;
            }
            if (!isExists)
                out.push(config.mods.items[enabledModName]);
        }

        return out;
    },
    getModPak: () => {
        const path = openInitialDialog();
        let id: string;
        let name: string;
        if (!path)
            return;

        id = basename(path, ".pak");
        name = basename(path);
        unpack(path, join(paths.modsTemp, id), true);
        if (!existsSync(join(paths.modsTemp, id, "classes")))
            return;

        return { id, path, name };
    },
    getList: (listType: ListType, from?: SrcType) => {
        if (from === SrcType.dlc) {
            const array = [];

            for (const dlcItem of config.dlc) {
                const path = `${dlcItem.path}/classes`;
                let items: IFindItem[] = [];

                if (listType === ListType.trucks)
                    items = findInDir(join(path, "trucks"));
                else if (listType === ListType.trailers)
                    items = findInDir(join(path, "trucks/trailers"));

                array.push({
                    dlcName: dlcItem.name,
                    items: items
                });
            }
            return array;
        }
        else if (from === SrcType.mods) {
            const array: IItem[] = [];

            for (const modId in config.mods.items) {
                let items: IFindItem[] = [];
                const item = config.mods.items[modId];

                if (listType === ListType.trucks)
                    items = findInDir(join(paths.modsTemp, modId, "classes/trucks"), false, ".xml", true);
                else if (listType === ListType.trailers)
                    items = findInDir(join(paths.modsTemp, modId, "classes/trucks"), false, ".xml", true);

                array.push({
                    id: modId,
                    name: item.name,
                    items: items
                });
            }
            return array;
        }
        else {
            if (listType === ListType.trucks)
                return findInDir(join(paths.classes, "trucks"));
            else if (listType === ListType.trailers)
                return findInDir(join(paths.classes, "trucks/trailers"));
        }
    }
}

contextBridge.exposeInMainWorld("listPreload", listPreload);
