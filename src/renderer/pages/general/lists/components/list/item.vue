<template>
  <div
    v-show="isShow"
    ref="container"
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
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, shallowRef, toRefs, watch, watchEffect } from 'vue'
import type { Category } from '../../../enums'
import { useEditorStore, useListStore, usePageStore } from '../../../store'
import texts from '../../texts'
import { EditorUtils } from '../../utils'
import type { File, TruckType } from '/mods/renderer'
import { Favorites, GameTexts, Images, Messages, Mods, Page, TruckXML } from '/mods/renderer'
import { ContextMenu } from '/rend/components'
import { prettyString } from '/utils/renderer'

export type ListItemProps = {
  file: File
  category: Category
}

const props = defineProps<ListItemProps>()
const { file, category } = toRefs(props)

const editorStore = useEditorStore()
const { file: prevFile } = storeToRefs(editorStore)
const { clearEditorStore, setFile } = editorStore

const { route } = usePageStore()

const listStore = useListStore()
const { name: nameFilter, truckType: typeFilter } = storeToRefs(listStore)
const { toggleFavorite, itemsCache } = listStore

const contextTarget = shallowRef<HTMLImageElement | null>(null)
const container = ref<HTMLDivElement | null>(null)
const xml = shallowRef<TruckXML | null>(null)
const imgSRC = ref<string | null>(null)
const name = ref<string>('')
const type = ref<TruckType | undefined>()

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
const getType = memoizee((xml: TruckXML) => {
  return xml.TruckData?.TruckType
})

onMounted(() => {
  if (!container.value || !prevFile.value || !isShow.value || prevFile.value.path !== file.value.path) {
    return
  }

  container.value.scrollIntoView(false)
})

watch([file, xml, name], async () => {
  const cache = itemsCache.get(file.value.path)
  const xmlRes = cache
    ? cache.xml as TruckXML
    : await TruckXML.from(file.value)

  if (xmlRes) {
    itemsCache.set(file.value.path, { xml: xmlRes })
  }
  
  if (!xmlRes) {
    console.error(`Error on loading xml file ${file.value.path}`)
    name.value = 'ERROR'

    return
  }

  xml.value = xmlRes
  name.value = getName(file.value, xmlRes)
  type.value = getType(xmlRes)
}, { immediate: true })

watchEffect(async () => {
  if (!xml.value) {
    return
  }

  imgSRC.value = await Images.getSrc(category.value, file.value, xml.value)
})

const isShow = computed<boolean>(() => (
  (nameFilter.value
    ? name.value
        .toLowerCase()
        .includes(nameFilter.value.toLowerCase())
    : true
  )
  && (typeFilter.value && type.value
    ? type.value?.toLowerCase() === typeFilter.value.toLowerCase()
    : true
  )
))

const title = computed(() => {
  if (!nameFilter.value) {
    return {
      first: name.value,
      second: '',
      last: ''
    }
  }

  const firstIndex = name.value.toLowerCase().indexOf(nameFilter.value.toLowerCase())
  const lastIndex = firstIndex + nameFilter.value.length

  return {
    first: name.value.slice(0, firstIndex),
    second: name.value.slice(firstIndex, lastIndex),
    last: name.value.slice(lastIndex, name.value.length)
  }
})

const isFavorite = computed(() => Favorites.includes(file.value.name))
const contextMenuItems = computed(() => [
  {
    label: isFavorite.value
      ? texts.removeFavorite
      : texts.addFavorite,
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
  return EditorUtils
    .export([{ source: file.value }])
    .finally(Messages.loading(texts.processing))
}

async function importFile() {
  return EditorUtils
    .import([{ file: file.value }])
    .finally(Messages.loading(texts.processing))
}

async function resetFile() {
  return EditorUtils
    .reset([file.value])
    .finally(Messages.loading(texts.processing))
}

function openEditor() {
  clearEditorStore()
  setFile(file.value)
  route(Page.editor)
}

function toggleFav() {
  toggleFavorite(file.value.name)
}
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
