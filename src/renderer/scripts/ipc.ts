import { ipcRenderer } from "electron";

import type IPC from "types/IPC";

const ipc: IPC = {
    sendSync: (channel, ...args) => ipcRenderer.sendSync(channel, ...args),
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener)
};

window.ipc = ipc;
