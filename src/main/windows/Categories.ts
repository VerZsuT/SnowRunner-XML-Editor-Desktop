import { app } from "electron";
import type IWindow from "../types/IWindow";
import type windows from "../classes/Windows";

import entries from "../types/webpackEntries";

class Categories implements IWindow {
    private createArgs = {
        path: entries.categories,
        preload: entries.categoriesPreload,
        width: 615,
        minWidth: 615,
        height: 360,
        minHeight: 380
    };

    public async create(wins: typeof windows) {
        const wind = wins.createWindow(this.createArgs);

        wins.isOpening = true;
        wins.categories = wind;

        wins.categories.once("close", () => {
            if (!wins.isOpening)
                app.quit();
            else
                delete wins.categories;
        });
        await new Promise<void>(resolve => {
            wins.categories.once("show", () => {
                wins.loading.hide();
                if (wins.list && !wins.list.isDestroyed())
                    wins.list.close();
                    
                wins.isOpening = false;
                resolve();
            });
        });

        return wind;
    }
}

export default new Categories();
