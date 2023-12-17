<template>
  <Collapse @change='emit("click")'>
    <Panel forceRender>
      <ContextMenu :items='contextItems' :target='contextTarget' />
      <template #header>
        <div ref='contextTarget'>
          {{ label }}
        </div>
      </template>
      <template v-if='icon' #extra>
        <img :src='Images.getGroupIconSrc(icon)' />
      </template>
      <slot />
    </Panel>
  </Collapse>
</template>

<script lang='ts' setup>
import { Collapse } from 'ant-design-vue'
import { ref } from 'vue'
import texts from '../../texts'
import { IGroupProps } from '../../types'
import { ResetUtils } from '../../utils'
import { Images } from '/mods/renderer'
import { ContextMenu } from '/rend/components'

const { Panel } = Collapse

type Emits = {
  click: []
}

const emit = defineEmits<Emits>()
const { icon, label } = defineProps<IGroupProps>()

const contextTarget = ref<HTMLDivElement | null>(null)
const contextItems = [{
  key: 'reset-group',
  label: `${texts.resetMenuItemLabel} ${label}`,
  onClick: onReset
}]

const resetID = ResetUtils.provide()
ResetUtils.onReset(onReset)

function onReset() {
  return ResetUtils.emit(resetID)
}
</script>
