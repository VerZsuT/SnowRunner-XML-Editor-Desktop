<template>
  <template v-if="element">
    <Float :descriptor="element.$AngVel" />
    <Float :descriptor="element.$FuelModifier" />
  </template>
</template>
  
<script lang='ts' setup>
import type { INumberAttrDescriptor } from '@modules/xml/game/attributes'
import { Float } from '../../input'

export type GearPresetProps = {
  element?: {
    $AngVel: INumberAttrDescriptor
    $FuelModifier: INumberAttrDescriptor
  }
}

defineProps<GearPresetProps>()
</script>
  
