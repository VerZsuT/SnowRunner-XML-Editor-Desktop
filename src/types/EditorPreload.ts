export interface EditorPreload {
    watchFile(filePath: string, callback: ()=>void): void;
    findFromDLC(fileName: string, type: string): string;
}
