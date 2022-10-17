interface Window {
  preloads?: {
    [type in import('#enums').PreloadType]?: any
  }
  ipc?: import('#types').IIPC
  service?: import('#types').IServiceMethods

  ipcErrorHandler?(error: string, channel: string): void

  handleErrorMessage?(message: string): void
}

module '*.png' {
  const value: string
  export default value
}
