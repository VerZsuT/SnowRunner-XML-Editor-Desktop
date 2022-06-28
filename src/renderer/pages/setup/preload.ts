import { existsSync } from "fs";
import { basename, join } from "path";

import "scripts/rootPreload";
import main from "scripts/main";
import type ISetupPreload from "types/ISetupPreload";

import texts from "./texts";

const { getDir: openDialog, getInitial: openInitialDialog } = main;

const {
    EMPTY_FOLDER_ERROR,
    INVALID_FOLDER_ERROR,
    INVALID_INITIAL_ERROR
} = texts;

function getGameFolder() {
    const result = openDialog();
    let existed = "";

    if (!result) {
        window.handleErrorMessage(EMPTY_FOLDER_ERROR);
        return;
    }
    const folder = result;
    const paths = [
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
        window["errorHandler"](INVALID_FOLDER_ERROR);
        return;
    }

    return {
        folder,
        initial: existed
    };
}

function getInitial() {
    const result = openInitialDialog();

    if (!result || basename(result) !== "initial.pak" || !existsSync(result)) {
        window["errorHandler"](INVALID_INITIAL_ERROR);
        return;
    }
    return { initial: result };
}

window.preload = <ISetupPreload>{
    getGameFolder,
    getInitial
};
