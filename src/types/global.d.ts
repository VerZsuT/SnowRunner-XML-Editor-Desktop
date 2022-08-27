interface Window {
    preload: any
    ipc: import('./IPC').IPC
    service: import('./Service').Service
    ipcErrorHandler?(error: string, channel: string): void
    handleErrorMessage?(message: string): void
}
