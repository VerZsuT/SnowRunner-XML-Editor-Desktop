import { Lang } from '/mods/data/config/enums'

export default {
  saveModError: {
    [Lang.ru]: 'Не удалось сохранить файлы модификации. Нет доступа к записи файла.',
    [Lang.en]: 'The modification files could not be saved. There is no write access to the file.',
    [Lang.de]: 'Die Änderungsdateien konnten nicht gespeichert werden. Sie haben keinen Zugriff auf das Schreiben der Datei.',
    [Lang.ch]: '修改文件无法保存。没有写入文件的权限。'
  },
  saveOriginalError: {
    [Lang.ru]: 'Не удалось обновить файлы в initial.pak. Нет доступа к записи',
    [Lang.en]: 'Failed to update files in initial. pak. There is no access to the record',
    [Lang.de]: 'Die Dateien in initial konnten nicht aktualisiert werden.pak. Kein Zugriff auf den Datensatz',
    [Lang.ch]: '更新initial.pak中的文件失败。没有写入权限'
  },
  unpacking: {
    [Lang.ru]: 'Распаковка',
    [Lang.en]: 'Unpacking',
    [Lang.de]: 'Auspacken',
    [Lang.ch]: '打开包装'
  }
}
