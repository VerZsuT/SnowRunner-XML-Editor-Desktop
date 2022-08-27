import {ipcRenderer} from 'electron'

import type {IPC} from 'types'

window.ipc = <IPC>{
    sendSync: (channel, ...args) => ipcRenderer.sendSync(channel, ...args),
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
    removeAll: channel => ipcRenderer.removeAllListeners(channel)
}
