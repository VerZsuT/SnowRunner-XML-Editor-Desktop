<template>
  <div
    v-show="isShow"
    class="card-container"
  >
    <Card
      class="card"
      :loading="!xml || !imgSRC"
      hoverable
    >
      <template
        v-if="imgSRC"
        #cover
      >
        <img
          ref="contextTarget"
          width="250"
          height="350"
          :src="imgSRC"
          @click="openEditor"
        >
      </template>
      <Card.Meta class="card-title">
        <template #title>
          {{ title.first }}<span class="red">{{ title.second }}</span>{{ title.last }}
        </template>
      </Card.Meta>
      <StarFilled
        v-if="isFavorite"
        class="fav-star"
      />
      <ContextMenu
        :target="contextTarget"
        :items="contextMenuItems"
      />
    </Card>
  </div>
</template>

<script lang='ts' setup>
import { StarFilled } from '@ant-design/icons-vue'
import { Card } from 'ant-design-vue'
import memoizee from 'memoizee'
import { computed, ref, shallowRef, toRefs, watchEffect } from 'vue'

import type { Category } from '../../../enums'
import { Page } from '../../../enums'
import { useEditorStore, useFilterStore, useListStore, usePageStore } from '../../../store'
import texts from '../../texts'
import { EditorUtils } from '../../utils'

import type { File } from '/mods/renderer'
import { Favorites, GameTexts, Images, Messages, Mods, TruckXML } from '/mods/renderer'
import { ContextMenu } from '/rend/components'
import { prettyString } from '/utils/renderer'

type Props = {
  file: File
  category: Category
}

const props = defineProps<Props>()
const { file, category } = toRefs(props)

const { filter } = useFilterStore()
const { setFile } = useEditorStore()
const { route } = usePageStore()
const { toggleFavorite } = useListStore()

const contextTarget = shallowRef<HTMLImageElement | null>(null)

const xml = shallowRef<TruckXML | null>(null)
const imgSRC = ref<string | null>(null)
const name = ref<string>('')

watchEffect(async () => {
  const xmlRes = await TruckXML.fromFile(file.value)
  if (!xmlRes) {
    console.log(`Error on loading xml file ${file.value.path}`)
    name.value = 'ERROR'
    return
  }
  xml.value = xmlRes
  name.value = getName(file.value, xml.value)
})

watchEffect(async () => {
  if (!xml.value) return
  imgSRC.value = await Images.getSrc(category.value, file.value, xml.value)
})

const isShow = computed<boolean>(() => {
  if (!filter.value) return true
  return name.value.toLowerCase().includes(filter.value.toLowerCase())
})
const title = computed(() => {
  if (!filter.value) {
    return {
      first: name.value,
      second: '',
      last: ''
    }
  }

  const firstIndex = name.value.toLowerCase().indexOf(filter.value.toLowerCase())
  const lastIndex = firstIndex + filter.value.length

  return {
    first: name.value.slice(0, firstIndex),
    second: name.value.slice(firstIndex, lastIndex),
    last: name.value.slice(lastIndex, name.value.length)
  }
})
const isFavorite = computed(() => Favorites.ref.includes(file.value.name))

const contextMenuItems = computed(() => [
  {
    label: isFavorite.value ? texts.removeFavorite : texts.addFavorite,
    key: 'toggle-favorite',
    onClick: toggleFav
  },
  {
    label: texts.export,
    key: 'export',
    onClick: exportFile
  },
  {
    label: texts.import,
    key: 'import',
    onClick: importFile
  },
  {
    label: texts.reset,
    key: 'reset',
    onClick: resetFile
  }
])

async function exportFile() {
  const hideLoading = Messages.loading(texts.processing)
  void EditorUtils.export([{ source: file.value }]).finally(hideLoading)
}

async function importFile() {
  const hideLoading = Messages.loading(texts.processing)
  void EditorUtils.import([{ file: file.value }]).finally(hideLoading)
}

function resetFile() {
  const hideLoading = Messages.loading(texts.processing)
  void EditorUtils.reset([file.value]).finally(hideLoading)
}

function openEditor() {
  setFile(file.value)
  route(Page.editor)
}

function toggleFav() {
  toggleFavorite(file.value.name)
}

const getName = memoizee((file: File, xml: TruckXML): string => {
  let name = prettyString(file.name)

  if (xml.GameData?.UiDesc) {
    const uiName = xml.GameData?.UiDesc?.UiName
    if (uiName) {
      name = GameTexts.get(uiName, Mods.getModID(file)) || uiName
    }
  }
  return name
})
</script>

<style lang='scss'>
.ant-card {
  &-body {
    padding: 15px !important;
  }

  &-meta-title {
    text-align: center;
  }
}
</style>

<style lang='scss' scoped>
.card {
  box-sizing: content-box;
  width: 250px;
  height: 400px;

  &-container {
    position: relative;
    margin-top: 20px;
  }

  .fav-star {
    color: yellow;
    position: absolute;
    top: 10px;
    left: 10px;
  }
}

.red {
  color: red;
}
</style>
