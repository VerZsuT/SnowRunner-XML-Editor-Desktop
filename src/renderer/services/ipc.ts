import type { IIPC } from '#types'

class IPCService {
  constructor() {
    this.init()
  }

  register(value: IIPC): void {
    window.ipc = value
    this.init()
  }

  private init(): void {
    const ipc = window.ipc
    for (const methodName in ipc) {
      this[methodName] = ipc[methodName]
    }
  }
}

export default new IPCService() as IPCService & IIPC
