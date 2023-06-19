import { ipcRenderer } from 'electron'
import { existsSync, lstatSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import { provideFromMain } from 'emr-bridge/preload'

import { IPC, System } from '#r/services/interprocess'

class _RootPreload {
  private static addIPC(): void {
    IPC.register({
      sendSync<T = any>(channel: string, ...args: any[]): T {
        return <T>ipcRenderer.sendSync(channel, ...args)
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
      remove(channel: string, listener: (event: any, message: any) => void): void {
        ipcRenderer.removeListener(channel, listener)
      },
      removeAll(channel: string): void {
        ipcRenderer.removeAllListeners(channel)
      }
    })
  }

  private static addSystem(): void {
    System.register({
      readFileSync(path: string): string {
        return readFileSync(path).toString()
      },
      isDirectory(path: string): boolean {
        return lstatSync(path).isDirectory()
      },
      rmdirSync(path: string): void {
        rmSync(path, { recursive: true, force: true })
      },
      writeFileSync,
      readdirSync,
      existsSync,
      basename,
      join
    })
  }

  static {
    provideFromMain(false)
    this.addIPC()
    this.addSystem()
  }
}
