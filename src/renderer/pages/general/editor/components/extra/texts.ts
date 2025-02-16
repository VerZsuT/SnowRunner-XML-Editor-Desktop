import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  openFile: new BaseLocalization()
    .ru('Открыть файл')
    .en('Open file')
    .de('Datei öffnen')
    .ch('打开文件'),

  load: new BaseLocalization()
    .ru('Загрузить')
    .en('Load')
    .de('Laden')
    .ch('加载'),

  foundAddons: new BaseLocalization()
    .ru('Найдено аддонов')
    .en('Addons found')
    .de('Addons gefunden')
    .ch('找到插件'),

  extra: new BaseLocalization()
    .ru('Дополнительно')
    .en('Extra')
    .de('Radantrieb')
    .ch('其他'),

  cranesWarnTitle: new BaseLocalization()
    .ru('Внимание!')
    .en('Attention!')
    .de('Aufmerksamkeit!')
    .ch('警告!'),

  addonWheels: new BaseLocalization()
    .ru('Колёса')
    .en('Wheels')
    .de('Ersatzräder')
    .ch('备胎'),

  addonWater: new BaseLocalization()
    .ru('Вода')
    .en('Water')
    .de('Wasser')
    .ch('水'),

  addonRepairs: new BaseLocalization()
    .ru('Запчасти')
    .en('Repairs')
    .de('Ersatzteile')
    .ch('修理零件'),

  addonFuel: new BaseLocalization()
    .ru('Топливо')
    .en('Fuel')
    .de('Kraftstoff')
    .ch('燃油'),

  saveButton: new BaseLocalization()
    .ru('Сохранить')
    .en('Save')
    .de('Datei')
    .ch('保存'),

  addonFilter: new BaseLocalization()
    .ru('Фильтр по имени')
    .en('Filter by name')
    .de('Nach Name filtern')
    .ch('在此处输入名称进行筛选'),

  changed: new BaseLocalization()
    .ru('Изменено')
    .en('Changed')
    .de('Verändert')
    .ch('改变了'),

  crane: new BaseLocalization()
    .ru('кран')
    .en('crane')
    .de('klopfen')
    .ch('起重机'),

  add: new BaseLocalization()
    .ru('Добавить')
    .en('Add')
    .de('Hinzufügen')
    .ch('添加'),

  remove: new BaseLocalization()
    .ru('Удалить')
    .en('Delete')
    .de('Löschen')
    .ch('删除'),

  cranesWarnMessage: new BaseLocalization()
    .ru('Перед удалением крана требуется обязательно его снять с машины.')
    .en('Before removing the crane, be sure to remove it from the truck.')
    .de('Bevor Sie den Wasserhahn entfernen, entfernen Sie ihn unbedingt aus der Maschine.')
    .ch('在删除起重机之前，请务,必将其从卡车上卸下。'),

  banditWarnMessage: new BaseLocalization()
    .ru('Для использования требуется купленное DLC с автомобилем KRS 58 "Бандит".')
    .en('The purchased DLC with the KRS 58 Bandit car is required for use.')
    .de('Für die Verwendung ist ein gekaufter DLC mit dem KRS 58 "Bandit" erforderlich.')
    .ch('购买的DLC与KRS58"匪"车需要使用。'),

  scoutTrailers: new BaseLocalization()
    .ru('Прицепы для скаута')
    .en('Scout trailers')
    .de('Scout-Anhänger')
    .ch('小车拖车钩'),

  truckTrailers: new BaseLocalization()
    .ru('Обычные прицепы')
    .en('Conventional trailers')
    .de('Herkömmliche Anhänger')
    .ch('大车拖车钩')
}).loadRenderer()
