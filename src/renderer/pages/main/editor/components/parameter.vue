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
      <Text>{{ label }}</Text>
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
import { Typography } from 'ant-design-vue'
import { ref } from 'vue'
import { ref, toRefs } from 'vue'

import { useEditorStore } from '../../store'
import texts from '../texts'
import type { IParameterProps, ParameterEmits, ParameterValue } from '../types'
import { ExportUtils, ImportUtils, ResetUtils } from '../utils'
import { injectFile } from '../utils/import'
import { useActive } from './utils'

import type { IExportedData } from '/mods/renderer'
import { ContextMenu } from '/rend/components'
import type { EmitsToProps } from '/rend/types'
import { isNullable, isString } from '/utils/renderer'

const { Text } = Typography

export type ParameterProps = IParameterProps & EmitsToProps<ParameterEmits>

const props = defineProps<IParameterProps>()
const emit = defineEmits<ParameterEmits>()

defineSlots<{
  default(props: { value: ParameterValue; onChange(v: ParameterValue): void }): any
}>()

const { info } = useEditorStore()
const file = injectFile()

const { utils } = props
const { label } = toRefs(props)
const { isActive } = useActive()

const getValue = props.getter ?? utils.get
const setValue = (value: ParameterValue) => {
  if (isString(value) && utils['setStr']) {
    utils['setStr'](value)
  }
  else {
    (props.setter ?? utils.set)(value)
  }
  emit('change', getValue())
}

const defaultValue = getValue()
const value = ref(defaultValue ?? '')

ResetUtils.onReset(resetValue)
ImportUtils.onImport(data => {
  const exportedValue = getExportedValue(data.data)
  if (isNullable(exportedValue)) return

  changeValue(exportedValue)
})
ExportUtils.onExport(data => {
  const fileName = ExportUtils.getName(file, info.dlc, info.mod)
  const fileData = data.data[fileName] ??= {}
  const selectorData = fileData[utils.selector] ??= {}

  selectorData[utils.name] = utils['getStr']?.() ?? utils.get()
})

const contextTarget = ref<HTMLDivElement | null>(null)
const contextItems = [{
  key: 'reset-param',
  label: `${texts.resetMenuItemLabel} ${label.value}`,
  onClick: resetValue
}]

async function resetValue() {
  const defaultVal = await getDefaultValue()
  if (!defaultVal) return

  changeValue(defaultVal)
}

function changeValue(newValue: ParameterValue) {
  if (value.value === newValue) return
  
  setValue(newValue)
  value.value = getValue()
}

async function getDefaultValue() {
  const defaults = (await import('/mods/data/defaults/renderer')).default
  return getExportedValue(defaults)
}

function getExportedValue(data: IExportedData['data']): string | number | undefined {
  const name = ImportUtils.getName(file, info.dlc, info.mod)
  return data[name]?.[utils.selector]?.[utils.name]
}
</script>

<style lang='scss' scoped>
.parameter {
  flex-wrap: nowrap;
  box-sizing: border-box;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .label,
  .content {
    box-sizing: border-box;
    width: 50%;
  }

  .label {
    padding-left: 20px;
  }

  .content {
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
