import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default createTextsLoader({
  /** Ошибка прав доступа. */
  adminRequiredMessage: new BaseLocalization()
    .ru('Ошибка запуска. Программа должна быть запущена от имени администратора.')
    .en('Startup error. The program must be run as an administrator.')
    .de('Startfehler. Das Programm muss als administrator ausgeführt.')
    .ch('启动错误。该程序必须以管理员身份启动。'),

  /** Доступна новая версия. */
  allowNewVersion: new BaseLocalization()
    .ru('Доступна новая версия программы.')
    .en('A new version of the program is available.')
    .de('Eine neue Version des Programms ist verfügbar.')
    .ch('新版本的软件已经问世。'),

  /** Не найден `initial.pak`. */
  initialNotFound: new BaseLocalization()
    .ru('initial.pak не найден.')
    .en('initial.pak not found')
    .de('initial.pak nicht gefunden')
    .ch('没有找到initial.pak。'),

  /** Не найдена папка `classes`. */
  classesNotFound: new BaseLocalization()
    .ru('Папка classes не найдена.')
    .en('Folder classes not found')
    .de('Klassen nicht gefunden')
    .ch('没有找到classes文件夹。'),

  /** Не найдена папка `_dlc`. */
  dlcFolderNotFound: new BaseLocalization()
    .ru('Папка с дополнениями не найдена')
    .en('DLC folder not found')
    .de('DLC-Ordner nicht gefunden')
    .ch('未找到增编文件夹')
})
