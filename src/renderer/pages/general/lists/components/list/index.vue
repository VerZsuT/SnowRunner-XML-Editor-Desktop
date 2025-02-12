<template>
  <div class="list">
    <div
      v-if="srcType === SourceType.mods"
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
    />
  </div>
</template>

<script lang='ts' setup>
import { Button, Modal } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { ref, toRefs, watchEffect } from 'vue'
import type { Category } from '../../../enums'
import { SourceType } from '../../../enums'
import { useListStore } from '../../../store/list'
import texts from '../../texts'
import ModsPopup from '../mods-popup.vue'
import ListItem from './item.vue'
import type { File } from '/mods/renderer'
import { Favorites, Helpers } from '/mods/renderer'

export type ListProps = {
  srcType: SourceType
  files: File[]
}

const props = defineProps<ListProps>()
const { files, srcType } = toRefs(props)

const { category } = storeToRefs(useListStore())
const isShowMods = ref(false)
const listItems = useFilteredItems()

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

function useFilteredItems() {
  const items = ref<{ file: File, category: Category }[]>([])
  
  watchEffect(() => {
    items.value = filterFiles(files.value).map(file => ({ file, category: category.value }))
  })

  return items
}

function filterFiles(files: File[]): File[] {
  let filtered = files

  if (srcType.value === SourceType.favorites) {
    filtered = filtered.filter(value => Favorites.includes(value.name))
  }
  
  return filtered
}
</script>

<style lang='scss' scoped>
.list {
  display: flex;
  justify-content: space-evenly;
  overflow-y: auto;
  height: 100%;
  flex-grow: 1;
  flex-direction: row;
  flex-wrap: wrap;
  will-change: auto;
  padding-bottom: 20px;

  > div {
    overflow-x: hidden !important;
  }
}

.mods-button-cont {
  text-align: center;
}

.mods-button {
  margin-bottom: 10px;

  &-cont {
    position: relative;
    width: 100%;
    top: 15px;
    text-align: center;
  }
}
</style>
