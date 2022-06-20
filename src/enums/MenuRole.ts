enum MenuRole {
    /** Открыть настройки */
    openSettings = 1,
    /** Открыть сведения о версии. */
    openWhatsNew,
    /** Сбросить config.json */
    resetConfig,
    /** Открыть devTools */
    devTools,
    /** Перезагрузить страницу */
    reload,
    /** Закрыть программу */
    quitApp,
    /** Открыть `path` в проводнике */
    showFolder,
    /** Аналог <hr> */
    separator,
    /** Сохранить бэкап */
    saveBackup,
    /** Восстановить intial.pak из бэкапа */
    recoverFromBackup,
    /** Объединить .epf файлы */
    joinEPF,
    /** Просмотреть содержимое .epf файла */
    seeEPF,
    /** Открыть URL в браузере */
    openURL,
    /** Запустить деинсталлятор */
    uninstall,
    /** Импортировать конфигурацию */
    importConfig,
    /** Экспортировать конфигурацию */
    exportConfig
}

export default MenuRole;
