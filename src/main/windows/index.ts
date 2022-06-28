import Window from "enums/Window";

import { regFunctions } from "../scripts/bridge";
import openLoading from "./Loading";
import openApp from "./Main";
import openSettings from "./Settings";
import openSetup from "./Setup";
import openUpdate from "./Update";
import openWhatsNew from "./WhatsNew";

regFunctions([openWindow]);

const windows = {
    [Window.Main]: openApp,
    [Window.Loading]: openLoading,
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
