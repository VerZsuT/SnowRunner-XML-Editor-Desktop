interface Folder {
    /**
     * Путь к папке с initial.pak
    */
    folder?: string

    /**
     * Путь к initial.pak
    */
    initial: string
}

interface ISetupPreload {
    /**
     * Обработчик ошибок.
    */
    errorHandler(text: string): void

    existsSync(path: string): boolean
    join(...args: string[]): string
    readFileSync(path: string): Buffer

    /**
     * Открывает выбор папки с игрой для поиска initial.pak.
    */
    getGameFolder(): Folder

    /**
     * Открывает выбор initial.pak.
    */
    getInitial(): Folder
}

interface Window {
    setupPreload: ISetupPreload
}
