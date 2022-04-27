import type IWindow from "../types/IWindow";
import type windows from "../classes/Windows";

import entries from "../types/webpackEntries";
import { config } from "../classes/Config";

class WhatsNew implements IWindow {
    private createArgs = {
        path: entries.whatsNew,
        preload: entries.categoriesPreload,
        width: 600,
        minWidth: 600,
        height: 500,
        minHeight: 520
    };

    public async create(wins: typeof windows) {
        const wind = wins.createModal(this.createArgs);

        wind.once("close", () => config.settings.showWhatsNew = false);
        return wind;
    }
}

export default new WhatsNew();
