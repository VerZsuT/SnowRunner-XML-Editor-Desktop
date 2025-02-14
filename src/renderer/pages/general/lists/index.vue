<template>
  <div class="lists">
    <Header :text="category === Category.trucks ? texts.trucksListTitle : texts.trailersListTitle">
      <template #extra>
        <Button
          class="header-button"
          shape="circle"
          @click="toggleFiltersPanel"
        >
          <template #icon>
            <FilterOutlined class="button-icon" />
          </template>
        </Button>
        <Button
          class="header-button"
          shape="circle"
          @click="toggleListMode"
        >
          <template #icon>
            <MenuOutlined
              v-if="listMode === ListMode.cards"
              class="button-icon"
            />
            <AppstoreOutlined
              v-else
              class="button-icon"
            />
          </template>
        </Button>
      </template>
    </Header>

    <Filters :is-open="filtersIsOpen" />
    <List
      v-if="files"
      :files="files[source]"
    />
    <Spin
      v-else
      center
    />
  </div>
</template>

<script lang='ts' setup>
import { AppstoreOutlined, FilterOutlined, MenuOutlined } from '@ant-design/icons-vue'
import { Button } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { Category, ListMode, SourceType } from '../enums'
import { useListStore } from '../store/list'
import { Filters, List } from './components'
import texts from './texts'
import { ItemsUtils } from './utils'
import type { File } from '/mods/renderer'
import { Helpers } from '/mods/renderer'
import { Header, Spin } from '/rend/components'
import { useKey } from '/rend/utils'

const listStore = useListStore()
const { files, category, source, listMode } = storeToRefs(listStore)
const { clearFiles, setListMode } = listStore

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

async function loadFiles() {
  const [main, dlc, mods] = await Promise.all([
    ItemsUtils.getMain(category.value),
    ItemsUtils.getDLC(category.value),
    ItemsUtils.getMods(category.value)
  ])

  addFiles(SourceType.main, main)
  addFiles(SourceType.dlc, dlc)
  addFiles(SourceType.mods, mods)
}

function addFiles(sourceType: SourceType, newFiles: File[]) {
  files.value[sourceType].push(...newFiles)
  files.value[sourceType].sort(sortByName)
}

function sortByName(a: File, b: File) {
  return a.name.localeCompare(b.name)
}

function toggleFiltersPanel() {
  filtersIsOpen.value = !filtersIsOpen.value
}

function toggleListMode() {
  setListMode(listMode.value === ListMode.cards
    ? ListMode.list
    : ListMode.cards
  )
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

  .header-button {
    position: relative;
    right: 20px;

    .button-icon {
      font-size: 25px;
    }
  }
}

</style>
