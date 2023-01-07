import { Group, Int, Select } from '../items'

import { compareWithGlobal } from '#gl-texts/renderer'

const $ = compareWithGlobal({
  RU: {
    UNLOCK_GROUP_NAME: 'Разблокировка',
    PRICE: 'Цена',
    BY_EXPLORATION: 'Способ разблокировки',
    FIND_ON_MAP: 'Найти на карте',
    BY_RANK: 'По достижению уровня',
    UNLOCK_BY_RANK: 'Уровень разблокировки'
  },
  EN: {
    UNLOCK_GROUP_NAME: 'Unlock',
    PRICE: 'Price',
    BY_EXPLORATION: 'Unlock method',
    FIND_ON_MAP: 'Find on map',
    BY_RANK: 'By rank',
    UNLOCK_BY_RANK: 'Unlock level'
  },
  DE: {
    UNLOCK_GROUP_NAME: 'Freischalten',
    PRICE: 'Preis',
    BY_EXPLORATION: 'Methode entsperren',
    FIND_ON_MAP: 'Auf Karte finden',
    BY_RANK: 'Nach Rang',
    UNLOCK_BY_RANK: 'Level freischalten'
  },
  CH: {
    UNLOCK_GROUP_NAME: '解锁',
    PRICE: '价格',
    BY_EXPLORATION: '解锁的方法',
    FIND_ON_MAP: '在地图上查找',
    BY_RANK: '当达到该水平时',
    UNLOCK_BY_RANK: '解锁级别'
  }
})

function unlockGroup(selector: string) {
  return new Group({
    label: $.UNLOCK_GROUP_NAME,
    provided: selector
  },
    new Int({
      attribute: 'Price',
      label: $.PRICE
    }),
    new Select({
      attribute: 'UnlockByExploration',
      label: $.BY_EXPLORATION,
      options: [
        ['true', $.FIND_ON_MAP],
        ['false', $.BY_RANK]
      ]
    }),
    new Int({
      attribute: 'UnlockByRank',
      label: $.UNLOCK_BY_RANK,
      max: 30,
      min: 1
    })
  )
}

export default unlockGroup
