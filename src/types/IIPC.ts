export default interface IIPC {
  on(channel: string, listener: (event: any, message: any) => void): void
  once: IIPC['on']
  sendSync<T = any>(channel: string, ...args: any[]): T
  send(channel: string, ...args: any[]): void
  remove(channel: string, listener: (event: any, message: any) => void): void
  removeAll(channel: string): void
}
