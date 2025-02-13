<template>
  <div
    v-show="isShow"
    ref="container"
    class="card-container"
  >
    <ContextMenu
      :target="container"
      :items="contextMenuItems"
    />

    <div
      v-if="listMode === ListMode.list"
      class="row"
      @click="openEditor"
    >
      <img
        width="63"
        height="87"
        :src="imgSRC"
      >
      <div class="description">
        <Text class="title">
          {{ title.first }}<span class="red">{{ title.second }}</span>{{ title.last }}
        </Text>
        <div class="indicators-tags">
          <Tag v-if="files[SourceType.main].includes(file)">
            {{ texts.mainSource }}
          </Tag>
          <Tag v-else-if="files[SourceType.dlc].includes(file)">
            {{ texts.dlcSource }}
          </Tag>
          <Tag v-else-if="files[SourceType.mods].includes(file)">
            {{ texts.modsSource }}
          </Tag>
          <Tag v-if="texts[`${type}_TYPE`]">
            {{ texts[`${type}_TYPE`] }}
          </Tag>
          <Tag
            v-if="isFavorite"
            color="gold"
          >
            <StarFilled class="favorite-star" />
          </Tag>
          <Tag v-if="isEdited">
            <EditFilled class="edited-mark" />
          </Tag>
        </div>
      </div>
    </div>
    <Card
      v-else
      class="card"
      :loading="!xml || !imgSRC"
      hoverable
    >
      <template #cover>
        <img
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
      <div class="indicators">
        <StarFilled
          v-if="isFavorite"
          class="favorite-star"
        />
        <EditFilled
          v-if="isEdited"
          class="edited-mark"
        />
      </div>
    </Card>
  </div>
</template>

<script lang='ts' setup>
import { EditFilled, StarFilled } from '@ant-design/icons-vue'
import { Card, Tag, Typography } from 'ant-design-vue'
import memoizee from 'memoizee'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, shallowRef, toRefs, watch, watchEffect } from 'vue'
import { ListMode, SourceType, type Category } from '../../../enums'
import { useEditorStore, useListStore, usePageStore } from '../../../store'
import texts from '../../texts'
import { EditorUtils } from '../../utils'
import type { TruckType } from '/mods/renderer'
import { Edited, Favorites, GameTexts, Images, Messages, Mods, Page, TruckXML, type File } from '/mods/renderer'
import { ContextMenu } from '/rend/components'
import { prettyString } from '/utils/renderer'

const { Text } = Typography

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
const { name: nameFilter, truckType: typeFilter, files, listMode } = storeToRefs(listStore)
const { toggleFavorite, itemsCache } = listStore

const container = ref<HTMLDivElement | null>(null)
const xml = shallowRef<TruckXML | null>(null)
const imgSRC = ref<string>(Images.getDefault(category.value))
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

const isFavorite = computed(() => Favorites.isFavorite(file.value))
const isEdited = computed(() => Edited.isEdited(file.value))
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
  toggleFavorite(file.value)
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
    height: fit-content;

    .row {
      display: flex;
      box-sizing: border-box;
      width: calc(100vw - 20px);
      gap: 20px;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: flex-start;
      background: white;
      border-radius: 10px;
      box-shadow: 0 1px 2px 0 rgba(34, 60, 80, 0.6);
      overflow: hidden;
      cursor: pointer;
      transition: background-color 0.1s ease-in-out;

      &:hover {
        filter: brightness(96%);
      }

      img {
        box-shadow: 1px 0 3px 0 rgba(34, 60, 80, 0.6);
      }

      .description {
        .title {
          font-size: 16px;
          font-weight: bold;
        }

        .indicators-tags {
          margin-top: 10px;
        }
      }
    }
  }

  .indicators {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .favorite-star {
    color: yellow;
  }

  .edited-mark {
    color: white;
  }
}

.red {
  color: red;
}
</style>
