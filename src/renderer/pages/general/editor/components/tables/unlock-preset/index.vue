<template>
  <Group
    v-if="element"
    key="unlock"
    :label="texts.unlockGroupName"
  >
    <Int
      :label="texts.price"
      :desc="element.PriceDesc"
      :descriptor="element.$Price"
    />
    <Select
      :label="texts.byExploration"
      :desc="element.UnlockByExplorationDesc"
      :descriptor="element.$UnlockByExploration"
      :options="[
        [true, texts.findOnMap],
        [false, texts.byRank]
      ]"
    />
    <Int
      :label="texts.unlockByRank"
      :desc="element.UnlockByRankDesc"
      :descriptor="element.$UnlockByRank"
    />
  </Group>
</template>
  
<script lang='ts' setup>
import Group from '../../group'
import { Int } from '../../input'
import Select from '../../select'
import texts from './texts'
import type { IBooleanAttrDescriptor, INumberAttrDescriptor } from '/mods/xml/game/attributes'

export type UnlockPresetProps = {
  element?: {
    $Price: INumberAttrDescriptor
    $UnlockByRank: INumberAttrDescriptor
    $UnlockByExploration: IBooleanAttrDescriptor
    PriceDesc?: string
    UnlockByRankDesc?: string
    UnlockByExplorationDesc?: string
  }
}

defineProps<UnlockPresetProps>()
</script>
  
