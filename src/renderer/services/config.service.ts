import IPC from './ipc.service'

import { IPCChannel } from '#g/enums'
import type { IConfig } from '#g/types'
import { isNonNullable, isObject } from '#g/utils'
import Bridge from '#r/scripts/bridge'

class Config {
  private static readonly changeHandlers = new Set<() => void>()
  private static readonly config = { ...Bridge.config }

  static addChangeHandler = (handler: () => void): void => {
    this.changeHandlers.add(handler)
  }

  static removeChangeHandler = (handler: () => void): void => {
    this.changeHandlers.delete(handler)
  }

  private static defineObject(obj: any, to: any): void {
    for (const key in obj) {
      const value = obj[key]
      if (isObject(value) && !Array.isArray(value) && isNonNullable(value)) {
        const defined = {}
        this.defineObject(value, defined)
        Object.defineProperty(to, key, {
          get: (): any => defined,
          set: value => this.changeConfig(() => obj[key] = value),
          configurable: true,
          enumerable: true
        })
      }
      else {
        this.define(obj, to, key)
      }
    }
  }

  private static define(from: any, to: any, key: string): void {
    Object.defineProperty(to, key, {
      get: () => from[key],
      set: value => this.changeConfig(() => from[key] = value),
      configurable: true,
      enumerable: true
    })
  }

  private static changeConfig(callback: () => void): void {
    callback()
    Bridge.config = this.config
  }

  private static onChangeConfig = () => {
    Object.assign(this.config, Bridge.config)
    this.changeHandlers.forEach(handler => handler())
  }

  static {
    this.defineObject(this.config, this)
    IPC.on(IPCChannel.changeConfig, this.onChangeConfig)
  }
}

export default Config as typeof Config & IConfig
