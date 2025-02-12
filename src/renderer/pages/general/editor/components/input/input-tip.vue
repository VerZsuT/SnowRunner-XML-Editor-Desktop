<template>
  <Popover
    v-if="valueTips.hasAny || areaTips.hasAny"
    placement="topLeft"
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
    <slot name="default" />
  </Popover>
  <slot
    v-else
    name="default"
  />
</template>
<script setup lang="ts">
import { Popover, Typography } from 'ant-design-vue'
import { computed, toRefs } from 'vue'
import texts from '../../texts'
import type { IInputAreas, InputArea } from '../../types'
import type { IAttrDescriptor } from '/mods/xml/game/attributes'
import { areasToString, formatString } from '/utils/strings/renderer'

const { Text } = Typography

export type InputTipProps = {
  descriptor: IAttrDescriptor<string | number>
  areas?: IInputAreas
}

const props = defineProps<InputTipProps>()
const { descriptor, areas } = toRefs(props)

const valueTips = computed(() => ({
  min: getValueTip(descriptor.value.limit?.minValue, texts.inputMin, Number.NEGATIVE_INFINITY),
  max: getValueTip(descriptor.value.limit?.maxValue, texts.inputMax, Number.POSITIVE_INFINITY),
  default: getValueTip(descriptor.value.default, texts.inputDefault),
  get hasAny() {
    return this.min !== undefined || this.max !== undefined || this.default !== undefined
  }
}))
const areaTips = computed(() => ({
  green: getAreaTip(areas.value?.green, texts.inputGreenArea),
  yellow: getAreaTip(areas.value?.yellow, texts.inputYellowArea),
  red: getAreaTip(areas.value?.red, texts.inputRedArea),
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
