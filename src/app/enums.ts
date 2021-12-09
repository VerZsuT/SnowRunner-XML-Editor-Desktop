export enum MenuRole {
    /** Открыть настройки */
    openSettings = 'openSettings',
    /** Сбросить config.json */
    resetConfig = 'resetConfig',
    /** Открыть devTools */
    devTools = 'devTools',
    /** Перезагрузить страницу */
    reload = 'reload',
    /** Закрыть программу */
    quitApp = 'quitApp',
    /** Открыть `path` в проводнике */
    showFolder = 'showFolder',
    /** Аналог <hr> */
    separator = 'separator',
    /** Сохранить бэкап */
    saveBackup = 'saveBackup',
    /** Восстановить intial.pak из бэкапа */
    recoverFromBackup = 'recoverFromBackup',
    /** Объединить .epf файлы */
    joinEPF = 'joinEPF',
    /** Просмотреть содержимое .epf файла */
    seeEPF = 'seeEPF',
    /** Открыть URL в браузере */
    openURL = 'openURL'
}

export enum DialogType {
    open = 'open',
    save = 'save'
}

export enum DialogSourceType {
    file = 'file',
    dir = 'dir'
}

export enum DialogAlertType {
    sync = 'sync',
    async = 'async'
}

/** Тип билда */
export enum BuildType {
    dev = 'dev',
    prod = 'prod'
}

/** Язык перевода программы */
export enum Lang {
    RU = 'RU',
    EN = 'EN',
    DE = 'DE'
}
