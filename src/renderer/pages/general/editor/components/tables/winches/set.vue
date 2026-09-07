<template>
  <Accordion>
    <Group
      v-for="(Winch, i) of xml.Winches"
      :key="`winch=${i}`"
      :label="getGameText(Winch.GameData?.UiDesc?.UiName, texts.winch, info.mod)"
    >
      <Info
        v-if="config.advancedMode"
        :descriptor="Winch.$Name"
      />
      <Int :descriptor="Winch.$Length" />
      <Float :descriptor="Winch.$StrengthMult" />
      <Select
        :descriptor="<any>Winch.$IsEngineIgnitionRequired"
        :options="[
          [true, texts.engine],
          [false, texts.battery]
        ]"
      />
      <template #groups>
        <UnlockPreset
          key="unlock"
          :element="Winch.GameData"
        />
      </template>
    </Group>
  </Accordion>
</template>

<script lang='ts' setup>
import type { IFile } from '@modules/files/renderer'
import type { WinchVariants } from '@modules/xml/renderer'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '../../../../store/editor'
import { provideFile } from '../../../utilities/import'
import { saveUtils } from '../../../utilities/save'
import Accordion from '../../accordion.vue'
import Group from '../../group/group.vue'
import Info from '../../info/info.vue'
import Float from '../../input/variants/float.vue'
import Int from '../../input/variants/int.vue'
import Select from '../../select/select.vue'
import type { ReadyEmits, ReadyProps } from '../../utilities'
import { getGameText, useReady } from '../../utilities'
import UnlockPreset from '../unlock-preset/unlock-preset.vue'
import { WINCHES_LOCALIZATION as texts } from './localization'

export type WinchSetProps = ReadyProps & Props

type Props = {
  xml: WinchVariants
  file: IFile
}

const config = di.resolve(CONFIG_TOKEN)
const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
saveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
