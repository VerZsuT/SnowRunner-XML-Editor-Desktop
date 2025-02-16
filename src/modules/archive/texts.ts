import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Тексты архиватора. */
export default createTextsLoader({
  /** Ошибка сохранения мода. */
  saveModError: new BaseLocalization()
    .ru('Не удалось сохранить файлы модификации. Нет доступа к записи файла.')
    .en('The modification files could not be saved. There is no write access to the file.')
    .de('Die Änderungsdateien konnten nicht gespeichert werden. Sie haben keinen Zugriff auf das Schreiben der Datei.')
    .ch('修改文件无法保存。没有写入文件的权限。'),

  /** Ошибка сохранения `initial.pak`. */
  saveOriginalError: new BaseLocalization()
    .ru('Не удалось обновить файлы в initial.pak. Нет доступа к записи')
    .en('Failed to update files in initial. pak. There is no access to the record')
    .de('Die Dateien in initial konnten nicht aktualisiert werden.pak. Kein Zugriff auf den Datensatz')
    .ch('更新initial.pak中的文件失败。没有写入权限'),

  /** Распаковка. */
  unpacking: new BaseLocalization()
    .ru('Распаковка')
    .en('Unpacking')
    .de('Auspacken')
    .ch('打开包装')
})
