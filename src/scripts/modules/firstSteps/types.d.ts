interface Folder {
    folder?: string
    initial?: string
}

interface FirstStepsPreload {
    errorHandler(text: string): void
    get gameFolder(): Folder
    get initial(): Folder
}

interface Window {
    firstStepsPreload: FirstStepsPreload
}

declare const firstStepsPreload: FirstStepsPreload
