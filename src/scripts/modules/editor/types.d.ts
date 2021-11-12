interface EditorPreload {
    existsSync(path: string): boolean
    findFromDLC(fileNmae: string, type: string): string
    join(...args: string[]): string
    paths: IPaths
    saveFile(path: string, data: string): void
    basename(str: string, ext?: string): string
    readFile(path: string): Buffer
}

interface Window {
    editorPreload: EditorPreload
}

declare const editorPreload: EditorPreload
