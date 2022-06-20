import { BrowserWindow, ipcMain } from "electron";

import type ICreateWindowAttributes from "types/ICreateWindowAttributes";
import type IWindowSize from "types/IWindowBounds";
import type IWindows from "types/IWindows";

import paths from "./paths";
import { publicFunction } from "./renderChannel";
import { Stack } from "./service";
import settings from "./settings";

export const wins: IWindows = {
    loading: null
};

const stack = new Stack<BrowserWindow>();

publicFunction("setWindowSize", setWindowSize);

/** Установить размер окна */
export function setWindowSize(size: IWindowSize) {
    const {
        height = 500,
        width = 500,
        minHeight = 0,
        minWidth = 0
    } = size;
    const current = stack.peek();

    current.setMinimumSize(minWidth, minHeight);
    current.setSize(width, height);
    current.center();
}

/** Открыть модальное окно */
export function openModal(args: ICreateWindowAttributes): BrowserWindow {
    return createWindow({
        ...args,
        modal: true,
        parent: BrowserWindow.getFocusedWindow()
    });
}

/** Создать окно с указанными атрибутами */
export function createWindow(args: ICreateWindowAttributes): BrowserWindow {
    const {
        width = 800,
        height = 600,
        minWidth = 0,
        minHeight = 0,
        resizable = true,
        show = false,
        modal = false,
        frame = true,
        parent, preload, window
    } = args;
    const { icon } = paths;

    const wind = new BrowserWindow({
        width,
        minWidth,
        height,
        minHeight,
        resizable,
        show,
        parent,
        modal,
        frame,
        icon,
        paintWhenInitiallyHidden: false,
        webPreferences: {
            preload,
            devTools: process.env.NODE_ENV !== "production",
            contextIsolation: false
        }
    });
    stack.push(wind);
    wind.setMenuBarVisibility(false);
    wind.removeMenu();

    ipcMain.once(`window-${window}-ready`, () => {
        if (wind && !wind.isDestroyed()) {
            wind.show();
            wind.focus();

            if (settings.devTools)
                wind.webContents.toggleDevTools();
        }
    });
    wind.once("close", () => {
        stack.pop();
    });
    wind.loadURL(args.path)
        .catch(error => {
            console.error(error);
        });
    return wind;
}
