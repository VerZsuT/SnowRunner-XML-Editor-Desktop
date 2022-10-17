import type { IServiceMethods } from '#types'

class SystemService {
  constructor() {
    this.init()
  }

  register(value: IServiceMethods): void {
    window.service = value
    this.init()
  }

  private init(): void {
    const system = window.service
    for (const methodName in system) {
      this[methodName] = system[methodName]
    }
  }
}

export const system = new SystemService() as SystemService & IServiceMethods
