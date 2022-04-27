import type { BrowserWindow } from "electron";
import type windows from "../classes/Windows";

interface IWindow {
    create(wins: typeof windows, ...args: any[]): Promise<BrowserWindow>
}

export default IWindow;
