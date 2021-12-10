interface Item {
    dlcName?: string
    modId?: string
    id?: string
    name?: string
    path?: string
    items?: FindItem[]
}

interface FindItem {
    name: string
    path: string
}

interface ListPreload {
    exists(path: string): boolean
    removeDir(path: string): void
    getModPak(): {
        id: string
        path: string
        name: string
    }
    join(...args: string[]): string
    getList(listType: import('./enums').ListType, from?: import('./enums').FromList): Item[]
}

interface Window {
    listPreload: ListPreload
}

declare const listPreload: ListPreload
