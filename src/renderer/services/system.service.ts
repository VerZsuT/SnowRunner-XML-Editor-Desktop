import type { IServiceMethods } from '#g/types'

class System {
  static register(value: IServiceMethods): void {
    window.service = value
    this.init()
  }

  private static init(): void {
    const system = window.service
    for (const methodName in system) {
      this[methodName] = system[methodName]
    }
  }

  static {
    this.init()
  }
}

export default System as typeof System & IServiceMethods
