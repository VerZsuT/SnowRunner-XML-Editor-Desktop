<template>
  <div class='lists'>
    <Header :text='category === Category.trucks ? texts.trucksListTitle : texts.trailersListTitle'>
      <template #extra>
        <Search />
      </template>
    </Header>
  
    <Tabs class='tabs' :active-key='category' @change='setCategory($event as Category)'>
      <TabPane :key='Category.trucks'>
        <template #tab>
          <Text>{{ texts.trucksCategoryTitle }}</Text>
        </template>
      </TabPane>
      <TabPane :key='Category.trailers'>
        <template #tab>
          <Text>{{ texts.trailersCategoryTitle }}</Text>
        </template>
      </TabPane>
    </Tabs>
    
    <Tabs class='tabs' :active-key='source' @change='setSource($event as SourceType)'>
      <TabPane :key='SourceType.main'>
        <template #tab>
          <AppstoreOutlined class='tab-icon' />
          <Text>{{ texts.mainListTitle }}</Text>
        </template>
      </TabPane>
      <TabPane :key='SourceType.dlc'>
        <template #tab>
          <AppstoreAddOutlined class='tab-icon' />
          <Text>{{ texts.dlcListTitle }}</Text>
        </template>
      </TabPane>
      <TabPane :key='SourceType.mods' :disabled='!Config.ref.useMods'>
        <template #tab>
          <ApiOutlined class='tab-icon' />
          <Text>{{ texts.modsListTitle }}</Text>
        </template>
      </TabPane>
      <TabPane :key='SourceType.favorites'>
        <template #tab>
          <StarFilled class='tab-icon' />
          <Text>{{ texts.favoritesListTitle }}</Text>
        </template>
      </TabPane>
    </Tabs>
  
    <template v-if='files'>
      <List
        v-show='source === SourceType.main'
        :src-type='SourceType.main'
        :files='files[SourceType.main]'
      />
      <List
        v-show='source === SourceType.dlc'
        :src-type='SourceType.dlc'
        :files='files[SourceType.dlc]'
      />
      <List
        v-show='source === SourceType.mods'
        :src-type='SourceType.mods'
        :files='files[SourceType.mods]'
      />
      <List
        v-show='source === SourceType.favorites'
        :src-type='SourceType.favorites'
        :files='files[SourceType.favorites]'
      />
    </template>
    <Spin v-else center />
  </div>
</template>

<script lang='ts' setup>
import { TabPane, Tabs, Typography } from 'ant-design-vue'
import { onMounted, ref, watch, watchEffect } from 'vue'

import { ApiOutlined, AppstoreAddOutlined, AppstoreOutlined, StarFilled } from '@ant-design/icons-vue'

import { Category, SourceType } from '../enums'
import { useListStore } from '../store/list'
import { List, Search } from './components'
import texts from './texts'
import { ItemsUtils } from './utils'

import type { File } from '/mods/renderer'
import { Config, Helpers, ProgramWindow, Windows } from '/mods/renderer'
import { Header, Spin } from '/rend/components'
import { useKey } from '/rend/utils'

const { Text } = Typography

interface IFiles {
  [SourceType.main]: File[]
  [SourceType.dlc]: File[]
  [SourceType.mods]: File[]
  [SourceType.favorites]: File[]
}

const { category, source, setCategory, setSource } = useListStore()
const files = ref<IFiles | null>(null)

watch(category, () => files.value = null)
watchEffect(async () => {
  const [main, dlc, mods] = await Promise.all([
    ItemsUtils.getMain(category.value),
    ItemsUtils.getDLC(category.value),
    ItemsUtils.getMods(category.value)
  ])
  files.value = {
    [SourceType.main]: main,
    [SourceType.dlc]: dlc,
    [SourceType.mods]: mods,
    [SourceType.favorites]: [...main, ...dlc, ...mods]
  }
})

useKey('Escape', () => Helpers.quitApp())
onMounted(() => openWhatsNew())

function openWhatsNew() {
  if (Config.openWhatsNew) {
    void Windows.openWindow(ProgramWindow.whatsNew)
    Config.openWhatsNew = false
  }
}
</script>

<style lang='scss'>
body {
  background-color: #e7ebf0;
}

.ant-tabs-nav-list {
  justify-content: space-evenly;
  width: 100%;
}
</style>

<style lang='scss' scoped>
.lists {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: calc(100vh - 100px);
}

.tabs {
  background-color: white;
  height: 54px;

  [role="tablist"] {
    margin-bottom: 0;
  }

  span {
    font-size: 18px;
  }

  &:hover {
    color: black;
  }

  div[role="tab"] {
    color: #5c5c5c;

    &:hover,
    &[aria-selected="true"] span {
      color: black;
    }
  }

  div[role="tablist"]::before {
    color: black;
  }

  :global(.ant-tabs-ink-bar) {
    background-color: black;
  }
}

.tab-icon {
  position: relative;
  font-size: 25px !important;
  top: 3px;
}
</style>
