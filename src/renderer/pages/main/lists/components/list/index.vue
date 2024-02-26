<template>
  <div class='list'>
    <div class='mods-button-cont' v-if='srcType === SourceType.mods'>
      <Button type='primary' class='mods-button' @click='isShowMods = true'>
        {{ texts.modsChangeButton }}
      </Button>
    </div>
    <ModsPopup :show='isShowMods' @hide='hideModsPopup' />
    <ListItem
      v-for='item of listItems'
      :key='item.file.name'
      :file='item.file'
      :category='item.category'
    />
  </div>
</template>

<script lang='ts' setup>
import { Button, Modal } from 'ant-design-vue'
import { ref, toRefs, watchEffect } from 'vue'

import { useListStore } from '../../../store/list'
import texts from '../../texts'
import ModsPopup from '../mods-popup.vue'
import ListItem from './item.vue'

import { Category, SourceType } from '../../../enums'
import type { File } from '/mods/renderer'
import { Favorites, Helpers } from '/mods/renderer'

type Props = {
  srcType: SourceType
  files: File[]
}

const props = defineProps<Props>()
const { files, srcType } = toRefs(props)
const { category } = useListStore()

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
  function filterFiles(files: File[]): File[] {
    let filtered = files
    if (srcType.value === SourceType.favorites) {
      filtered = filtered.filter(value => Favorites.ref.includes(value.name))
    }
    return filtered
  }

  const items = ref<{ file: File, category: Category }[]>([])
  watchEffect(() => {
    items.value = filterFiles(files.value).map(file => ({ file, category: category.value }))
  })
  return items
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
