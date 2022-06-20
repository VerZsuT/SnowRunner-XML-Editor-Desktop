import type { BrowserWindow } from "electron";

import type Window from "enums/Window";

interface ICreateWindowAttributes {
    path: string;
    width?: number;
    minWidth?: number;
    height?: number;
    minHeight?: number;
    resizable?: boolean;
    show?: boolean;
    parent?: BrowserWindow;
    modal?: boolean;
    frame?: boolean;
    preload?: string;
    window: Window;
}

export default ICreateWindowAttributes;
