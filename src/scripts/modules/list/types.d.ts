interface ListPreload {
    exists(path: string): boolean
    removeDir(path: string): void
    getModPak(): {
        id: string
        path: string
        name: string
    }
    join(...args: string[]): string
    getList(listType: import('./enums').ListType, from?: import('./enums').FromList): {
        dlcName?: string
        id?: string
        name?: string
        items?: {name: string, path: string}[]
    }[]
}

interface Window {
    listPreload: ListPreload
}

declare const listPreload: ListPreload
