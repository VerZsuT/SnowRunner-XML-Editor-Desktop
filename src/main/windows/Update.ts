import Window from "enums/Window";
import type ICreateWindowAttributes from "types/ICreateWindowAttributes";

import entries from "../scripts/webpackEntries";
import { openModal } from "../scripts/windows";

const createArgs: ICreateWindowAttributes = {
    path: entries.update,
    preload: entries.updatePreload,
    width: 400,
    minWidth: 400,
    height: 160,
    minHeight: 180,
    frame: false,
    window: Window.Update
};

export default async (...args: any[]) => {
    const wind = openModal(createArgs);

    wind.once("show", () => wind.webContents.postMessage("content", args[0]));
    return wind;
};
