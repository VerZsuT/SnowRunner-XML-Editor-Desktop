<template>
  <div class="grid info">
    <div
      v-if="labelRef"
      class="label"
    >
      <Text>{{ labelRef }}</Text>
    </div>
    <div
      v-if="isActive"
      class="content"
    >
      <Text>{{ value }}</Text>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Typography } from 'ant-design-vue'
import { computed, toRefs } from 'vue'
import { useActive } from '../utils'
import type { IAttrDescriptor } from '/mods/xml/game/attributes'

const { Text } = Typography

export type InfoProps = {
  descriptor?: IAttrDescriptor
  label?: string
  getter?(): any
}

const props = defineProps<InfoProps>()
const { getter, descriptor, label } = toRefs(props)
const { isActive } = useActive()

const value = String(getter.value?.() ?? descriptor.value?.get())
const labelRef = computed(() => label.value ?? descriptor.value?.label)
</script>
  
<style lang='scss' scoped>
$infoMinWidth: 650px;
$infoMinWidthAddition: calc($infoMinWidth / 10);

.desc-image img {
  max-width: 600px;
  max-height: 500px;
}

.info {
  flex-wrap: nowrap;
  box-sizing: border-box;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 0;
  min-width: $infoMinWidth;
  min-height: 40px;

  .label,
  .content {
    box-sizing: border-box;
    width: 50%;
  }

  .label {
    padding-left: 30px;
  }

  .content {
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  @media screen and (min-width: calc($infoMinWidth * 2 + $infoMinWidthAddition)) {
    .content {
      justify-content: flex-end;
      padding-right: 40px;
    }
  }
}

@media screen and (min-width: calc($infoMinWidth * 2 + $infoMinWidthAddition)) {
  .info {
    width: 50%;
    min-width: 50%;

    &:nth-child(2n+1) {
      border-right: 1px solid lightgray;
    }
  }
}
</style>
