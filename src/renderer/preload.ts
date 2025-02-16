import { ipcRenderer } from 'electron'
import { provideFromMain } from 'emr-bridge/cjs/preload'
import '/mods/files/preload'

ipcRenderer.setMaxListeners(Number.POSITIVE_INFINITY)
provideFromMain(false)
