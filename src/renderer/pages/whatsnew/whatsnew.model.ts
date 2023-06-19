import { localizeVal } from '#g/texts/renderer'
import { ViewModel, unwrap } from '#r/model-ctrlr'

export default class WhatsNewModel extends ViewModel {
  @unwrap readonly desc074 = localizeVal({
    RU: [
      'Добавлена функция переноса всех изменений при обновлении игры (только изменения сделанные в версии 0.7.4+)',
      'Программа адаптирована под версию игры 23.0',
      'Больше никаких фризов при сохранении',
      'Оптимизация и устранение утечки памяти при перемещении окна',
      'В папку программы возвращены LICENSE и README',
      'Добавлен этап с лицензией в установщик программы',
      'Большинство уведомлений теперь показывается в самой программе',
      'Добавлены возможность выбора целой папки с модами',
      'Добавлена возможность изменять объём воды в прицепах и аддонах'
    ],
    EN: [
      'Added the function of transferring all changes when updating the game (only changes made in version 0.7.4+)',
      'The program is adapted to the game version 23.0',
      'No more friezes when saving',
      'Optimizing and eliminating memory leaks when moving a window',
      'LICENSE and README are returned to the program folder',
      'Added a license stage to the program installer',
      'Most notifications are now shown in the program itself',
      'Added the ability to select an entire folder with mods',
      'Added the ability to change the volume of water in trailers and addons'
    ],
    DE: [
      'Es wurde eine Funktion hinzugefügt, um alle Änderungen beim Aktualisieren des Spiels zu übertragen (nur Änderungen, die in Version 0.7.4+ vorgenommen wurden)',
      'Das Programm wurde für die Version 23.0 des Spiels angepasst',
      'Keine Friesen mehr beim Speichern',
      'Optimierung und Behebung von Speicherlecks beim Verschieben des Fensters',
      'LIZENZ und README wurden in den Programmordner zurückgegeben',
      'Schritt mit Lizenz zum Installationsprogramm hinzugefügt',
      'Die meisten Benachrichtigungen werden jetzt im Programm selbst angezeigt',
      'Option hinzugefügt, um einen ganzen Ordner mit Mods auszuwählen',
      'Möglichkeit hinzugefügt, die Wassermenge in Anhängern und Addons zu ändern'
    ],
    CH: [
      '增加了在更新游戏时传输所有更改的功能（仅在版本0.7.4+中进行更改）',
      '该程序适应游戏版本23.0',
      '保存时不再冻结',
      '在移动窗口时优化和消除内存泄漏',
      '许可证和自述文件返回到程序文件夹',
      '在程序安装程序中添加了许可证阶段',
      '大多数通知现在显示在程序本身',
      '添加了使用mods选择整个文件夹的功能',
      '增加了改变拖车和插件水量的能力'
    ]
  }) as unknown as string[]
  @unwrap readonly desc073c = localizeVal({
    RU: [
      'Меню программы открывается при нажатии, а не при наведении',
      'Иконки в шапке таблицы увеличены до стандартных',
      'Все элементы меню, а также поля выбора не обрезают текст',
      'Переведены кнопки диалогов и названия колонок при выборе модификаций',
      'Исправлен CH перевод (спасибо 杨 新民)',
      'Небольшая оптимизация'
    ],
    EN: [
      'The program menu opens when you click, not when you hover',
      'Icons in the table header have been enlarged to standard',
      'All menu items, as well as selection fields, do not crop the text',
      'Dialog buttons and column names have been translated when selecting modifications',
      'Fixed CH translation (thank you 杨 新民)',
      'Small optimization'
    ],
    DE: [
      'Das Programmmenü wird beim Klicken und nicht beim Schweben geöffnet',
      'Symbole im Tabellenkopf sind auf Standard vergrößert',
      'Alle Menüelemente und Auswahlfelder schneiden den Text nicht ab',
      'Dialogschaltflächen und Spaltennamen wurden bei der Auswahl von Änderungen übersetzt',
      'Korrigierte CH-Übersetzung (danke 杨 新民)',
      'Kleine Optimierung'
    ],
    CH: [
      '程序菜单在您单击时打开，而不是在您悬停时打开',
      '表头中的图标已放大为标准',
      '所有菜单项，以及选择字段，不裁剪文本',
      '选择修改时已翻译对话框按钮和列名',
      '更正CH翻译（谢谢, 杨 新民）',
      '小优化'
    ]
  }) as unknown as string[]
}
