import type { IIPC } from '#g/types'

class IPC {
  static register(value: IIPC): void {
    window.ipc = value
    this.init()
  }

  private static init(): void {
    const ipc = window.ipc
    for (const methodName in ipc) {
      this[methodName] = ipc[methodName]
    }
  }

  static {
    this.init()
  }
}

export default IPC as typeof IPC & IIPC
