<template>
  <Group
    v-if="element"
    key="unlock"
    :label="texts.unlockGroupName"
  >
    <Int
      :label="texts.price"
      :desc="element.PriceDesc"
      :utils="element.$Price"
    />
    <Select
      :label="texts.byExploration"
      :desc="element.UnlockByExplorationDesc"
      :utils="element.$UnlockByExploration"
      :options="[
        [true, texts.findOnMap],
        [false, texts.byRank]
      ]"
    />
    <Int
      :label="texts.unlockByRank"
      :desc="element.UnlockByRankDesc"
      :utils="element.$UnlockByRank"
    />
  </Group>
</template>

<script lang='ts' setup>
import Group from '../group'
import { Int } from '../input'
import Select from '../select'

import type { BoolUtils, NumUtils } from '/mods/xml/game/game-xml'
import { Localization, LocalizationObj } from '/utils/texts/renderer'

export type UnlockPresetProps = {
  element?: {
    $Price: NumUtils
    $UnlockByRank: NumUtils
    $UnlockByExploration: BoolUtils
    PriceDesc?: string
    UnlockByRankDesc?: string
    UnlockByExplorationDesc?: string
  }
}

defineProps<UnlockPresetProps>()

const texts = new LocalizationObj({
  unlockGroupName: new Localization()
    .ru('Разблокировка')
    .en('Unlock')
    .de('Freischalten')
    .ch('解锁'),
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
</script>
