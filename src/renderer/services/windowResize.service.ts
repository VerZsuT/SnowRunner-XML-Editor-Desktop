import ipc from './ipc.service'

import { IPCChannel } from '#g/enums'

class WindowResizeService {
  private readonly listeners = new Set<() => void>()

  constructor() {
    ipc.send(IPCChannel.handleWindowSize)
    ipc.on(IPCChannel.windowResize, () => this.listeners.forEach(handler => handler()))
  }

  onResize(listener: () => void) {
    this.listeners.add(listener)
  }

  removeListener(listener: () => void) {
    this.listeners.delete(listener)
  }
}

const windowResize = new WindowResizeService()

export default windowResize
