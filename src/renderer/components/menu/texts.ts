import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  /** Текст кнопки открытия */
  openButton: new Localization()
    .ru('Открыть')
    .en('Open')
    .de('Öffnen')
    .ch('打开'),
  /** Текст кнопки сохранения */
  saveButton: new Localization()
    .ru('Сохранить')
    .en('Save')
    .de('Datei')
    .ch('保存'),
  /** Текст элемента `Сброить` */
  resetMenuItemLabel: new Localization()
    .ru('Сбросить')
    .en('Reset')
    .de('Zurücksetzen')
    .ch('重置'),
  /** Текст элемента `Выход` */
  exitMenuItemLabel: new Localization()
    .ru('Выход')
    .en('Exit')
    .de('Exit')
    .ch('退出'),
  /** Заголовок меню `Настройки` */
  settingsMenuLabel: new Localization()
    .ru('Настройки')
    .en('Settings')
    .de('Einstellungen')
    .ch('设置'),
  /** Текст элемента `Удалить программу` */
  uninstallMenuItemLabel: new Localization()
    .ru('Удалить программу')
    .en('Uninstall the program')
    .de('Programm deinstallieren')
    .ch('卸载程序'),
  /** Текст элемента `Восстановить` */
  restoreMenuItemLabel: new Localization()
    .ru('Восстановить')
    .en('Restore')
    .de('Standard Wiederherstellen')
    .ch('还原'),
  /** Заголовок меню `Бэкап` */
  backupMenuLabel: new Localization()
    .ru('Бэкап')
    .en('Backup')
    .de('Sicherung')
    .ch('备份'),
  /** Заголовок меню `Файл` */
  fileMenuLabel: new Localization()
    .ru('Файл')
    .en('File')
    .de('Datei')
    .ch('文件'),
  /** Заголовок меню `Помощь` */
  helpMenuLabel: new Localization()
    .ru('Помощь')
    .en('Help')
    .de('Hilfe')
    .ch('帮助'),
  /** Заголовок меню `Как пользоваться` */
  howToUseTitle: new Localization()
    .ru('Как пользоваться')
    .en('How to use')
    .de('Wie benutzt man')
    .ch('如何使用'),
  /** Текст элемента `Версия` */
  versionMenuItemLabel: new Localization()
    .ru('Версия')
    .en('Version')
    .de('Ausführung')
    .ch('版本'),
  /** Текст элемента `GitHub` */
  githubTitle: new Localization()
    .ru('Github')
    .en('Github')
    .de('Github')
    .ch('Github'),
  /** Текст элемента `YouTube` */
  youtubeTitle: new Localization()
    .ru('YouTube(RU)')
    .en('YouTube(RU)')
    .de('YouTube(RU)')
    .ch('YouTube(RU)'),
  donationTitle: new Localization()
    .ru('Поддержать')
    .en('Support')
    .de('Unterstützen')
    .ch('支持')
}).get()
