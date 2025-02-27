import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  next: new BaseLocalization()
    .ru('Дальше')
    .en('Next')
    .de('Nächsten')
    .ch('下一个'),

  languageLabel: new BaseLocalization()
    .ru('Язык программы')
    .en('Program language')
    .de('Programmsprache')
    .ch('方案语言'),

  gameFolderLabel: new BaseLocalization()
    .ru('Папка с игрой')
    .en('Game folder')
    .de('Spiel-Ordner')
    .ch('游戏文件夹'),

  gameDataStep: new BaseLocalization()
    .ru('Игровые данные')
    .en('Game data')
    .de('Spieldaten')
    .ch('游戏数据'),

  firstStepsDescription: new BaseLocalization()
    .ru('Первоначальная настройка')
    .en('Initial setup of the program')
    .de('Ersteinrichtung des Programms')
    .ch('初始设置'),

  importConfigMessage: new BaseLocalization()
    .ru('Обнаружены настройки программы с предыдущей версии. Хотите использовать их?')
    .en('The program settings from the previous version have been detected. Do you want to use them?')
    .de('Programmeinstellungen aus einer früheren Version wurden gefunden. Willst du sie benutzen?')
    .ch('找到了以前版本的程序设置。你愿意使用它们吗？'),

  emptyFolderError: new BaseLocalization()
    .ru('Вы не выбрали папку!')
    .en('You didn\'t select a folder!')
    .de('Sie haben keinen Ordner ausgewählt!')
    .ch('你没有选择一个文件夹!'),

  invalidFolderError: new BaseLocalization()
    .ru('Вы выбрали неправильную папку. Попробуйте вручную выбрать initial.pak')
    .en('You have selected the wrong folder!')
    .de('Sie haben den falschen Ordner ausgewählt!')
    .ch('你选择了错误的文件夹。尝试手动选择initial.pak'),

  invalidInitialError: new BaseLocalization()
    .ru('Выбран неверный initial.pak')
    .en('Invalid initial.pak selected')
    .de('Ungültiger initial ausgewählt.pak')
    .ch('选择了错误的initial.pak'),

  ok: new BaseLocalization()
    .ru('Ок')
    .en('Ok')
    .de('Ok')
    .ch('确认'),
    
  cancel: new BaseLocalization()
    .ru('Отменить')
    .en('Cancel')
    .de('Stornieren')
    .ch('取消')
}).loadRenderer()
