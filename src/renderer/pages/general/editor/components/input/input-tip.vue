<template>
  <Wrap
    :wrapper="popover"
    :wrap="valueTips.hasAny || areaTips.hasAny"
  >
    <template #content>
      <Text v-if="valueTips.hasAny">
        <span v-if="valueTips.min !== undefined">
          {{ valueTips.min }}<br>
        </span>
        <span v-if="valueTips.max !== undefined">
          {{ valueTips.max }}<br>
        </span>
        <span v-if="valueTips.default !== undefined">
          {{ valueTips.default }}<br>
        </span>
      </Text>
      <Text v-if="areaTips.hasAny">
        <br>
        <span v-if="areaTips.green !== undefined">
          {{ areaTips.green }}<br>
        </span>
        <span v-if="areaTips.yellow !== undefined">
          {{ areaTips.yellow }}<br>
        </span>
        <span v-if="areaTips.red !== undefined">
          {{ areaTips.red }}<br>
        </span>
      </Text>
    </template>
    <slot />
  </Wrap>
</template>
<script setup lang="ts">
import type { IAttrDescriptor } from '@modules/xml/game/attributes'
import type { Limit } from '@modules/xml/renderer'
import Wrap from '@renderer/components/wrap.vue'
import { areasToString, formatString } from '@utilities/strings/renderer'
import { Popover, Typography } from 'ant-design-vue'
import { computed, h, toRefs } from 'vue'
import { EDITOR_LOCALIZATION as texts } from '../../localization'
import type { IInputAreas, InputArea } from '../../types'

const { Text } = Typography
const popover = h(Popover, { placement: 'topLeft' })

export type InputTipProps = {
  descriptor: IAttrDescriptor<string | number>
  areas?: IInputAreas
}

const props = defineProps<InputTipProps>()
const { descriptor } = toRefs(props)

const areasRef = computed(() => props.areas ?? descriptor.value.areas)
const valueTips = computed(() => ({
  min: getValueTip((descriptor.value.limit as Limit)?.minValue, texts.inputMin, Number.NEGATIVE_INFINITY),
  max: getValueTip((descriptor.value.limit as Limit)?.maxValue, texts.inputMax, Number.POSITIVE_INFINITY),
  default: getValueTip(descriptor.value.default, texts.inputDefault),
  get hasAny() {
    return this.min !== undefined || this.max !== undefined || this.default !== undefined
  }
}))
const areaTips = computed(() => ({
  green: getAreaTip(areasRef.value?.green, texts.inputGreenArea),
  yellow: getAreaTip(areasRef.value?.yellow, texts.inputYellowArea),
  red: getAreaTip(areasRef.value?.red, texts.inputRedArea),
  get hasAny() {
    return this.green !== undefined || this.yellow !== undefined || this.red !== undefined
  }
}))

function getValueTip(
  limitValue: string | number | undefined,
  text: string,
  exclude?: number
): string | undefined {
  return limitValue === undefined || limitValue === exclude
    ? undefined
    : formatString(text, String(limitValue))
}

function getAreaTip(
  area: InputArea | InputArea[] | undefined,
  text: string
): string | undefined {
  return area
    ? formatString(text, areasToString(area))
    : undefined
}
</script>
