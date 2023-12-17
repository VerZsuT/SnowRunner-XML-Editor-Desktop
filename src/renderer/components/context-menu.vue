<template>
  <div
    v-if='show'
    class='context'
    @click='hide'
  >
    <Menu
      class='context-menu'
      :items='items'
      :style='{ top: pos.y + "px", left: pos.x + "px" }'
    />
  </div>
</template>

<script lang='ts' setup>
import type { ItemType } from 'ant-design-vue'
import { Menu } from 'ant-design-vue'
import { ComponentPublicInstance, computed, ref, toRefs, watch } from 'vue'

type Props = {
  items: ItemType[]
  class?: string
  target: ComponentPublicInstance | HTMLElement | null
}

type Emits = {
  close: []
  show: []
}

const props = defineProps<Props>()
const { target, items: propItems } = toRefs(props)
const emit = defineEmits<Emits>()

const show = ref(false)
const pos = ref({ x: 50, y: 50 })

const items = computed(() => propItems.value.map(item => {
  return {
    ...item,
    onClick() {
      item?.['onClick']?.()
      hide()
    }
  } as ItemType
}))

watch(target, () => {
  const value = target.value
  if (!value) return

  const element = '$el' in value ? value.$el : value
  element.addEventListener('contextmenu', (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    pos.value = { x: event.clientX, y: event.clientY }
    show.value = true
    emit('show')
  })
})

function hide() {
  show.value = false
  emit('close')
}
</script>

<style lang='scss' scoped>
.context {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  border: 1px gray;

  &-menu {
    position: absolute;
    border-radius: 5px;
  }
}
</style>
