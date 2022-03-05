interface IConsolePreload {
    replacePars(str: string): string
    removeDir(path: string): void
    getModPak(): {
        id: string
        path: string
        name: string
    }
}

export default IConsolePreload
