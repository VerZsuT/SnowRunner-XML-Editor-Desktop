import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  physicsWheel: new Localization()
    .ru('Дополнительно')
    .en('Extra')
    .de('Radantrieb')
    .ch('单个车轮设置'),
  wheel: new Localization()
    .ru('Колесо')
    .en('Wheel')
    .de('Rad')
    .ch('轮子'),
  extraWheel: new Localization()
    .ru('Доп. колесо')
    .en('Extra wheel')
    .de('Zusätzliches Rad')
    .ch('额外的轮子'),
  wheelsSizes: new Localization()
    .ru('Доступные размеры колёс')
    .en('Available wheel sizes')
    .de('Verfügbare Radgrößen')
    .ch('可用的车轮尺寸'),
  wheelsSet: new Localization()
    .ru('Набор колёс')
    .en('Set of wheels')
    .de('Satz von Rädern')
    .ch('一套轮子'),
  wheelsScale: new Localization()
    .ru('Размер колеса')
    .en('Wheel size')
    .de('Rad-Größe')
    .ch('车轮尺寸'),
  winchLength: new Localization()
    .ru('Длина лебёдки')
    .en('Winch length')
    .de('Länge der Winde')
    .ch('绞车的长度'),
  winchStrength: new Localization()
    .ru('Сила лебёдки')
    .en('Winch strength')
    .de('Kraft der Winde')
    .ch('绞车的动力'),
  responsiveness: new Localization()
    .ru('Чувствительность руля')
    .en('Steering wheel sensitivity')
    .de('Empfindlichkeit des Lenkers')
    .ch('方向盘灵敏度'),
  torque: new Localization()
    .ru('Привод')
    .en('Type of wheel drive')
    .de('Torsionsart')
    .ch('驱动器'),
  torqueDefault: new Localization()
    .ru('Всегда ведущее')
    .en('Drive')
    .de('Immer Moderator')
    .ch('始终开启全轮驱动'),
  torqueFull: new Localization()
    .ru('Ведущее при полном приводе')
    .en('Driving with AWD')
    .de('Allradantrieb')
    .ch('全轮驱动'),
  torqueNone: new Localization()
    .ru('Ведомое')
    .en('Driven')
    .de('Slave')
    .ch('跟随前一组车轮的设定'),
  torqueConnectable: new Localization()
    .ru('Определяется аддоном')
    .en('Defined by the addon')
    .de('Definiert durch Addon')
    .ch('默认或升级零件决定'),
  steeringAngle: new Localization()
    .ru('Угол поворота')
    .en('Steering angle')
    .de('Drehwinkel')
    .ch('转弯角度'),
  centerOfMass: new Localization()
    .ru('Смещение центра масс')
    .en('Center of mass offset')
    .de('Versatz des Massenzentrums')
    .ch('车辆重心调整'),
  any: new Localization()
    .ru('Любая')
    .en('Any')
    .de('Jede')
    .ch('任何'),
  none: new Localization()
    .ru('Отсутствует')
    .en('None')
    .de('Fehlt')
    .ch('没有'),
  textGroupName: new Localization()
    .ru('Тексты')
    .en('Texts')
    .de('Texte')
    .ch('文本'),
  uiDesc: new Localization()
    .ru('Описание')
    .en('Description')
    .de('Der Name')
    .ch('简述'),
  uiName: new Localization()
    .ru('Название')
    .en('Name')
    .de('Die Beschreibung')
    .ch('车名'),
  controlGroupName: new Localization()
    .ru('Управление')
    .en('Control')
    .de('Kontrolle')
    .ch('方向盘'),
  backSteerSpeed: new Localization()
    .ru('Скорость возврата колёс')
    .en('Back steer speed')
    .de('Die Rücklaufquote der Spitze')
    .ch('车轮回正速度'),
  steerSpeed: new Localization()
    .ru('Скорость руля')
    .en('Steer speed')
    .de('Geschwindigkeit lenken')
    .ch('转方向盘速度'),
  winchGroupName: new Localization()
    .ru('Лебёдка')
    .en('Winch')
    .de('Winde')
    .ch('绞盘'),
  wheelsGroupName: new Localization()
    .ru('Колёса')
    .en('Wheels')
    .de('Räder')
    .ch('轮子'),
  suspensionGroupName: new Localization()
    .ru('Подвеска')
    .en('Suspension')
    .de('Aufhängung')
    .ch('悬架'),
  diffLock: new Localization()
    .ru('Блокировка дифференциала')
    .en('Differential lock')
    .de('Differenzialsperre')
    .ch('差速器锁'),
  installed: new Localization()
    .ru('Установлена')
    .en('Installed')
    .de('Installiert')
    .ch('已安装'),
  uninstalled: new Localization()
    .ru('Не установлена')
    .en('Uninstalled')
    .de('nicht Installiert')
    .ch('未安装'),
  always: new Localization()
    .ru('Всегда')
    .en('Always')
    .de('Immer')
    .ch('始终开启'),
  gearboxGroupName: new Localization()
    .ru('Коробка передач')
    .en('Gearbox')
    .de('Getriebe')
    .ch('变速箱'),
  engineGroupName: new Localization()
    .ru('Двигатель')
    .en('Engine')
    .de('Motor')
    .ch('发动机'),
  engineStartDelay: new Localization()
    .ru('Задержка запуска двигателя')
    .en('Engine start delay')
    .de('Motorstartverzögerung')
    .ch('发动机启动延迟'),
  exhaustStartTime: new Localization()
    .ru('Время начала выхлопа')
    .en('Exhaust start time')
    .de('Startzeit des Abgases')
    .ch('排气的开始时间'),
  fuelGroupName: new Localization()
    .ru('Топливный бак')
    .en('Fuel')
    .de('Treibstoff')
    .ch('燃油箱'),
  damageCapacity: new Localization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),
  fuelCapacity: new Localization()
    .ru('Объём')
    .en('Fuel capacity')
    .de('Kraftstoffkapazität')
    .ch('容量'),
  unlockGroupName: new Localization()
    .ru('Разблокировка')
    .en('Unlock')
    .de('Freischalten')
    .ch('解锁'),
  country: new Localization()
    .ru('Страна')
    .en('Country')
    .de('Land')
    .ch('国家'),
  russia: new Localization()
    .ru('Россия')
    .en('Russia')
    .de('Russland')
    .ch('俄罗斯'),
  usa: new Localization()
    .ru('США')
    .en('USA')
    .de('Vereinigte Staaten von Amerika')
    .ch('美国'),
  cas: new Localization()
    .ru('Центральная Азия')
    .en('Central Asia')
    .de('Zentralasien')
    .ch('中亚地区'),
  ne: new Localization()
    .ru('Северная Европа')
    .en('Northern Europe')
    .de('Nordeuropa')
    .ch('北欧'),
  price: new Localization()
    .ru('Цена')
    .en('Price')
    .de('Preis')
    .ch('价格'),
  byExploration: new Localization()
    .ru('Способ разблокировки')
    .en('Unlock method')
    .de('Methode entsperren')
    .ch('解锁条件'),
  findOnMap: new Localization()
    .ru('Найти на карте')
    .en('Find on map')
    .de('Auf Karte finden')
    .ch('在地图上寻找'),
  byRank: new Localization()
    .ru('По достижению уровня')
    .en('By rank')
    .de('Nach Rang')
    .ch('达到该等级时'),
  unlockByRank: new Localization()
    .ru('Уровень разблокировки')
    .en('Unlock level')
    .de('Level freischalten')
    .ch('解锁等级')
}).get()
