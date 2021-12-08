interface IFolder {
    /**
     * Путь к папке с initial.pak
    */
    folder?: string

    /**
     * Путь к initial.pak
    */
    initial: string
}

interface IFirstStepsPreload {
    /**
     * Обработчик ошибок.
    */
    errorHandler(text: string): void

    existsSync(path: string): boolean
    join(...args: string[]): string

    /**
     * Открывает выбор папки с игрой для поиска initial.pak.
    */
    get gameFolder(): IFolder

    /**
     * Открывает выбор initial.pak.
    */
    get initial(): IFolder
}

interface Window {
    setupPreload: IFirstStepsPreload
}

declare const setupPreload: IFirstStepsPreload
