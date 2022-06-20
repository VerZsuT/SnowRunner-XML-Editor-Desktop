import Window from "enums/Window";
import type ICreateWindowAttributes from "types/ICreateWindowAttributes";
import type IDownloadWindow from "types/IDownloadWindow";

import entries from "../scripts/webpackEntries";
import { createWindow, wins } from "../scripts/windows";

const createArgs: ICreateWindowAttributes = {
    path: entries.loading,
    preload: entries.loadingPreload,
    width: 280,
    minWidth: 280,
    height: 130,
    minHeight: 150,
    frame: false,
    window: Window.Loading
};

export default async () => {
    const loading = <IDownloadWindow>createWindow(createArgs);

    function postMessage(channel: string, arg: any) {
        wins.loading.webContents.postMessage(channel, arg);
    }

    loading.setText = (text: string) => postMessage("fileName", text);
    loading.setCount = (count: number) => postMessage("count", count);
    loading.setPercent = (percent: string | number) => postMessage("percent", percent);
    loading.success = () => postMessage("success", true);
    loading.download = () => postMessage("download", true);
    loading.showAndWait = () => {
        return new Promise<void>(resolve => {
            loading.show();
            setTimeout(resolve, 100);
        });
    };

    return wins.loading = loading;
};
