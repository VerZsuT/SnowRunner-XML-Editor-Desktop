import { isNonNullable, isObject } from '#gl-helpers'
import bridge from '#r-scripts/bridge'
import type { IConfig } from '#types'

class ConfigService {
  private readonly config = { ...bridge.config }

  constructor() {
    this.defineObject(this.config, this)
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
}

export default new ConfigService() as unknown as IConfig
