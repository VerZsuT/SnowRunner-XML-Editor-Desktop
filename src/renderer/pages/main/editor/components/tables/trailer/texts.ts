import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  quantity: new Localization()
    .ru('Кол-во груза')
    .en('Cargo quantity')
    .de('Menge der Ladung')
    .ch('装载货物的格数'),
  inner: new Localization()
    .ru('Полезное содержимое')
    .en('Useful content')
    .de('Nützliche Inhalte')
    .ch('有用的内容'),
  mass: new Localization()
    .ru('Масса')
    .en('Mass')
    .de('Masse')
    .ch('重量'),
  other: new Localization()
    .ru('Прочее')
    .en('Other')
    .de('Ander')
    .ch('其他'),
  price: new Localization()
    .ru('Цена')
    .en('Price')
    .de('Preis')
    .ch('价格'),
  waterCapacity: new Localization()
    .ru('Объём воды')
    .en('Fuel capacity')
    .de('Kraftstoffmenge')
    .ch('燃油容量'),
  fuelCapacity: new Localization()
    .ru('Объём топлива')
    .en('Water capacity')
    .de('Wasser-Kapazität')
    .ch('水容量'),
  repairsCapacity: new Localization()
    .ru('Кол-во запчастей')
    .en('Repairs capacity')
    .de('Anzahl der Ersatzteile')
    .ch('修理零件数量'),
  wheelRepairsCapacity: new Localization()
    .ru('Кол-во колёс для ремонта')
    .en('Wheel repairs capacity')
    .de('Anzahl der Räder zu reparieren')
    .ch('备胎数量'),
  centerOfMass: new Localization()
    .ru('Смещение центра масс')
    .en('Center of mass offset')
    .de('Versatz des Massenzentrums')
    .ch('车辆重心调整'),
  trailerMass: new Localization()
    .ru('Масса прицепа')
    .en('Trailer mass')
    .de('Gewicht des Anhängers')
    .ch('拖车重量'),
  fuelMass: new Localization()
    .ru('Масса топлива')
    .en('Fuel mass')
    .de('Gewicht des Kraftstoffs')
    .ch('燃料重量'),
  wheels: new Localization()
    .ru('Колёса')
    .en('Wheels')
    .de('Räder')
    .ch('轮子'),
  wheel: new Localization()
    .ru('Колесо')
    .en('Wheel')
    .de('Das Rad')
    .ch('轮子'),
  suspHeight: new Localization()
    .ru('Высота подвески')
    .en('Suspension height')
    .de('Höhe der Aufhängung')
    .ch('悬架的高度'),
  suspStrength: new Localization()
    .ru('Жёсткость подвески')
    .en('Suspension strength')
    .de('Federungssteifigkeit')
    .ch('悬架的硬度')
}).get()
