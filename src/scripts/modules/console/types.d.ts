interface ConsolePreload {
    readFile(path: string): string
    writeFile(path: string, data: string): void
    replacePars(str: string): string
    exists(path: string): boolean
    removeDir(path: string): void
    getModPak(): {
        id: string
        path: string
        name: string
    }
    join(...args: string[]): string
}

type MessageType = 'warn' | 'info' | 'error'

interface ACKeys {
    [cmd: string]: null | AutoCompleteKeys
}

interface ACPresets {
    [name: string]: string | string[]
}

interface Window {
    consolePreload: ConsolePreload
}

declare const consolePreload: ConsolePreload
