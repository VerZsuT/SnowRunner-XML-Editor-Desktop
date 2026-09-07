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
import Group from '../../group/group.vue'
import Int from '../../input/variants/int.vue'
import Select from '../../select/select.vue'
import { UNLOCK_PRESET_LOCALIZATION as texts } from './localization'

export type UnlockPresetProps = {
  element?: {
    $Price: INumberAttrDescriptor
    $UnlockByRank: INumberAttrDescriptor
    $UnlockByExploration: IBooleanAttrDescriptor
  }
}

defineProps<UnlockPresetProps>()
</script>
  
