<template>
  <Group
    v-if="element"
    key="unlock"
    :label="texts.unlockGroupName"
  >
    <Int :descriptor="element.$Price" />
    <Select
      :descriptor="element.$UnlockByExploration"
      :options="[
        [true, texts.findOnMap],
        [false, texts.byRank]
      ]"
    />
    <Int :descriptor="element.$UnlockByRank" />
  </Group>
</template>
  
<script lang='ts' setup>
import type { IBooleanAttrDescriptor, INumberAttrDescriptor } from '@modules/xml/game/attributes'
import Group from '../../group'
import { Int } from '../../input'
import Select from '../../select'
import texts from './localization'

export type UnlockPresetProps = {
  element?: {
    $Price: INumberAttrDescriptor
    $UnlockByRank: INumberAttrDescriptor
    $UnlockByExploration: IBooleanAttrDescriptor
  }
}

defineProps<UnlockPresetProps>()
</script>
  
