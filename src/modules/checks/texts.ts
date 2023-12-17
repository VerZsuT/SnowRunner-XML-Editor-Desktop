import { Lang } from '/mods/data/config/enums'

export default {
  adminRequiredMessage: {
    [Lang.ru]: 'Ошибка запуска. Программа должна быть запущена от имени администратора.',
    [Lang.en]: 'Startup error. The program must be run as an administrator.',
    [Lang.de]: 'Startfehler. Das Programm muss als administrator ausgeführt.',
    [Lang.ch]: '启动错误。该程序必须以管理员身份启动。'
  },
  allowNewVersion: {
    [Lang.ru]: 'Доступна новая версия программы.',
    [Lang.en]: 'A new version of the program is available.',
    [Lang.de]: 'Eine neue Version des Programms ist verfügbar.',
    [Lang.ch]: '新版本的软件已经问世。'
  },
  initialNotFound: {
    [Lang.ru]: 'initial.pak не найден.',
    [Lang.en]: 'initial.pak not found',
    [Lang.de]: 'initial.pak nicht gefunden',
    [Lang.ch]: '没有找到initial.pak。'
  },
  classesNotFound: {
    [Lang.ru]: 'Папка classes не найдена.',
    [Lang.en]: 'Folder classes not found',
    [Lang.de]: 'Klassen nicht gefunden',
    [Lang.ch]: '没有找到classes文件夹。'
  },
  dlcFolderNotFound: {
    [Lang.ru]: 'Папка с дополнениями не найдена',
    [Lang.en]: 'DLC folder not found',
    [Lang.de]: 'DLC-Ordner nicht gefunden',
    [Lang.ch]: '未找到增编文件夹'
  }
}
