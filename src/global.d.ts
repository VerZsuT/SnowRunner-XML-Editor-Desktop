interface Window {
  preloads?: {
    [name in import('#g/enums').PreloadType]?: any
  }
  ipc?: import('#g/types').IIPC
  service?: import('#g/types').IServiceMethods

  ipcErrorHandler?(error: string, channel: string): void
  handleErrorMessage?(message: string): void
}

declare module '*.png' {
  const value: string
  export default value
}
