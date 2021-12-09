interface IPaths {
    publicInfo: string
    downloadPage: string
    updateFiles: string
    updateMap: string
    root: string
    config: string
    backupFolder: string
    icon: string
    backupInitial: string
    translations: string
    winrar_x32: string
    winrar_x64: string
    mainTemp: string
    modsTemp: string
    strings: string
    dlc: string
    classes: string
}

type DialogType = 'open' | 'save'
type DialogSourceType = 'file' | 'dir'
type DialogAlertType = 'sync' | 'async'
type DialogProperties = ('openFile' | 'openDirectory' | 'multiSelections')[]

interface OpenDialogParams {
    type?: DialogType
    source?: DialogSourceType
    extention?: string
    defaultPath?: string
    properties?: DialogProperties
}

interface DialogAlertParams {
    title: string
    message: string
    dialogType?: DialogAlertType
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
