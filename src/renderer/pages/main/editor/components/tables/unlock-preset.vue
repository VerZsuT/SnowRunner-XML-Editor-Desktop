<template>
  <Group
    v-if="element"
    key="unlock"
    :label="texts.unlockGroupName"
  >
    <Int
      :label="texts.price"
      :utils="element.$Price"
    />
    <Select
      :label="texts.byExploration"
      :utils="element.$UnlockByExploration"
      :options="[
        [true, texts.findOnMap],
        [false, texts.byRank]
      ]"
    />
    <Int
      :label="texts.unlockByRank"
      :utils="element.$UnlockByRank"
    />
  </Group>
</template>

<script lang='ts' setup>
import Group from '../group'
import { Int } from '../input'
import Select from '../select'

import { Lang } from '/mods/renderer'
import type { BoolUtils, NumUtils } from '/mods/xml/game/game-xml'
import { localize } from '/utils/texts/renderer'

export type UnlockPresetProps = {
  element?: {
    $Price: NumUtils
    $UnlockByRank: NumUtils
    $UnlockByExploration: BoolUtils
  }
}

defineProps<UnlockPresetProps>()

const texts = localize({
  unlockGroupName: {
    [Lang.ru]: 'Разблокировка',
    [Lang.en]: 'Unlock',
    [Lang.de]: 'Freischalten',
    [Lang.ch]: '解锁'
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
    [Lang.ch]: '解锁的方法'
  },
  findOnMap: {
    [Lang.ru]: 'Найти на карте',
    [Lang.en]: 'Find on map',
    [Lang.de]: 'Auf Karte finden',
    [Lang.ch]: '在地图上查找'
  },
  byRank: {
    [Lang.ru]: 'По достижению уровня',
    [Lang.en]: 'By rank',
    [Lang.de]: 'Nach Rang',
    [Lang.ch]: '当达到该水平时'
  },
  unlockByRank: {
    [Lang.ru]: 'Уровень разблокировки',
    [Lang.en]: 'Unlock level',
    [Lang.de]: 'Level freischalten',
    [Lang.ch]: '解锁级别'
  }
})
</script>
