<template>
  <Panel
    v-if="isParentActive"
    class="group"
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
      <img :src="images.getGroupIconSrc(icon)">
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
import ContextMenu from '@renderer/components/context-menu.vue'
import type { EmitsToProps } from '@renderer/types'
import { di } from '@utilities/di/container'
import { IMAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { Collapse } from 'ant-design-vue'
import { ref, useAttrs } from 'vue'
import { EDITOR_LOCALIZATION as texts } from '../../localization'
import type { IGroupProps } from '../../types'
import { resetUtils } from '../../utilities/reset'
import Accordion from '../accordion.vue'
import { provideGroupActive } from '../utilities'

const { Panel } = Collapse

export type GroupProps = IGroupProps & EmitsToProps<GroupEmits>

type GroupEmits = {
  click: []
}

const images = di.resolve(IMAGES_TOKEN)
const { icon, label } = defineProps<IGroupProps>()
defineEmits<GroupEmits>()

const contextTarget = ref<HTMLDivElement | null>(null)

const attrs = useAttrs()
const panelKey = String(attrs['panelKey']) || ''
const contextItems = [{
  key: 'reset-group',
  label: `${texts.resetMenuItemLabel} "${label}"`,
  onClick: onReset
}]

const { isParentActive } = provideGroupActive(panelKey)
const resetID = resetUtils.provide()

resetUtils.onReset(onReset)

function onReset() {
  return resetUtils.emit(resetID)
}
</script>

<style lang="scss">
.table .ant-collapse-header {
  &:hover {
    background: #e9e9e9;
  }
}
</style>

<style lang="scss" scoped>
.group {
  width: 100%;
}
</style>
