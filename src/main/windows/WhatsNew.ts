import Window from "enums/Window";
import type ICreateWindowAttributes from "types/ICreateWindowAttributes";

import config from "../scripts/config";
import entries from "../scripts/webpackEntries";
import { openModal } from "../scripts/windows";

const createArgs: ICreateWindowAttributes = {
    path: entries.whatsNew,
    preload: entries.whatsNewPreload,
    width: 600,
    minWidth: 600,
    height: 500,
    minHeight: 520,
    window: Window.WhatsNew
};

export default async () => {
    const wind = openModal(createArgs);

    wind.once("close", () => config.settings.showWhatsNew = false);
    return wind;
};
