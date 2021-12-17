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

interface SetupPreload {
    /**
     * Обработчик ошибок.
    */
    errorHandler(text: string): void

    existsSync(path: string): boolean
    join(...args: string[]): string
    readFileSync(path: string): string

    /**
     * Открывает выбор папки с игрой для поиска initial.pak.
    */
    get gameFolder(): Folder

    /**
     * Открывает выбор initial.pak.
    */
    get initial(): Folder
}

interface Window {
    setupPreload: SetupPreload
}

declare const setupPreload: SetupPreload
