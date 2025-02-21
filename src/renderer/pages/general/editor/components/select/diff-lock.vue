<template>
  <Select
    :descriptor="descriptor"
    :options="[
      [DiffLockType.none, texts.none],
      [DiffLockType.installed, texts.installed],
      [DiffLockType.uninstalled, texts.uninstalled],
      [DiffLockType.always, texts.always]
    ]"
    :disabled="isAlways && isAlwaysByDefault && !Config.advancedMode"
    @change="$emit('change', $event)"
  />
</template>

<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useEditorStore } from '../../../store'
import type { ParameterEmits } from '../../types'
import { injectFile, ResetUtils } from '../../utils'
import Select from './index.vue'
import texts from './texts'
import { Config, DiffLockType } from '/mods/renderer'
import type { IStringAttrDescriptor } from '/mods/xml/game/attributes'

export type DiffLockProps = {
  descriptor: IStringAttrDescriptor<DiffLockType>
}

const props = defineProps<DiffLockProps>()
const { info } = storeToRefs(useEditorStore())
const file = injectFile()
const isAlwaysByDefault = ref<boolean>()
const isAlways = computed(() => props.descriptor.get() === DiffLockType.always)

watchEffect(async () => {
  const value = await ResetUtils.getDefaultValue(file, info.value, props.descriptor)

  if (value) {
    isAlwaysByDefault.value = value === DiffLockType.always
  }
})

defineEmits<ParameterEmits>()
</script>
