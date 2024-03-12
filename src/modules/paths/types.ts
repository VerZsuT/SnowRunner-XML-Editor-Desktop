export interface IPaths {
  /** URL json файла обновления */
  publicInfo: string
  /** URL страницы скачивания программы */
  downloadPage: string
  /** URL релизов программы */
  update: string,

  /** Папка `app` */
  root: string
  /** Папка с страницами */
  pages: string
  /** Иконка программы */
  icon: string
  /** Папка `WinRAR` */
  winrar: string
  /** Деинсталлятор */
  uninstall: string

  /** Файл конфигурации программы */
  config: string
  /** Объект изменений в файлах игры */
  edited: string
  /** Объект избранного */
  favorites: string
  /** Объект добавленных модов */
  mods: string
  /** Объект вычисленных размеров */
  sizes: string
  /** Файл с переводами игры */
  texts: string
  /** Объект экспортированных параметров */
  exported: string

  /** Папка с бэкапами */
  backupFolder: string
  /** Бэкап `initial.pak` */
  backupInitial: string
  /** Бэкап данных `initail.pak` перед распаковкой */
  backupInitialData: string

  /** Временная папка для основных файлов */
  mainTemp: string
  /** Временная папка для файлов модификаций */
  modsTemp: string
  /** Временная папка для файлов обновления */
  updateTemp: string
  /** Временная папка `[strings]` */
  strings: string
  /** Временная папка `_dlc` */
  dlc: string
  /** Временная папка `_templates` */
  templates: string
  /** Временная папка `classes` */
  classes: string
}
