interface IPC {
    on(channel: string, listener: (event: any, message: any) => void): void;
    sendSync(channel: string, ...args: any[]): any;
    send(channel: string, ...args: any[]): any;
    removeAll(channel: string): void;
}

export default IPC;
