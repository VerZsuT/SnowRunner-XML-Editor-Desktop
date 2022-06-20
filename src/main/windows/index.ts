import Window from "enums/Window";

import { publicFunction } from "../scripts/renderChannel";
import openApp from "./App";
import openConsole from "./Console";
import openLoading from "./Loading";
import openSettings from "./Settings";
import openSetup from "./Setup";
import openUpdate from "./Update";
import openWhatsNew from "./WhatsNew";

publicFunction("openWindow", openWindow);

const windows = {
    [Window.App]: openApp,
    [Window.Loading]: openLoading,
    [Window.Console]: openConsole,
    [Window.Update]: openUpdate,
    [Window.Settings]: openSettings,
    [Window.WhatsNew]: openWhatsNew,
    [Window.Setup]: openSetup
};

async function openWindow(window: Window, ...args: any[]) {
    const wind = await windows[window](...args);
    await new Promise(resolve => {
        wind.once("show", resolve);
    });
}

export default openWindow;
