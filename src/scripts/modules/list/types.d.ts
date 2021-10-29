type SrcType = 'mods' | 'dlc' | 'main'

type ListType = 'trucks' | 'trailers' | 'cargo'
type FromList = 'dlc' | 'mods'

interface ListPreload {
    exists(path: string): boolean
    removeDir(path: string): void
    getModPak(): {
        id: string
        path: string
        name: string
    }
    join(...args: string[]): string
    getList(listType: ListType, from?: FromList): {
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
