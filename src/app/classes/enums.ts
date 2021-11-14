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

export enum BuildType {
    dev = 'dev',
    prod = 'prod'
}
