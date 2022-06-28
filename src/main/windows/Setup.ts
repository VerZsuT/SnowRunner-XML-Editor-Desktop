import { app } from "electron";

import Window from "enums/Window";
import entries from "main/scripts/webpackEntries";
import { createWindow, wins } from "main/scripts/windows";
import type ICreateWindowAttributes from "types/ICreateWindowAttributes";

const createArgs: ICreateWindowAttributes = {
    path: entries.setup,
    preload: entries.setupPreload,
    width: 620,
    minWidth: 620,
    height: 290,
    minHeight: 310,
    window: Window.Setup
};

export default async () => {
    const wind = createWindow(createArgs);

    wind.once("focus", () => {
        wins.loading.hide();
    });

    wind.once("close", app.quit);
    
    return wind;
};
