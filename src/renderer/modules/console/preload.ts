import { contextBridge } from "electron";
import { rmSync } from "fs";
import { basename } from "path";
import type IConsolePreload from "./types/IConsolePreload";
import "scripts/mainPreload";
import main from "scripts/main";

const { openInitialDialog } = main;

const consolePreload: IConsolePreload = {
    replacePars: (str: string) => {
        if (!str)
            return str;

        if (str.startsWith("\""))
            str = str.slice(1);

        if (str.endsWith("\""))
            str = str.slice(0, -1);

        return str;
    },
    getModPak: () => {
        const path = openInitialDialog();
        if (!path)
            return;

        return {
            id: basename(path, ".pak"),
            path: path,
            name: basename(path)
        };
    },
    removeDir: (path: string) => {
        rmSync(path, { recursive: true });
    }
};

contextBridge.exposeInMainWorld("consolePreload", consolePreload);
