interface IConsolePreload {
    readFileSync(path: string): Buffer
    writeFileSync(path: string, data: string): void
    replacePars(str: string): string
    existsSync(path: string): boolean
    removeDir(path: string): void
    getModPak(): {
        id: string
        path: string
        name: string
    }
    join(...args: string[]): string
    basename(path: string, ext?: string): string
}

interface ACKeys {
    [cmd: string]: null | ACKeys
}

interface ACPresets {
    [name: string]: string | string[]
}

interface Window {
    consolePreload: IConsolePreload
}

