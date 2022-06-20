import Window from "enums/Window";
import type ICreateWindowAttributes from "types/ICreateWindowAttributes";

import entries from "../scripts/webpackEntries";
import { openModal } from "../scripts/windows";

const createArgs: ICreateWindowAttributes = {
    path: entries.settings,
    preload: entries.settingsPreload,
    width: 400,
    minWidth: 400,
    height: 330,
    minHeight: 350,
    window: Window.Settings
};

export default async () => {
    return openModal(createArgs);
};
