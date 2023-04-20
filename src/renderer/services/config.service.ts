import ipc from './ipc.service'

import { IPCChannel } from '#g/enums'
import { isNonNullable, isObject } from '#g/helpers'
import type { IConfig } from '#g/types'
import bridge from '#r/scripts/bridge'

class ConfigService {
  private readonly changeHandlers = new Set<() => void>()
  private readonly config = { ...bridge.config }

  constructor() {
    this.defineObject(this.config, this)
    ipc.on(IPCChannel.changeConfig, this.onChangeConfig)
  }

  addChangeHandler = (handler: () => void): void => {
    this.changeHandlers.add(handler)
  }

  removeChangeHandler = (handler: () => void): void => {
    this.changeHandlers.delete(handler)
  }

  private defineObject(obj: any, to: any): void {
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

  private define(from: any, to: any, key: string): void {
    Object.defineProperty(to, key, {
      get: () => from[key],
      set: value => this.changeConfig(() => from[key] = value),
      configurable: true,
      enumerable: true
    })
  }

  private changeConfig(callback: () => void): void {
    callback()
    bridge.config = this.config
  }

  private onChangeConfig = () => {
    Object.assign(this.config, bridge.config)
    this.changeHandlers.forEach(handler => handler())
  }
}

const config = new ConfigService() as ConfigService & IConfig

export default config
