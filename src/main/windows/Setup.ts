import { app } from "electron";
import type IWindow from "../types/IWindow";
import type windows from "../classes/Windows";

import entries from "../types/webpackEntries";

class Setup implements IWindow {
    private createArgs = {
        path: entries.setup,
        preload: entries.setupPreload,
        width: 540,
        minWidth: 540,
        height: 320,
        minHeight: 340
    };

    public async create(wins: typeof windows) {
        const wind = wins.createWindow(this.createArgs);

        wind.once("close", () => app.quit());
        await new Promise<void>(resolve => {
            wind.once("show", () => {
                resolve();
                if (!wins.loading.isDestroyed())
                    wins.loading.hide();
            });
        });

        return wind;
    }
}

export default new Setup();
