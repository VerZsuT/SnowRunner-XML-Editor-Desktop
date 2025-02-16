import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  /** Текст кнопки открытия. */
  openButton: new BaseLocalization()
    .ru('Открыть')
    .en('Open')
    .de('Öffnen')
    .ch('打开'),

  savingMessage: new BaseLocalization()
    .ru('Сохранение...')
    .en('Saving...')
    .de('Speichern...')
    .ch('保存中'),

  successSaveFiles: new BaseLocalization()
    .ru('Сохранено')
    .en('Saved')
    .de('Gespeichert')
    .ch('保存成功'),

  /** Текст кнопки сохранения. */
  saveButton: new BaseLocalization()
    .ru('Сохранить')
    .en('Save')
    .de('Datei')
    .ch('保存'),

  /** Текст элемента `Сбросить`. */
  resetMenuItemLabel: new BaseLocalization()
    .ru('Сбросить')
    .en('Reset')
    .de('Zurücksetzen')
    .ch('重置'),

  /** Текст элемента `Открыть файлы`. */
  openFilesFolderItemLabel: new BaseLocalization()
    .ru('Открыть файлы')
    .en('Open Files')
    .de('Dateien öffnen')
    .ch('打开文件'),

  /** Текст элемента `Обновить архив`. */
  saveFilesItemLabel: new BaseLocalization()
    .ru('Обновить архив')
    .en('Update archive')
    .de('Archiv aktualisieren')
    .ch('更新存档'),

  /** Текст элемента `Распаковать архив`. */
  unpackFilesItemLabel: new BaseLocalization()
    .ru('Распаковать архив')
    .en('Unpack archive')
    .de('Entpacken Sie das Archiv')
    .ch('解压缩档案'),

  /** Текст элемента `Выход`. */
  exitMenuItemLabel: new BaseLocalization()
    .ru('Выход')
    .en('Exit')
    .de('Exit')
    .ch('退出'),

  /** Заголовок меню `Настройки`. */
  settingsMenuLabel: new BaseLocalization()
    .ru('Настройки')
    .en('Settings')
    .de('Einstellungen')
    .ch('设置'),

  /** Текст элемента `Удалить программу`. */
  uninstallMenuItemLabel: new BaseLocalization()
    .ru('Удалить программу')
    .en('Uninstall the program')
    .de('Programm deinstallieren')
    .ch('卸载程序'),

  /** Текст элемента `Восстановить`. */
  restoreMenuItemLabel: new BaseLocalization()
    .ru('Восстановить')
    .en('Restore')
    .de('Standard Wiederherstellen')
    .ch('还原'),

  /** Заголовок меню `Бэкап`. */
  backupMenuLabel: new BaseLocalization()
    .ru('Бэкап')
    .en('Backup')
    .de('Sicherung')
    .ch('备份'),

  /** Заголовок меню `Файл`. */
  fileMenuLabel: new BaseLocalization()
    .ru('Файл')
    .en('File')
    .de('Datei')
    .ch('文件'),

  /** Заголовок меню `Помощь`. */
  helpMenuLabel: new BaseLocalization()
    .ru('Помощь')
    .en('Help')
    .de('Hilfe')
    .ch('帮助'),

  /** Заголовок меню `Как пользоваться`. */
  howToUseTitle: new BaseLocalization()
    .ru('Как пользоваться')
    .en('How to use')
    .de('Wie benutzt man')
    .ch('如何使用'),

  /** Текст элемента `Версия`. */
  versionMenuItemLabel: new BaseLocalization()
    .ru('Версия')
    .en('Version')
    .de('Ausführung')
    .ch('版本'),

  /** Текст элемента `GitHub`. */
  githubTitle: new BaseLocalization()
    .ru('Github')
    .en('Github')
    .de('Github')
    .ch('Github'),

  /** Текст элемента `YouTube`. */
  youtubeTitle: new BaseLocalization()
    .ru('YouTube(RU)')
    .en('YouTube(RU)')
    .de('YouTube(RU)')
    .ch('YouTube(RU)'),
    
  donationTitle: new BaseLocalization()
    .ru('Поддержать')
    .en('Support')
    .de('Unterstützen')
    .ch('支持')
}).loadRenderer()
