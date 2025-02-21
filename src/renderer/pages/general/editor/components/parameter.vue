<template>
  <div
    ref="contextTarget"
    class="grid parameter"
  >
    <ContextMenu
      :items="contextItems"
      :target="contextTarget"
    />
    <div class="label">
      <Wrap
        :wrapper="popover"
        :wrap="!!descRef && Config.lang !== Lang.ch"
      >
        <template #content>
          <Text>{{ descRef }}</Text>
        </template>
        <Text>{{ labelRef }}</Text>
      </Wrap>
    </div>
    <div
      v-if="isActive"
      class="content"
    >
      <slot
        :value="value"
        :on-change="changeValue"
      />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Popover, Typography } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { computed, h, ref, toRefs } from 'vue'
import { useEditorStore } from '../../store'
import texts from '../texts'
import type { IParameterProps, ParameterEmits, ParameterValue } from '../types'
import { ExportUtils, ImportUtils, ResetUtils } from '../utils'
import { injectFile } from '../utils/import'
import { useActive } from './utils'
import { Config, Lang, type IExportedData } from '/mods/renderer'
import { ContextMenu, Wrap } from '/rend/components'
import type { EmitsToProps } from '/rend/types'
import { isNullable, isString } from '/utils/renderer'

const { Text } = Typography
const popover = h(Popover, { placement: 'topLeft' })

export type ParameterProps = IParameterProps & EmitsToProps<ParameterEmits>

const props = defineProps<IParameterProps>()
const { label, desc, descriptor } = toRefs(props)
const emit = defineEmits<ParameterEmits>()

defineSlots<{
  default(props: { value: ParameterValue; onChange(v: ParameterValue): void }): any
}>()

const labelRef = computed(() => label.value ?? descriptor.value.label)
const descRef = computed(() => desc.value ?? descriptor.value.desc)
const { info } = storeToRefs(useEditorStore())
const file = injectFile()

const { isActive } = useActive()

const getValue = props.getter ?? descriptor.value.get
const setValue = (value: ParameterValue) => {
  if (isString(value)) {
    descriptor.value.setStr(value)
  } else {
    (props.setter ?? descriptor.value.set)(value)
  }

  emit('change', getValue())
}

const value = ref(getValue() ?? '')

ResetUtils.onReset(resetValue)
ImportUtils.onImport(data => {
  const exportedValue = getExportedValue(data.data)

  if (isNullable(exportedValue)) {
    return
  }

  changeValue(exportedValue)
})
ExportUtils.onExport(data => {
  const fileName = ExportUtils.getName(file, info.value.dlc, info.value.mod)
  const fileData = data.data[fileName] ??= {}
  const selectorData = fileData[descriptor.value.selector] ??= {}

  selectorData[descriptor.value.name] = descriptor.value.getStr() ?? descriptor.value.get()
})

const contextTarget = ref<HTMLDivElement | null>(null)
const contextItems = [{
  key: 'reset-param',
  label: `${texts.resetMenuItemLabel} "${labelRef.value}"`,
  onClick: resetValue
}]

async function resetValue() {
  const defaultVal = await getDefaultValue()

  if (!defaultVal) {
    return
  }

  changeValue(defaultVal)
}

function changeValue(newValue: ParameterValue) {
  if (value.value === newValue) {
    return
  }
  
  setValue(newValue)
  value.value = getValue()
}

async function getDefaultValue() {
  return ResetUtils.getDefaultValue(file, info.value, descriptor.value)
}

function getExportedValue(data: IExportedData['data']): string | number | undefined {
  const name = ImportUtils.getName(file, info.value.dlc, info.value.mod)
  
  return data[name]
    ?.[descriptor.value.selector]
    ?.[descriptor.value.name]
}
</script>

<style lang="scss">
$parameterMinWidth: 650px;
$parameterMinWidthAddition: calc($parameterMinWidth / 10);

.table .ant-collapse-content .ant-collapse-content-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  padding: 10px !important;

  @media screen and (min-width: calc($parameterMinWidth * 2 + $parameterMinWidthAddition)) {
    > div:nth-last-child(1 of .grid) {
      flex: 0 0 auto;
    }
  }
}

@media screen and (min-width: calc($parameterMinWidth * 2 + $parameterMinWidthAddition)) {
  .table .ant-collapse-content .ant-collapse-content-box {
    justify-content: space-between;
  }
}
</style>

<style lang='scss' scoped>
$parameterMinWidth: 650px;
$parameterMinWidthAddition: calc($parameterMinWidth / 10);

.desc-image img {
  max-width: 600px;
  max-height: 500px;
}

.parameter {
  flex-wrap: nowrap;
  box-sizing: border-box;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 0;
  min-width: $parameterMinWidth;
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

  @media screen and (min-width: calc($parameterMinWidth * 2 + $parameterMinWidthAddition)) {
    .content {
      justify-content: flex-end;
      padding-right: 40px;
    }
  }
}

@media screen and (min-width: calc($parameterMinWidth * 2 + $parameterMinWidthAddition)) {
  .parameter {
    width: 50%;
    min-width: 50%;

    &:nth-child(2n+1) {
      border-right: 1px solid lightgray;
    }

    &:nth-child(2n) {
      flex: 1 1 0 !important;
    }
  }
}
</style>
