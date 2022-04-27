import type IWindow from "../types/IWindow";
import type windows from "../classes/Windows";

import entries from "../types/webpackEntries";

class Update implements IWindow {
    private createArgs = {
        path: entries.update,
        preload: entries.categoriesPreload,
        width: 400,
        minWidth: 400,
        height: 200,
        minHeight: 220,
        frame: false
    };

    public async create(wins: typeof windows, ...args: any[]) {
        const wind = wins.createModal(this.createArgs);

        wind.once("show", () => wind.webContents.postMessage("content", args[0]));
        return wind;
    }
}

export default new Update();
