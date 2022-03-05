import { ipcRenderer, contextBridge } from 'electron'
import type IPC from './types/IPC'

const ipc: IPC = {
    on: (channel: string, listener: (event: any, message: any) => void) => ipcRenderer.on(channel, listener),
    sendSync: (channel: string, ...args: any[]) => ipcRenderer.sendSync(channel, ...args),
}

contextBridge.exposeInMainWorld('ipc', ipc)
global['ipc'] = ipc
