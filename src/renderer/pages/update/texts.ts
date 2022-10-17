import { localization } from '#services'

export const {
  ALLOW_NEW_VERSION_AUTO,
  UPDATE,
  CLOSE,
  IGNORE
} = localization.localize({
  RU: {
    ALLOW_NEW_VERSION_AUTO: 'Доступна новая версия программы',
    IGNORE: 'Игнорировать',
    UPDATE: 'Обновить',
    CLOSE: 'Закрыть'
  },
  EN: {
    ALLOW_NEW_VERSION_AUTO: 'A new version of the program is available',
    IGNORE: 'Ignore',
    CLOSE: 'Close',
    UPDATE: 'Update'
  },
  DE: {
    ALLOW_NEW_VERSION_AUTO: 'Eine neue Version des Programms ist verfügbar',
    IGNORE: 'Ignorieren',
    UPDATE: 'Aktualisieren',
    CLOSE: 'Schließen'
  },
  CH: {
    ALLOW_NEW_VERSION_AUTO: '新版本的方案已经推出',
    IGNORE: '忽略不计',
    UPDATE: '更新',
    CLOSE: '关闭'
  }
})
