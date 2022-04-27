import type IWindow from "../types/IWindow";
import type windows from "../classes/Windows";

import entries from "../types/webpackEntries";

class Console implements IWindow {
    private createArgs = {
        path: entries.console,
        preload: entries.consolePreload,
        width: 700,
        minWidth: 500,
        height: 500,
        minHeight: 520
    };

    public async create(wins: typeof windows) {
        return wins.createModal(this.createArgs);
    }
}

export default new Console();
