<template>
  <template v-if="element">
    <Float :descriptor="element.$AngVel" />
    <Float :descriptor="element.$FuelModifier" />
  </template>
</template>
  
<script lang='ts' setup>
import { Float } from '../../input'
import type { INumberAttrDescriptor } from '/mods/xml/game/attributes'

export type GearPresetProps = {
  element?: {
    $AngVel: INumberAttrDescriptor
    $FuelModifier: INumberAttrDescriptor
  }
}

defineProps<GearPresetProps>()
</script>
  
