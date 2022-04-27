import { ipcRenderer, contextBridge } from "electron";
import type IPC from "./types/IPC";

const ipc: IPC = {
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    sendSync: (channel, ...args) => ipcRenderer.sendSync(channel, ...args),
};

contextBridge.exposeInMainWorld("ipc", ipc);
global["ipc"] = ipc;
