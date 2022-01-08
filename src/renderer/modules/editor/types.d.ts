interface IEditorPreload {
    existsSync(path: string): boolean
    findFromDLC(fileName: string, type: string): string
    join(...args: string[]): string
    saveFile(path: string, data: string): void
    basename(str: string, ext?: string): string
    readFile(path: string): Buffer
    getAddons(truckName: string, modId?: string, filter?: (fileDOM: Document) => boolean): {
        name: string
        path: string
    }[]
}

interface IIEParam {
    id: string
    forExport(): {
        selector: string
        name: string
        value: string | number
        fileName: string
    }
    forImport: {
        setValue(value: string): any
        name: string
        selector: string
        fileName: string
    }
}

interface Window {
    editorPreload: IEditorPreload
}
