interface IEditorPreload {
    watchFile(filePath: string, callback: ()=>void): void
    findFromDLC(fileName: string, type: string): string
}

export default IEditorPreload
