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

interface FirstStepsPreload {
    /**
     * Обработчик ошибок.
    */
    errorHandler(text: string): void

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
    firstStepsPreload: FirstStepsPreload
}

declare const firstStepsPreload: FirstStepsPreload
