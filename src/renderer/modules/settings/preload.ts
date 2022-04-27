import { contextBridge } from "electron";
import { existsSync } from "fs";
import { join, basename } from "path";
import type ISettingsPreload from "./types/ISettingsPreload";
import "scripts/mainPreload";
import localize from "scripts/localize";
import main from "scripts/main";

const { openDialog, openInitialDialog } = main;

const settingsPreload: ISettingsPreload = {
    getGameFolder: () => {
        const result = openDialog();
        let folder: string;
        let paths: string[];
        let existed = null;

        if (!result) {
            window["errorHandler"](localize.EMPTY_FOLDER_ERROR);
            return;
        }
        folder = result;
        paths = [
            join(folder, "steamapps/common/SnowRunner/preload/paks/client/initial.pak"),
            join(folder, "common/SnowRunner/preload/paks/client/initial.pak"),
            join(folder, "SnowRunner/en_us/preload/paks/client/initial.pak"),
            join(folder, "en_us/preload/paks/client/initial.pak"),
            join(folder, "preload/paks/client/initial.pak"),
            join(folder, "paks/client/initial.pak"),
            join(folder, "client/initial.pak"),
            join(folder, "initial.pak")
        ];
        
        for (const path of paths) {
            if (existsSync(path)) {
                existed = path;
                break;
            }
        }

        if (!existed) {
            window["errorHandler"](localize.INVALID_FOLDER_ERROR);
            return;
        }

        return {
            folder: folder,
            initial: existed
        };
    },
    getInitial: () => {
        const result = openInitialDialog();

        if (!result || basename(result) !== "initial.pak" || !existsSync(result)) {
            window["errorHandler"](localize.INVALID_INITIAL_ERROR);
            return;
        }
        return { initial: result };
    }
};

contextBridge.exposeInMainWorld("settingsPreload", settingsPreload);
