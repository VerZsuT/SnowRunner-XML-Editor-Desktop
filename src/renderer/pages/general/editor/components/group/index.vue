<template>
  <Panel
    v-if="isParentActive"
    force-render
  >
    <template #header>
      <ContextMenu
        :items="contextItems"
        :target="contextTarget"
      />
      <div
        ref="contextTarget"
        @click="$emit('click')"
      >
        {{ label }}
      </div>
    </template>
    <template
      v-if="icon"
      #extra
    >
      <img :src="Images.getGroupIconSrc(icon)">
    </template>
    <slot />
    <Accordion v-if="$slots['groups']">
      <slot name="groups" />
    </Accordion>
  </Panel>
  <div v-else>
    <slot />
    <slot name="groups" />
  </div>
</template>

<script lang='ts' setup>
import { Collapse } from 'ant-design-vue'
import { ref, useAttrs } from 'vue'
import texts from '../../texts'
import type { IGroupProps } from '../../types'
import { ResetUtils } from '../../utils'
import Accordion from '../accordion.vue'
import { provideGroupActive } from '../utils'
import { Images } from '/mods/renderer'
import { ContextMenu } from '/rend/components'
import type { EmitsToProps } from '/rend/types'

const { Panel } = Collapse

export type GroupProps = IGroupProps & EmitsToProps<GroupEmits>

type GroupEmits = {
  click: []
}

const { icon, label } = defineProps<IGroupProps>()
defineEmits<GroupEmits>()

const contextTarget = ref<HTMLDivElement | null>(null)

const attrs = useAttrs()
const panelKey = String(attrs['panelKey']) || ''
const contextItems = [{
  key: 'reset-group',
  label: `${texts.resetMenuItemLabel} ${label}`,
  onClick: onReset
}]

const { isParentActive } = provideGroupActive(panelKey)
const resetID = ResetUtils.provide()

ResetUtils.onReset(onReset)

function onReset() {
  return ResetUtils.emit(resetID)
}
</script>
