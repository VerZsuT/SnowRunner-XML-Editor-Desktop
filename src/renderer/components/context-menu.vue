<template>
  <div
    v-if="isShow"
    class="context"
    @click="hide"
  >
    <Menu
      class="context-menu"
      :items="menuItems"
      :style="{ top: position.y + 'px', left: position.x + 'px' }"
    />
  </div>
</template>

<script lang='ts' setup>
import type { ItemType } from 'ant-design-vue'
import { Menu } from 'ant-design-vue'
import type { ComponentPublicInstance } from 'vue'
import { computed, ref, toRefs, watch } from 'vue'
import type { EmitsToProps } from '../types'

export type ContextMenuProps = Props & EmitsToProps<Emits>

type Props = {
  /** Элементы меню. */
  items: ItemType[]

  /** Таргет контекстного меню. */
  target: ComponentPublicInstance | HTMLElement | null
}

type Emits = {
  /** Событие закрытия меню. */
  close: []

  /** Событие показа меню. */
  show: []
}

const props = defineProps<Props>()
const { target, items } = toRefs(props)
const emit = defineEmits<Emits>()

const isShow = ref(false)
const position = ref({ x: 50, y: 50 })

const menuItems = computed(() => items.value.map(item => {
  return {
    ...item,
    onClick() {
      item?.['onClick']?.()
      hide()
    }
  } as ItemType
}))

watch(target, handleTarget)

function handleTarget() {
  const value = target.value

  if (!value) {
    return
  }

  const element = '$el' in value
    ? value.$el
    : value

  element.addEventListener('contextmenu', (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    position.value = { x: event.clientX, y: event.clientY }
    isShow.value = true

    emit('show')
  })
}

function hide(event?: MouseEvent) {
  event?.stopPropagation()
  isShow.value = false

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
  
  &-menu {
    border: 1px solid lightgray;
    position: absolute;
    border-radius: 8px;
    border-inline-end-color: lightgray !important;
  }
}
</style>
