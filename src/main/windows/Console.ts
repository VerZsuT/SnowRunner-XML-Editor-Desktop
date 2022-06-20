import Window from "enums/Window";
import type ICreateWindowAttributes from "types/ICreateWindowAttributes";

import entries from "../scripts/webpackEntries";
import { openModal } from "../scripts/windows";

const createArgs: ICreateWindowAttributes = {
    path: entries.console,
    preload: entries.consolePreload,
    width: 700,
    minWidth: 500,
    height: 500,
    minHeight: 520,
    window: Window.Console
};

export default async () => {
    return openModal(createArgs);
};
