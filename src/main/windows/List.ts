import { app } from "electron";
import type IWindow from "../types/IWindow";
import type windows from "../classes/Windows";

import entries from "../types/webpackEntries";

class List implements IWindow {
    private createArgs = {
        path: entries.list,
        preload: entries.listPreload,
        width: 1100,
        minWidth: 1100,
        height: 640,
        minHeight: 660
    };

    public async create(wins: typeof windows) {
        const wind = wins.createWindow(this.createArgs);

        wins.list = wind;
        wins.isOpening = true;

        wins.list.once("show", () => {
            if (wins.categories)
                wins.categories.close();

            if (wins.editor)
                wins.editor.close();

            wins.isOpening = false;
        });
        wins.list.once("close", () => {
            if (!wins.isOpening)
                app.quit();
            else
                delete wins.list;
        });

        return wind;
    }
}

export default new List();
