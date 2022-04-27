import { app } from "electron";
import type { BrowserWindow } from "electron";
import type windows from "../classes/Windows";
import type IWindow from "../types/IWindow";

import entries from "../types/webpackEntries";

class Editor implements IWindow {
    private createArgs = {
        path: entries.editor,
        preload: entries.editorPreload,
        width: 780,
        minWidth: 780,
        height: 630,
        minHeight: 650
    };
    
    public async create(wins: typeof windows) {
        let wind: BrowserWindow;

        wins.isOpening = true;
        wins.editor = wind = wins.createWindow(this.createArgs);

        wind.once("show", () => {
            if (wins.list && !wins.list.isDestroyed()) {
                wins.list.close();
                wins.isOpening = false;
            }
        });
        wind.once("close", () => {
            if (!wins.isOpening) {
                app.quit();
            }
            else {
                delete wins.editor;
                wins.isOpening = false;
            }
        });

        return wind;
    }
}

export default new Editor();
