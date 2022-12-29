import ipc from './ipc'

import { IPCChannel } from '#enums'

class WindowResizeService {
  private readonly listeners = new Set<() => void>()

  constructor() {
    ipc.send(IPCChannel.handleWindowResize)
    ipc.on(IPCChannel.windowResize, () => this.listeners.forEach(handler => handler()))
  }

  onResize(listener: () => void) {
    this.listeners.add(listener)
  }

  removeListener(listener: () => void) {
    this.listeners.delete(listener)
  }
}

export default new WindowResizeService()
