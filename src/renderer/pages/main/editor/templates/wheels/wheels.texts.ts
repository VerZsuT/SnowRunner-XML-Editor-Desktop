import { compareWithGlobal } from '#g/texts/renderer'

const $ = compareWithGlobal({
  RU: {
    BODY_FRICTION: 'Сцепление на бездорожье',
    BODY_FRICTION_ASPHALT: 'Сцепление на асфальте',
    SUBSTANCE_FRICTION: 'Сцепление в грязи',
    IGNORE_ICE: 'Едет по льду',
    YES: 'Да',
    NO: 'Нет'
  },
  EN: {
    BODY_FRICTION: 'Body friction',
    BODY_FRICTION_ASPHALT: 'Body friction asphalt',
    SUBSTANCE_FRICTION: 'Substance friction',
    IGNORE_ICE: 'Rides on ice',
    YES: 'Yes',
    NO: 'No'
  },
  DE: {
    BODY_FRICTION: 'Körperreibung',
    BODY_FRICTION_ASPHALT: 'Körperreibung asphalt',
    SUBSTANCE_FRICTION: 'Substanzreibung',
    IGNORE_ICE: 'Fahrten auf Eis',
    YES: 'Ja',
    NO: 'Nein'
  },
  CH: {
    BODY_FRICTION: '在干土地上的摩擦力',
    BODY_FRICTION_ASPHALT: '在公路上的摩擦力',
    SUBSTANCE_FRICTION: '在泥浆里的摩擦力',
    IGNORE_ICE: '在冰上驾驶',
    YES: '是',
    NO: '没有'
  }
})

export default $
