import { app, ipcMain } from "electron";

import Window from "enums/Window";
import type ICreateWindowAttributes from "types/ICreateWindowAttributes";

import entries from "../scripts/webpackEntries";
import { createWindow, wins } from "../scripts/windows";

const createArgs: ICreateWindowAttributes = {
    path: entries.main,
    preload: entries.mainPreload,
    width: 840,
    minWidth: 800,
    height: 700,
    minHeight: 630,
    window: Window.Main
};

export default async () => {
    const wind = createWindow(createArgs);

    ipcMain.once("enable-list-resize", () => {
        wind.on("resize", () => {
            wind.webContents.send("window-resize");
        });
    });

    wind.once("close", () => {
        app.quit();
    });
    wind.once("focus", () => {
        wins.loading.hide();
    });

    return wind;
};
