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

interface IListPreload {
    exists(path: string): boolean
    removeDir(path: string): void
    getModPak(): {
        id: string
        path: string
        name: string
    }
    findMods(): {
        name: string
        path: string
    }[]
    basename(p: string, ext?: string): string
    join(...args: string[]): string
    getList(listType: import('./enums').ListType, from?: import('./enums').SrcType): Item[]
}

interface Window {
    listPreload: IListPreload
}

