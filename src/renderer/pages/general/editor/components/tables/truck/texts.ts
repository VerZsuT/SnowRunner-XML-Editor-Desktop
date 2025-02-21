import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  physicsWheel: new BaseLocalization()
    .ru('Дополнительно')
    .en('Extra')
    .de('Radantrieb')
    .ch('单个车轮设置'),

  wheel: new BaseLocalization()
    .ru('Колесо')
    .en('Wheel')
    .de('Rad')
    .ch('轮子'),

  extraWheel: new BaseLocalization()
    .ru('Доп. колесо')
    .en('Extra wheel')
    .de('Zusätzliches Rad')
    .ch('额外的轮子'),

  wheelsSizes: new BaseLocalization()
    .ru('Доступные размеры колёс')
    .en('Available wheel sizes')
    .de('Verfügbare Radgrößen')
    .ch('可用的车轮尺寸'),

  wheelsSet: new BaseLocalization()
    .ru('Набор колёс')
    .en('Set of wheels')
    .de('Satz von Rädern')
    .ch('一套轮子'),

  torqueDefault: new BaseLocalization()
    .ru('Всегда ведущее')
    .en('Drive')
    .de('Immer Moderator')
    .ch('始终开启全轮驱动'),

  torqueFull: new BaseLocalization()
    .ru('Ведущее при полном приводе')
    .en('Driving with AWD')
    .de('Allradantrieb')
    .ch('全轮驱动'),

  torqueNone: new BaseLocalization()
    .ru('Ведомое')
    .en('Driven')
    .de('Slave')
    .ch('跟随前一组车轮的设定'),

  torqueConnectable: new BaseLocalization()
    .ru('Определяется аддоном')
    .en('Defined by the addon')
    .de('Definiert durch Addon')
    .ch('默认或升级零件决定'),

  connectable: new BaseLocalization()
  .ru('Определяется аддоном')
  .en('Defined by the addon')
  .de('Definiert durch Addon')
  .ch('默认或升级零件决定'),

  textGroupName: new BaseLocalization()
    .ru('Тексты')
    .en('Texts')
    .de('Texte')
    .ch('文本'),

  controlGroupName: new BaseLocalization()
    .ru('Управление')
    .en('Control')
    .de('Kontrolle')
    .ch('方向盘'),

  winchGroupName: new BaseLocalization()
    .ru('Лебёдка')
    .en('Winch')
    .de('Winde')
    .ch('绞盘'),

  wheelsGroupName: new BaseLocalization()
    .ru('Колёса')
    .en('Wheels')
    .de('Räder')
    .ch('轮子'),

  suspensionGroupName: new BaseLocalization()
    .ru('Подвеска')
    .en('Suspension')
    .de('Aufhängung')
    .ch('悬架'),

  gearboxGroupName: new BaseLocalization()
    .ru('Коробка передач')
    .en('Gearbox')
    .de('Getriebe')
    .ch('变速箱'),

  engineGroupName: new BaseLocalization()
    .ru('Двигатель')
    .en('Engine')
    .de('Motor')
    .ch('发动机'),

  fuelGroupName: new BaseLocalization()
    .ru('Топливный бак')
    .en('Fuel')
    .de('Treibstoff')
    .ch('燃油箱'),

  unlockGroupName: new BaseLocalization()
    .ru('Разблокировка')
    .en('Unlock')
    .de('Freischalten')
    .ch('解锁'),

  russia: new BaseLocalization()
    .ru('Россия')
    .en('Russia')
    .de('Russland')
    .ch('俄罗斯'),

  usa: new BaseLocalization()
    .ru('США')
    .en('USA')
    .de('Vereinigte Staaten von Amerika')
    .ch('美国'),

  cas: new BaseLocalization()
    .ru('Центральная Азия')
    .en('Central Asia')
    .de('Zentralasien')
    .ch('中亚地区'),

  ne: new BaseLocalization()
    .ru('Северная Европа')
    .en('Northern Europe')
    .de('Nordeuropa')
    .ch('北欧'),

  findOnMap: new BaseLocalization()
    .ru('Найти на карте')
    .en('Find on map')
    .de('Auf Karte finden')
    .ch('在地图上寻找'),

  byRank: new BaseLocalization()
    .ru('По достижению уровня')
    .en('By rank')
    .de('Nach Rang')
    .ch('达到该等级时')
}).loadRenderer()
