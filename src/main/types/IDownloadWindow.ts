import type { BrowserWindow } from "electron";

interface IDownloadWindow extends BrowserWindow {
    setText(text: string): void
    setCount(count: number): void
    setPercent(percent: number | string): void
    success(): void
    download(): void
}

export default IDownloadWindow;
