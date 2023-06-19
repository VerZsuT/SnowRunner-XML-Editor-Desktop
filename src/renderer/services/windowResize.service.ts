import IPC from './ipc.service'

import { IPCChannel } from '#g/enums'

export default class WindowResize {
  private static readonly listeners = new Set<() => void>()

  static onResize(listener: () => void) {
    this.listeners.add(listener)
  }

  static removeListener(listener: () => void) {
    this.listeners.delete(listener)
  }

  static {
    IPC.send(IPCChannel.handleWindowSize)
    IPC.on(IPCChannel.windowResize, () => this.listeners.forEach(handler => handler()))
  }
}
