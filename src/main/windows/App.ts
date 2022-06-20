import { app } from "electron";

import Window from "enums/Window";
import type ICreateWindowAttributes from "types/ICreateWindowAttributes";

import entries from "../scripts/webpackEntries";
import { createWindow, wins } from "../scripts/windows";

const createArgs: ICreateWindowAttributes = {
    path: entries.app,
    preload: entries.appPreload,
    width: 840,
    minWidth: 800,
    height: 700,
    minHeight: 630,
    window: Window.App
};

export default async () => {
    const wind = createWindow(createArgs);

    wind.once("close", () => {
        app.quit();
    });
    wind.once("focus", () => {
        wins.loading.hide();
    });

    return wind;
};
