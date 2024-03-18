import { Lang } from '/mods/renderer'
import { localize } from '/utils/texts/renderer'

export default localize({
  physicsWheel: {
    [Lang.ru]: 'Дополнительно',
    [Lang.en]: 'Extra',
    [Lang.de]: 'Radantrieb',
    [Lang.ch]: '单个车轮设置'
  },
  wheel: {
    [Lang.ru]: 'Колесо',
    [Lang.en]: 'Wheel',
    [Lang.de]: 'Rad',
    [Lang.ch]: '轮子'
  },
  extraWheel: {
    [Lang.ru]: 'Доп. колесо',
    [Lang.en]: 'Extra wheel',
    [Lang.de]: 'Zusätzliches Rad',
    [Lang.ch]: '额外的轮子'
  },
  wheelsSizes: {
    [Lang.ru]: 'Доступные размеры колёс',
    [Lang.en]: 'Available wheel sizes',
    [Lang.de]: 'Verfügbare Radgrößen',
    [Lang.ch]: '可用的车轮尺寸'
  },
  wheelsSet: {
    [Lang.ru]: 'Набор колёс',
    [Lang.en]: 'Set of wheels',
    [Lang.de]: 'Satz von Rädern',
    [Lang.ch]: '一套轮子'
  },
  wheelsScale: {
    [Lang.ru]: 'Размер колеса',
    [Lang.en]: 'Wheel size',
    [Lang.de]: 'Rad-Größe',
    [Lang.ch]: '车轮尺寸'
  },
  winchLength: {
    [Lang.ru]: 'Длина лебёдки',
    [Lang.en]: 'Winch length',
    [Lang.de]: 'Länge der Winde',
    [Lang.ch]: '绞车的长度'
  },
  winchStrength: {
    [Lang.ru]: 'Сила лебёдки',
    [Lang.en]: 'Winch strength',
    [Lang.de]: 'Kraft der Winde',
    [Lang.ch]: '绞车的动力'
  },
  responsiveness: {
    [Lang.ru]: 'Чувствительность руля',
    [Lang.en]: 'Steering wheel sensitivity',
    [Lang.de]: 'Empfindlichkeit des Lenkers',
    [Lang.ch]: '方向盘灵敏度'
  },
  torque: {
    [Lang.ru]: 'Привод',
    [Lang.en]: 'Type of wheel drive',
    [Lang.de]: 'Torsionsart',
    [Lang.ch]: '驱动器'
  },
  torqueDefault: {
    [Lang.ru]: 'Всегда ведущее',
    [Lang.en]: 'Drive',
    [Lang.de]: 'Immer Moderator',
    [Lang.ch]: '始终开启全轮驱动'
  },
  torqueFull: {
    [Lang.ru]: 'Ведущее при полном приводе',
    [Lang.en]: 'Driving with AWD',
    [Lang.de]: 'Allradantrieb',
    [Lang.ch]: '全轮驱动'
  },
  torqueNone: {
    [Lang.ru]: 'Ведомое',
    [Lang.en]: 'Driven',
    [Lang.de]: 'Slave',
    [Lang.ch]: '跟随前一组车轮的设定'
  },
  torqueConnectable: {
    [Lang.ru]: 'Определяется аддоном',
    [Lang.en]: 'Defined by the addon',
    [Lang.de]: 'Definiert durch Addon',
    [Lang.ch]: '默认或升级零件决定'
  },
  steeringAngle: {
    [Lang.ru]: 'Угол поворота',
    [Lang.en]: 'Steering angle',
    [Lang.de]: 'Drehwinkel',
    [Lang.ch]: '转弯角度'
  },
  centerOfMass: {
    [Lang.ru]: 'Смещение центра масс',
    [Lang.en]: 'Center of mass offset',
    [Lang.de]: 'Versatz des Massenzentrums',
    [Lang.ch]: '车辆重心调整'
  },
  any: {
    [Lang.ru]: 'Любая',
    [Lang.en]: 'Any',
    [Lang.de]: 'Jede',
    [Lang.ch]: '任何'
  },
  none: {
    [Lang.ru]: 'Отсутствует',
    [Lang.en]: 'None',
    [Lang.de]: 'Fehlt',
    [Lang.ch]: '没有'
  },
  textGroupName: {
    [Lang.ru]: 'Тексты',
    [Lang.en]: 'Texts',
    [Lang.de]: 'Texte',
    [Lang.ch]: '文本'
  },
  uiDesc: {
    [Lang.ru]: 'Описание',
    [Lang.en]: 'Description',
    [Lang.de]: 'Der Name',
    [Lang.ch]: '简述'
  },
  uiName: {
    [Lang.ru]: 'Название',
    [Lang.en]: 'Name',
    [Lang.de]: 'Die Beschreibung',
    [Lang.ch]: '车名'
  },
  controlGroupName: {
    [Lang.ru]: 'Управление',
    [Lang.en]: 'Control',
    [Lang.de]: 'Kontrolle',
    [Lang.ch]: '方向盘'
  },
  backSteerSpeed: {
    [Lang.ru]: 'Скорость возврата колёс',
    [Lang.en]: 'Back steer speed',
    [Lang.de]: 'Die Rücklaufquote der Spitze',
    [Lang.ch]: '车轮回正速度'
  },
  steerSpeed: {
    [Lang.ru]: 'Скорость руля',
    [Lang.en]: 'Steer speed',
    [Lang.de]: 'Geschwindigkeit lenken',
    [Lang.ch]: '转方向盘速度'
  },
  winchGroupName: {
    [Lang.ru]: 'Лебёдка',
    [Lang.en]: 'Winch',
    [Lang.de]: 'Winde',
    [Lang.ch]: '绞盘'
  },
  wheelsGroupName: {
    [Lang.ru]: 'Колёса',
    [Lang.en]: 'Wheels',
    [Lang.de]: 'Räder',
    [Lang.ch]: '轮子'
  },
  suspensionGroupName: {
    [Lang.ru]: 'Подвеска',
    [Lang.en]: 'Suspension',
    [Lang.de]: 'Aufhängung',
    [Lang.ch]: '悬架'
  },
  diffLock: {
    [Lang.ru]: 'Блокировка дифференциала',
    [Lang.en]: 'Differential lock',
    [Lang.de]: 'Differenzialsperre',
    [Lang.ch]: '差速器锁'
  },
  installed: {
    [Lang.ru]: 'Установлена',
    [Lang.en]: 'Installed',
    [Lang.de]: 'Installiert',
    [Lang.ch]: '已安装'
  },
  uninstalled: {
    [Lang.ru]: 'Не установлена',
    [Lang.en]: 'Uninstalled',
    [Lang.de]: 'nicht Installiert',
    [Lang.ch]: '未安装'
  },
  always: {
    [Lang.ru]: 'Всегда',
    [Lang.en]: 'Always',
    [Lang.de]: 'Immer',
    [Lang.ch]: '始终开启'
  },
  gearboxGroupName: {
    [Lang.ru]: 'Коробка передач',
    [Lang.en]: 'Gearbox',
    [Lang.de]: 'Getriebe',
    [Lang.ch]: '变速箱'
  },
  engineGroupName: {
    [Lang.ru]: 'Двигатель',
    [Lang.en]: 'Engine',
    [Lang.de]: 'Motor',
    [Lang.ch]: '发动机'
  },
  engineStartDelay: {
    [Lang.ru]: 'Задержка запуска двигателя',
    [Lang.en]: 'Engine start delay',
    [Lang.de]: 'Motorstartverzögerung',
    [Lang.ch]: '发动机启动延迟'
  },
  exhaustStartTime: {
    [Lang.ru]: 'Время начала выхлопа',
    [Lang.en]: 'Exhaust start time',
    [Lang.de]: 'Startzeit des Abgases',
    [Lang.ch]: '排气的开始时间'
  },
  fuelGroupName: {
    [Lang.ru]: 'Топливный бак',
    [Lang.en]: 'Fuel',
    [Lang.de]: 'Treibstoff',
    [Lang.ch]: '燃油箱'
  },
  damageCapacity: {
    [Lang.ru]: 'Прочность',
    [Lang.en]: 'Damage capacity',
    [Lang.de]: 'Schadenskapazität',
    [Lang.ch]: '血量'
  },
  fuelCapacity: {
    [Lang.ru]: 'Объём',
    [Lang.en]: 'Fuel capacity',
    [Lang.de]: 'Kraftstoffkapazität',
    [Lang.ch]: '容量'
  },
  unlockGroupName: {
    [Lang.ru]: 'Разблокировка',
    [Lang.en]: 'Unlock',
    [Lang.de]: 'Freischalten',
    [Lang.ch]: '解锁'
  },
  country: {
    [Lang.ru]: 'Страна',
    [Lang.en]: 'Country',
    [Lang.de]: 'Land',
    [Lang.ch]: '国家'
  },
  russia: {
    [Lang.ru]: 'Россия',
    [Lang.en]: 'Russia',
    [Lang.de]: 'Russland',
    [Lang.ch]: '俄罗斯'
  },
  usa: {
    [Lang.ru]: 'США',
    [Lang.en]: 'USA',
    [Lang.de]: 'Vereinigte Staaten von Amerika',
    [Lang.ch]: '美国'
  },
  cas: {
    [Lang.ru]: 'Центральная Азия',
    [Lang.en]: 'Central Asia',
    [Lang.de]: 'Zentralasien',
    [Lang.ch]: '中亚地区'
  },
  ne: {
    [Lang.ru]: 'Северная Европа',
    [Lang.en]: 'Northern Europe',
    [Lang.de]: 'Nordeuropa',
    [Lang.ch]: '北欧'
  },
  price: {
    [Lang.ru]: 'Цена',
    [Lang.en]: 'Price',
    [Lang.de]: 'Preis',
    [Lang.ch]: '价格'
  },
  byExploration: {
    [Lang.ru]: 'Способ разблокировки',
    [Lang.en]: 'Unlock method',
    [Lang.de]: 'Methode entsperren',
    [Lang.ch]: '解锁条件'
  },
  findOnMap: {
    [Lang.ru]: 'Найти на карте',
    [Lang.en]: 'Find on map',
    [Lang.de]: 'Auf Karte finden',
    [Lang.ch]: '在地图上寻找'
  },
  byRank: {
    [Lang.ru]: 'По достижению уровня',
    [Lang.en]: 'By rank',
    [Lang.de]: 'Nach Rang',
    [Lang.ch]: '达到该等级时'
  },
  unlockByRank: {
    [Lang.ru]: 'Уровень разблокировки',
    [Lang.en]: 'Unlock level',
    [Lang.de]: 'Level freischalten',
    [Lang.ch]: '解锁等级'
  }
})
