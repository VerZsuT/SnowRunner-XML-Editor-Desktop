<template>
  <div
    v-if="files"
    ref="container"
    class="list"
  >
    <div
      v-if="source === SourceType.mods"
      class="mods-button-cont"
    >
      <Button
        type="primary"
        class="mods-button"
        @click="isShowMods = true"
      >
        {{ texts.modsChangeButton }}
      </Button>
    </div>
    <ModsPopup
      :show="isShowMods"
      @hide="hideModsPopup"
    />
    <ListItem
      v-for="item of listItems"
      :key="item.file.name"
      :file="item.file"
      :category="item.category"
      :style="{ display: files[source].includes(item.file) ? 'block' : 'none' }"
    />
  </div>
  <Spin
    v-else
    center
  />
</template>

<script lang='ts' setup>
import { Button, Modal } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'
import { SourceType } from '../../../enums'
import { useListStore } from '../../../store/list'
import texts from '../../texts'
import ModsPopup from '../mods-popup.vue'
import ListItem from './item.vue'
import { Helpers } from '/mods/renderer'
import { Spin } from '/rend/components'

const { category, source, files } = storeToRefs(useListStore())
const isShowMods = ref(false)
const container = ref<HTMLDivElement | null>(null)
const listItems = getItems()

useScrollResetting()

function hideModsPopup(isReload?: boolean) {
  isShowMods.value = false

  if (isReload) {
    setTimeout(() => {
      Modal.confirm({
        okText: texts.ok, cancelText: texts.cancel,
        title: texts.relaunchPrompt,
        onOk: () => Helpers.reloadApp()
      })
    }, 200)
  }
}

function getItems() {
  return computed(() => files.value[SourceType.all].map(file => ({ file, category: category.value })))
}

function useScrollResetting() {
  watch(files, async () => {
    await nextTick()
    container.value?.scrollTo({ top: 0 })
  })
}
</script>

<style lang='scss' scoped>
.list {
  display: flex;
  justify-content: space-evenly;
  overflow-y: auto;
  height: 100%;
  align-content: flex-start;
  flex-grow: 1;
  flex-direction: row;
  flex-wrap: wrap;
  will-change: auto;
  gap: 5px;
  padding: 10px 5px;
}

.mods-button-cont {
  text-align: center;
}

.mods-button {
  margin-bottom: 10px;

  &-cont {
    width: 100%;
    text-align: center;
  }
}
</style>
