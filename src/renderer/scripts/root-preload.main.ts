import { ipcRenderer } from 'electron'
import { existsSync, lstatSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import { provideFromMain } from 'emr-bridge/preload'

import ipc from '#services/ipc'
import system from '#services/system'

provideFromMain(false)

class RootPreload {
  constructor() {
    this.addIPC()
    this.addSystem()
  }

  private addIPC(): void {
    ipc.register({
      sendSync<T = any>(channel: string, ...args: any[]): T {
        return <T> ipcRenderer.sendSync(channel, ...args)
      },
      send(channel: string, ...args: any[]): void {
        ipcRenderer.send(channel, ...args)
      },
      on(channel: string, listener: (event: any, message: any) => void): void {
        ipcRenderer.on(channel, listener)
      },
      once(channel: string, listener: (event: any, message: any) => void): void {
        ipcRenderer.once(channel, listener)
      },
      removeAll(channel: string): void {
        ipcRenderer.removeAllListeners(channel)
      }
    })
  }

  private addSystem(): void {
    system.register({
      readFileSync(path: string): string {
        return readFileSync(path).toString()
      },
      isDirectory(path: string): boolean {
        return lstatSync(path).isDirectory()
      },
      writeFileSync,
      readdirSync,
      existsSync,
      basename,
      join
    })
  }
}

new RootPreload()
