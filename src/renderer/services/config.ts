import { Bridge } from 'emr-bridge/renderer'

import type { IConfig, IMPC } from '#types'

class ConfigService {
  private readonly bridge = Bridge.as<IMPC>()
  private readonly config = { ...this.bridge.config }

  constructor() {
    this.defineObject(this.config, this)
  }

  private defineObject(obj: any, to: any): void {
    for (const key in obj) {
      const value = obj[key]
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
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
    this.bridge.config = this.config
  }
}

export const config = new ConfigService() as unknown as IConfig
