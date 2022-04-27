import { BrowserWindow, ipcMain } from "electron";
import type ICreateWindowAttributes from "../types/ICreateWindowAttributes";
import type IDownloadWindow from "../types/IDownloadWindow";

import { paths } from "../service";
import { settings } from "./Settings";
import { linkWithRenderAs } from "../renderChannel";
import HasLinked from "../types/HasLinked";
import * as windows from "../windows";

/** Отвечает за взаимодействие с окнами. */
class Windows extends HasLinked {
    public categories: BrowserWindow;
    public list: BrowserWindow;
    public editor: BrowserWindow;
    public loading: IDownloadWindow;

    public isOpening = false;

    @linkWithRenderAs("openWindow")
    public open(name: keyof typeof windows, ...args: any[]) {
        return windows[name].create(this, args);
    }

    public createModal(args: ICreateWindowAttributes): BrowserWindow {
        return this.createWindow({
            ...args,
            modal: true,
            parent: BrowserWindow.getFocusedWindow()
        });
    }

    /** Создать окно с указанными атрибутами. */
    public createWindow(args: ICreateWindowAttributes): BrowserWindow {
        const wind = new BrowserWindow({
            width: args.width ?? 800,
            minWidth: args.minWidth ?? 0,
            height: args.height ?? 600,
            minHeight: args.minHeight ?? 0,
            resizable: args.resizable ?? true,
            icon: paths.icon,
            show: args.show ?? false,
            parent: args.parent ?? null,
            modal: args.modal ?? false,
            frame: !(args.frame === false),
            paintWhenInitiallyHidden: false,
            webPreferences: {
                ...(() => (args.preload ? { preload: args.preload } : {}))(),
                devTools: process.env.NODE_ENV === "production" ? false : true
            }
        });

        ipcMain.once("window-ready", () => {
            if (wind && !wind.isDestroyed()) {
                wind.show();
                wind.focus();
                if (settings.devTools)
                    wind.webContents.toggleDevTools();
            }
        });
        wind.setMenu(null);
        wind.loadURL(args.path).catch(()=>{});
        return wind;
    }
}

export default new Windows();
