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

  wheelsScale: new BaseLocalization()
    .ru('Размер колеса')
    .en('Wheel size')
    .de('Rad-Größe')
    .ch('车轮尺寸'),

  winchLength: new BaseLocalization()
    .ru('Длина лебёдки')
    .en('Winch length')
    .de('Länge der Winde')
    .ch('绞车的长度'),

  winchStrength: new BaseLocalization()
    .ru('Сила лебёдки')
    .en('Winch strength')
    .de('Kraft der Winde')
    .ch('绞车的动力'),

  responsiveness: new BaseLocalization()
    .ru('Чувствительность руля')
    .en('Steering wheel sensitivity')
    .de('Empfindlichkeit des Lenkers')
    .ch('方向盘灵敏度'),

  torque: new BaseLocalization()
    .ru('Привод')
    .en('Type of wheel drive')
    .de('Torsionsart')
    .ch('驱动器'),

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

  steeringAngle: new BaseLocalization()
    .ru('Угол поворота')
    .en('Steering angle')
    .de('Drehwinkel')
    .ch('转弯角度'),

  centerOfMass: new BaseLocalization()
    .ru('Смещение центра масс')
    .en('Center of mass offset')
    .de('Versatz des Massenzentrums')
    .ch('车辆重心调整'),

  any: new BaseLocalization()
    .ru('Любая')
    .en('Any')
    .de('Jede')
    .ch('任何'),

  none: new BaseLocalization()
    .ru('Отсутствует')
    .en('None')
    .de('Fehlt')
    .ch('没有'),

  textGroupName: new BaseLocalization()
    .ru('Тексты')
    .en('Texts')
    .de('Texte')
    .ch('文本'),

  uiDesc: new BaseLocalization()
    .ru('Описание')
    .en('Description')
    .de('Der Name')
    .ch('简述'),

  uiName: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Die Beschreibung')
    .ch('车名'),

  controlGroupName: new BaseLocalization()
    .ru('Управление')
    .en('Control')
    .de('Kontrolle')
    .ch('方向盘'),

  backSteerSpeed: new BaseLocalization()
    .ru('Скорость возврата колёс')
    .en('Back steer speed')
    .de('Die Rücklaufquote der Spitze')
    .ch('车轮回正速度'),

  steerSpeed: new BaseLocalization()
    .ru('Скорость руля')
    .en('Steer speed')
    .de('Geschwindigkeit lenken')
    .ch('转方向盘速度'),

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

  diffLock: new BaseLocalization()
    .ru('Блокировка дифференциала')
    .en('Differential lock')
    .de('Differenzialsperre')
    .ch('差速器锁'),

  installed: new BaseLocalization()
    .ru('Установлена')
    .en('Installed')
    .de('Installiert')
    .ch('已安装'),

  uninstalled: new BaseLocalization()
    .ru('Не установлена')
    .en('Uninstalled')
    .de('nicht Installiert')
    .ch('未安装'),

  always: new BaseLocalization()
    .ru('Всегда')
    .en('Always')
    .de('Immer')
    .ch('始终开启'),

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

  engineStartDelay: new BaseLocalization()
    .ru('Задержка запуска двигателя')
    .en('Engine start delay')
    .de('Motorstartverzögerung')
    .ch('发动机启动延迟'),

  exhaustStartTime: new BaseLocalization()
    .ru('Время начала выхлопа')
    .en('Exhaust start time')
    .de('Startzeit des Abgases')
    .ch('排气的开始时间'),

  fuelGroupName: new BaseLocalization()
    .ru('Топливный бак')
    .en('Fuel')
    .de('Treibstoff')
    .ch('燃油箱'),

  damageCapacity: new BaseLocalization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),

  fuelCapacity: new BaseLocalization()
    .ru('Объём')
    .en('Fuel capacity')
    .de('Kraftstoffkapazität')
    .ch('容量'),

  unlockGroupName: new BaseLocalization()
    .ru('Разблокировка')
    .en('Unlock')
    .de('Freischalten')
    .ch('解锁'),

  country: new BaseLocalization()
    .ru('Страна')
    .en('Country')
    .de('Land')
    .ch('国家'),

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

  price: new BaseLocalization()
    .ru('Цена')
    .en('Price')
    .de('Preis')
    .ch('价格'),

  byExploration: new BaseLocalization()
    .ru('Способ разблокировки')
    .en('Unlock method')
    .de('Methode entsperren')
    .ch('解锁条件'),

  findOnMap: new BaseLocalization()
    .ru('Найти на карте')
    .en('Find on map')
    .de('Auf Karte finden')
    .ch('在地图上寻找'),

  byRank: new BaseLocalization()
    .ru('По достижению уровня')
    .en('By rank')
    .de('Nach Rang')
    .ch('达到该等级时'),

  unlockByRank: new BaseLocalization()
    .ru('Уровень разблокировки')
    .en('Unlock level')
    .de('Level freischalten')
    .ch('解锁等级')
}).loadRenderer()
