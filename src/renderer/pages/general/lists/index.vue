<template>
  <div class="lists">
    <Header :text="category === Category.trucks ? texts.trucksListTitle : texts.trailersListTitle">
      <template #extra>
        <Button
          class="filters-button"
          shape="circle"
          @click="toggleFiltersPanel"
        >
          <template #icon>
            <FilterOutlined style="font-size: 25px" />
          </template>
        </Button>
      </template>
    </Header>

    <Filters :is-open="filtersIsOpen" />
    
    <template v-if="files">
      <List
        v-show="source === SourceType.main"
        :src-type="SourceType.main"
        :files="files[SourceType.main]"
      />
      <List
        v-show="source === SourceType.dlc"
        :src-type="SourceType.dlc"
        :files="files[SourceType.dlc]"
      />
      <List
        v-show="source === SourceType.mods"
        :src-type="SourceType.mods"
        :files="files[SourceType.mods]"
      />
      <List
        v-show="source === SourceType.favorites"
        :src-type="SourceType.favorites"
        :files="files[SourceType.favorites]"
      />
    </template>
    <Spin
      v-else
      center
    />
  </div>
</template>

<script lang='ts' setup>
import { FilterOutlined } from '@ant-design/icons-vue'
import { Button } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { Category, SourceType } from '../enums'
import { useListStore } from '../store/list'
import { Filters, List } from './components'
import texts from './texts'
import { ItemsUtils } from './utils'
import type { File } from '/mods/renderer'
import { Helpers } from '/mods/renderer'
import { Header, Spin } from '/rend/components'
import { useKey } from '/rend/utils'

const listStore = useListStore()
const { files, category, source } = storeToRefs(listStore)
const { clearFiles } = listStore

const filtersIsOpen = ref(true)

watch(category, async () => {
  clearFiles()
  await loadFiles()
})

useKey('Escape', () => Helpers.quitApp())
onMounted(async () => {
  if (files.value[SourceType.main].length === 0) {
    await loadFiles()
  }
})

function loadFiles() {
  return Promise.all([
    ItemsUtils.getMain(category.value)
      .then(main => pushToFiles(SourceType.main, main)),
    ItemsUtils.getDLC(category.value)
      .then(dlc => pushToFiles(SourceType.dlc, dlc)),
    ItemsUtils.getMods(category.value)
      .then(mods => pushToFiles(SourceType.mods, mods))
  ]) 
}
  
function pushToFiles(source: SourceType, array: File[]) {
  const favorites = files.value[SourceType.favorites]

  for (const file of array) {
    files.value[source].push(file)

    if (!favorites.includes(file)) {
      favorites.push(file)
    }
  }
}

function toggleFiltersPanel() {
  filtersIsOpen.value = !filtersIsOpen.value
}
</script>

<style lang='scss'>
.ant-tabs-nav-list {
  justify-content: space-evenly;
  width: 100%;
}

.ant-btn-circle,
.anticon-arrow-left,
.anticon-menu.menu-button.ant-dropdown-trigger {
  color: white;
  background: inherit;
  border: none;

  &:hover {
    color: lightgray !important;
  }
}
</style>

<style lang='scss' scoped>
.lists {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: calc(100vh - 100px);
}

.filters-button {
  position: relative;
  right: 20px;
}
</style>
