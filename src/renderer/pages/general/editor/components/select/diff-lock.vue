<template>
  <Select
    :descriptor="descriptor"
    :options="[
      [DiffLockType.none, texts.none],
      [DiffLockType.installed, texts.installed],
      [DiffLockType.uninstalled, texts.uninstalled],
      [DiffLockType.always, texts.always]
    ]"
    :disabled="isAlways && isAlwaysByDefault && !config.advancedMode"
    @change="$emit('change', $event)"
  />
</template>

<script lang='ts' setup>
import type { IStringAttrDescriptor } from '@modules/xml/game/attributes'
import { DiffLockType } from '@modules/xml/renderer'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { storeToRefs } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useEditorStore } from '../../../store/editor'
import type { ParameterEmits } from '../../types'
import { injectFile } from '../../utilities/import'
import { resetUtils } from '../../utilities/reset'
import { SELECT_LOCALIZATION as texts } from './localization'
import Select from './select.vue'

export type DiffLockProps = {
	descriptor: IStringAttrDescriptor<DiffLockType>
}

const config = di.resolve(CONFIG_TOKEN)
const props = defineProps<DiffLockProps>()
const { info } = storeToRefs(useEditorStore())
const file = injectFile()
const isAlwaysByDefault = ref<boolean>()
const isAlways = computed(() => props.descriptor.get() === DiffLockType.always)

watchEffect(async () => {
	const value = await resetUtils.getDefaultValue(file, info.value, props.descriptor)

	if (value) {
		isAlwaysByDefault.value = value === DiffLockType.always
	}
})

defineEmits<ParameterEmits>()
</script>
