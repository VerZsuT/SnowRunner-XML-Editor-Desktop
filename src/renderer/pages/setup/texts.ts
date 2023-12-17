import { Lang } from '/mods/renderer'
import { localize } from '/utils/texts/renderer'

export default localize({
  next: {
    [Lang.ru]: 'Дальше',
    [Lang.en]: 'Next',
    [Lang.de]: 'Nächsten',
    [Lang.ch]: '下一个'
  },
  languageLabel: {
    [Lang.ru]: 'Язык программы',
    [Lang.en]: 'Program language',
    [Lang.de]: 'Programmsprache',
    [Lang.ch]: '方案语言'
  },
  gameFolderLabel: {
    [Lang.ru]: 'Папка с игрой',
    [Lang.en]: 'Game folder',
    [Lang.de]: 'Spiel-Ordner',
    [Lang.ch]: '游戏文件夹'
  },
  gameDataStep: {
    [Lang.ru]: 'Игровые данные',
    [Lang.en]: 'Game data',
    [Lang.de]: 'Spieldaten',
    [Lang.ch]: '游戏数据'
  },
  firstStepsDescription: {
    [Lang.ru]: 'Первоначальная настройка',
    [Lang.en]: 'Initial setup of the program',
    [Lang.de]: 'Ersteinrichtung des Programms',
    [Lang.ch]: '初始设置'
  },
  importConfigMessage: {
    [Lang.ru]: 'Обнаружены настройки программы с предыдущей версии. Хотите использовать их?',
    [Lang.en]: 'The program settings from the previous version have been detected. Do you want to use them?',
    [Lang.de]: 'Programmeinstellungen aus einer früheren Version wurden gefunden. Willst du sie benutzen?',
    [Lang.ch]: '找到了以前版本的程序设置。你愿意使用它们吗？'
  },
  emptyFolderError: {
    [Lang.ru]: 'Вы не выбрали папку!',
    [Lang.en]: 'You didn\'t select a folder!',
    [Lang.de]: 'Sie haben keinen Ordner ausgewählt!',
    [Lang.ch]: '你没有选择一个文件夹!'
  },
  invalidFolderError: {
    [Lang.ru]: 'Вы выбрали неправильную папку. Попробуйте вручную выбрать initial.pak',
    [Lang.en]: 'You have selected the wrong folder!',
    [Lang.de]: 'Sie haben den falschen Ordner ausgewählt!',
    [Lang.ch]: '你选择了错误的文件夹。尝试手动选择initial.pak'
  },
  invalidInitialError: {
    [Lang.ru]: 'Выбран неверный initial.pak',
    [Lang.en]: 'Invalid initial.pak selected',
    [Lang.de]: 'Ungültiger initial ausgewählt.pak',
    [Lang.ch]: '选择了错误的initial.pak'
  },
  ok: {
    [Lang.ru]: 'Ок',
    [Lang.en]: 'Ok',
    [Lang.de]: 'Ok',
    [Lang.ch]: '确认'
  },
  cancel: {
    [Lang.ru]: 'Отменить',
    [Lang.en]: 'Cancel',
    [Lang.de]: 'Stornieren',
    [Lang.ch]: '取消'
  }
})
