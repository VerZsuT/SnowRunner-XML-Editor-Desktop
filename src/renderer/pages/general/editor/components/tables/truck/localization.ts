import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export const TRUCK_LOCALIZATION =  loadLocalization(new Localization({
  physicsWheel: new LocalizationStrings()
    .ru('Дополнительно')
    .en('Extra')
    .de('Radantrieb')
    .ch('单个车轮设置'),

  wheel: new LocalizationStrings()
    .ru('Колесо')
    .en('Wheel')
    .de('Rad')
    .ch('轮子'),

  extraWheel: new LocalizationStrings()
    .ru('Доп. колесо')
    .en('Extra wheel')
    .de('Zusätzliches Rad')
    .ch('额外的轮子'),

  wheelsSizes: new LocalizationStrings()
    .ru('Доступные размеры колёс')
    .en('Available wheel sizes')
    .de('Verfügbare Radgrößen')
    .ch('可用的车轮尺寸'),

  wheelsSet: new LocalizationStrings()
    .ru('Набор колёс')
    .en('Set of wheels')
    .de('Satz von Rädern')
    .ch('一套轮子'),

  torqueDefault: new LocalizationStrings()
    .ru('Всегда ведущее')
    .en('Drive')
    .de('Immer Moderator')
    .ch('始终开启全轮驱动'),

  torqueFull: new LocalizationStrings()
    .ru('Ведущее при полном приводе')
    .en('Driving with AWD')
    .de('Allradantrieb')
    .ch('全轮驱动'),

  torqueNone: new LocalizationStrings()
    .ru('Ведомое')
    .en('Driven')
    .de('Slave')
    .ch('跟随前一组车轮的设定'),

  torqueConnectable: new LocalizationStrings()
    .ru('Определяется аддоном')
    .en('Defined by the addon')
    .de('Definiert durch Addon')
    .ch('默认或升级零件决定'),

  connectable: new LocalizationStrings()
  .ru('Определяется аддоном')
  .en('Defined by the addon')
  .de('Definiert durch Addon')
  .ch('默认或升级零件决定'),

  textGroupName: new LocalizationStrings()
    .ru('Тексты')
    .en('Texts')
    .de('Texte')
    .ch('文本'),

  controlGroupName: new LocalizationStrings()
    .ru('Управление')
    .en('Control')
    .de('Kontrolle')
    .ch('方向盘'),

  winchGroupName: new LocalizationStrings()
    .ru('Лебёдка')
    .en('Winch')
    .de('Winde')
    .ch('绞盘'),

  wheelsGroupName: new LocalizationStrings()
    .ru('Колёса')
    .en('Wheels')
    .de('Räder')
    .ch('轮子'),

  suspensionGroupName: new LocalizationStrings()
    .ru('Подвеска')
    .en('Suspension')
    .de('Aufhängung')
    .ch('悬架'),

  gearboxGroupName: new LocalizationStrings()
    .ru('Коробка передач')
    .en('Gearbox')
    .de('Getriebe')
    .ch('变速箱'),

  engineGroupName: new LocalizationStrings()
    .ru('Двигатель')
    .en('Engine')
    .de('Motor')
    .ch('发动机'),

  fuelGroupName: new LocalizationStrings()
    .ru('Топливный бак')
    .en('Fuel')
    .de('Treibstoff')
    .ch('燃油箱'),

  unlockGroupName: new LocalizationStrings()
    .ru('Разблокировка')
    .en('Unlock')
    .de('Freischalten')
    .ch('解锁'),

  russia: new LocalizationStrings()
    .ru('Россия')
    .en('Russia')
    .de('Russland')
    .ch('俄罗斯'),

  usa: new LocalizationStrings()
    .ru('США')
    .en('USA')
    .de('Vereinigte Staaten von Amerika')
    .ch('美国'),

  cas: new LocalizationStrings()
    .ru('Центральная Азия')
    .en('Central Asia')
    .de('Zentralasien')
    .ch('中亚地区'),

  ne: new LocalizationStrings()
    .ru('Северная Европа')
    .en('Northern Europe')
    .de('Nordeuropa')
    .ch('北欧'),

  findOnMap: new LocalizationStrings()
    .ru('Найти на карте')
    .en('Find on map')
    .de('Auf Karte finden')
    .ch('在地图上寻找'),

  byRank: new LocalizationStrings()
    .ru('По достижению уровня')
    .en('By rank')
    .de('Nach Rang')
    .ch('达到该等级时')
}))
