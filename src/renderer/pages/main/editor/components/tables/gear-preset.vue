<template>
  <template v-if="element">
    <Float
      :label="texts.angelVelocity"
      :desc="element.AngVelDesc"
      :utils="element.$AngVel"
    />
    <Float
      :label="texts.fuelModifier"
      :desc="element.FuelModifierDesc"
      :utils="element.$FuelModifier"
    />
  </template>
</template>

<script lang='ts' setup>
import { Float } from '../input'

import type { NumUtils } from '/mods/xml/game/game-xml'
import { Localization, LocalizationObj } from '/utils/texts/renderer'

export type GearPresetProps = {
  element?: {
    $AngVel: NumUtils
    $FuelModifier: NumUtils
    AngVelDesc?: string
    FuelModifierDesc?: string
  }
}

defineProps<GearPresetProps>()

const texts = new LocalizationObj({
  angelVelocity: new Localization()
    .ru('Макс. угловая скорость колеса')
    .en('Max wheel angular velocity')
    .de('Winkelgeschwindigkeit')
    .ch('齿比'),
  fuelModifier: new Localization()
    .ru('Модификатор потребления топлива')
    .en('Fuel modifier')
    .de('Kraftstoffmodifikator')
    .ch('燃油消耗')
}).get()
</script>
