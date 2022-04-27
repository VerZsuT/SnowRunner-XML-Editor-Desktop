import type windows from "../classes/Windows";
import type IWindow from "../types/IWindow";
import type IDownloadWindow from "../types/IDownloadWindow";

import entries from "../types/webpackEntries";

class Loading implements IWindow {
    private createArgs = {
        path: entries.loading,
        preload: entries.loadingPreload,
        width: 280,
        minWidth: 280,
        height: 130,
        minHeight: 150,
        frame: false
    };
    
    public async create(wins: typeof windows) {
        const loading = <IDownloadWindow>wins.createWindow(this.createArgs);

        loading.setText = (text: string) => wins.loading.webContents.postMessage("fileName", text);
        loading.setCount = (count: number) => wins.loading.webContents.postMessage("count", count);
        loading.setPercent = (percent: string | number) => wins.loading.webContents.postMessage("percent", percent);
        loading.success = () => wins.loading.webContents.postMessage("success", true);
        loading.download = () => wins.loading.webContents.postMessage("download", true);

        return wins.loading = loading;
    }
}

export default new Loading();
