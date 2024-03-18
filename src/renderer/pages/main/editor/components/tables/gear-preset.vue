<template>
  <template v-if="element">
    <Float
      :label="texts.angelVelocity"
      :utils="element.$AngVel"
    />
    <Float
      :label="texts.fuelModifier"
      :utils="element.$FuelModifier"
    />
  </template>
</template>

<script lang='ts' setup>
import { Float } from '../input'

import { Lang } from '/mods/renderer'
import type { NumUtils } from '/mods/xml/game/game-xml'
import { localize } from '/utils/texts/renderer'

export type GearPresetProps = {
  element?: {
    $AngVel: NumUtils
    $FuelModifier: NumUtils
  }
}

defineProps<GearPresetProps>()

const texts = localize({
  angelVelocity: {
    [Lang.ru]: 'Макс. угловая скорость колеса',
    [Lang.en]: 'Max wheel angular velocity',
    [Lang.de]: 'Winkelgeschwindigkeit',
    [Lang.ch]: '齿比'
  },
  fuelModifier: {
    [Lang.ru]: 'Модификатор потребления топлива',
    [Lang.en]: 'Fuel modifier',
    [Lang.de]: 'Kraftstoffmodifikator',
    [Lang.ch]: '燃油消耗'
  }
})
</script>
