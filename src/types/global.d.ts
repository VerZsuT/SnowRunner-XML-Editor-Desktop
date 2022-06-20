interface Window {
    preload: any;
    service: import("types/IService").default;
    ipc: import("types/IPC").default;
    ipcErrorHandler?(error: string, channel: string): void;
    handleErrorMessage?(message: string): void;
}
