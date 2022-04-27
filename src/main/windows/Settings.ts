import type IWindow from "../types/IWindow";
import type windows from "../classes/Windows";

import entries from "../types/webpackEntries";

class Settings implements IWindow {
    private createArgs = {
        path: entries.settings,
        preload: entries.settingsPreload,
        width: 400,
        minWidth: 400,
        height: 460,
        minHeight: 480
    };

    public async create(wins: typeof windows) {
        return wins.createModal(this.createArgs);
    }
}

export default new Settings();
