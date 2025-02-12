<template>
  <template v-if="element">
    <Float
      :label="texts.angelVelocity"
      :desc="element.AngVelDesc"
      :descriptor="element.$AngVel"
    />
    <Float
      :label="texts.fuelModifier"
      :desc="element.FuelModifierDesc"
      :descriptor="element.$FuelModifier"
    />
  </template>
</template>
  
<script lang='ts' setup>
import { Float } from '../../input'
import texts from './texts'
import type { INumberAttrDescriptor } from '/mods/xml/game/attributes'

export type GearPresetProps = {
  element?: {
    $AngVel: INumberAttrDescriptor
    $FuelModifier: INumberAttrDescriptor
    AngVelDesc?: string
    FuelModifierDesc?: string
  }
}

defineProps<GearPresetProps>()
</script>
  
