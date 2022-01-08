interface Paths {
    publicInfo: string
    downloadPage: string
    updateFiles: string
    updateMap: string
    root: string
    config: string
    backupFolder: string
    icon: string
    texts: string
    backupInitial: string
    winrar_x32: string
    mainTemp: string
    modsTemp: string
    strings: string
    dlc: string
    classes: string
    uninstall: string
}

type DialogProperties = ('openFile' | 'openDirectory' | 'multiSelections')[]

interface OpenDialogParams {
    type?: import('../enums').DialogType
    source?: import('../enums').DialogSourceType
    extention?: string
    defaultPath?: string
    properties?: DialogProperties
}

interface DialogAlertParams {
    title: string
    message: string
    dialogType?: import('../enums').DialogAlertType
    type?: string
    noLink?: boolean
    buttons?: string[]
}

interface DialogParams {
    properties?: DialogProperties
    filters?: {
        name: string
        extensions: string[]
    }[]
}
