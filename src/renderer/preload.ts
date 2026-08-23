import '@modules/files/preload'
import { ipcRenderer } from 'electron'
import { provideFromMain } from 'emr-bridge/cjs/preload'

ipcRenderer.setMaxListeners(Number.POSITIVE_INFINITY)
provideFromMain(false)
