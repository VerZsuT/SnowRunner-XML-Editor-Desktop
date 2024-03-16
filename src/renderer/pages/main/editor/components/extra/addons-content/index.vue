<template>
  <Group
    key="addons-content"
    :label="label.value"
    icon="wrench"
  >
    <template v-if="!hasItems(files)">
      <div
        v-if="loadStatus.isLoading"
        class="loading"
      >
        <Spin />
        <Text>{{ texts.foundAddons }}: {{ loadStatus.count }}</Text><br>
      </div>
      <div
        v-else
        class="prepare"
      >
        <Button
          class="load-btn"
          type="primary"
          @click="loadAddons"
        >
          {{ texts.load }}
        </Button>
      </div>
    </template>
    <template v-else>
      <div class="main">
        <Text>
          {{ texts.addonName }}
        </Text><br>
        <Input
          class="addon-filter"
          type="text"
          :placeholder="texts.addonFilter"
          @blur="changeNameFilter($event.target?.['value'])"
        /><br>
        <Select
          class="addon-select"
          :value="addon"
          :options="selectOptions"
          @change="value => selectAddon(String(value))"
        />
      </div>
      <div class="grid ac-grid">
        <ContentField
          :value="content.wheels"
          :text="texts.addonWheels"
          @change="content.wheels = $event"
          @blur="saveAddonData"
        />
        <ContentField
          :value="content.repairs"
          :text="texts.addonRepairs"
          @change="content.repairs = $event"
          @blur="saveAddonData"
        />
        <ContentField
          :value="content.fuel"
          :text="texts.addonFuel"
          @change="content.fuel = $event"
          @blur="saveAddonData"
        />
        <ContentField
          :value="content.water"
          :text="texts.addonWater"
          @change="content.water = $event"
          @blur="saveAddonData"
        />
      </div>
      <Button
        v-if="Config.ref.advancedMode"
        class="open-file-btn"
        type="primary"
        @click="openFile"
      >
        {{ texts.openFile }}
      </Button>
    </template>
  </Group>
</template>

<script lang='ts' setup>
import type { SelectProps } from 'ant-design-vue'
import { Button, Input, Select, Typography } from 'ant-design-vue'
import { reactive, ref } from 'vue'

import { useEditorStore } from '../../../../store'
import type { IActionProps } from '../../../types'
import Group from '../../group'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { useReady } from '../../utils'
import texts from '../texts'
import ContentField from './content-field.vue'

import type { File } from '/mods/renderer'
import { AddonXML, Config, DLCs, Dirs, GameTexts, Helpers, Lang, Messages, XMLElement } from '/mods/renderer'
import { Spin } from '/rend/components'
import { hasItems } from '/utils/renderer'
import { localize } from '/utils/texts/renderer'

const { Text } = Typography

type OptionsType = SelectProps['options']

export type AddonsContentProps = ReadyProps & IActionProps

const { file, xml } = defineProps<IActionProps>()
const emit = defineEmits<ReadyEmits>()

const { mod } = useEditorStore().info
const files = ref<File[]>([])
const addon = ref('')

const selectOptions = ref<OptionsType>([])
let allSelectOptions: OptionsType = []

const content = reactive({
  wheels: 0,
  repairs: 0,
  fuel: 0,
  water: 0
})
const defaultContent = { ...content }

const loadStatus = reactive({
  isLoading: false,
  count: 0
})

const label = localize({
  value: {
    [Lang.ru]: 'Содержимое аддонов',
    [Lang.en]: 'Addons content',
    [Lang.de]: 'Addon-Inhalt',
    [Lang.ch]: '附加组件的内容'
  }
})

useReady(emit)

async function changeNameFilter(value = '') {
  if (!hasItems(files.value) || !allSelectOptions) return
  selectOptions.value = allSelectOptions.filter(({ label }) => label.toLowerCase().includes(value.toLowerCase()))
}

async function selectAddon(addonName: string) {
  const data = await getAddonData(getFile(addonName))

  addon.value = addonName

  content.wheels = data.wheels
  content.repairs = data.repairs
  content.fuel = data.fuel
  content.water = data.water
}

async function loadAddons() {
  if (hasItems(files.value)) return

  loadStatus.isLoading = true

  const onFind = () => { loadStatus.count++ }

  const addons = await getAddons(file.name, mod, isInstalled, onFind)
  const data = await getAddonData(addons[0])

  allSelectOptions = selectOptions.value = await initSelectOptions(addons)
  files.value = addons
  addon.value = addons[0].name

  content.wheels = data.wheels
  content.repairs = data.repairs
  content.fuel = data.fuel
  content.water = data.water

  loadStatus.isLoading = false
  loadStatus.count = 0
}

async function saveAddonData() {
  const item = getFile(addon.value)
  const xml = await getAddonXML(item)

  if (!xml) throw new Error('DOM is undefined')
  if (!item) throw new Error('Path to addon not found')
  
  let TruckData = xml.TruckData
  let hasAny = false

  if (!TruckData) {
    xml.appendTag('TruckData')
    TruckData = xml.TruckData!
  }

  if (content.fuel === 0) {
    TruckData.FuelCapacity = undefined
  }
  else {
    TruckData.FuelCapacity = content.fuel
    hasAny = true
  }

  if (content.water === 0) {
    TruckData.WaterCapacity = undefined
  }
  else {
    TruckData.WaterCapacity = content.water
    hasAny = true
  }

  if (content.wheels === 0) {
    TruckData.WheelRepairsCapacity = undefined
  }
  else {
    TruckData.WheelRepairsCapacity = content.wheels
    hasAny = true
  }

  if (content.repairs === 0) {
    TruckData.RepairsCapacity = undefined
  }
  else {
    TruckData.RepairsCapacity = content.repairs
    hasAny = true
  }

  if (!hasAny && !TruckData.hasAttrs()) {
    TruckData.remove()
  }

  await item.write(xml.baseXML)
  Messages.success(texts.changed)
}

function openFile() {
  const file = getFile(addon.value)
  if (file) {
    void Helpers.openFile(file.path)
  }
}

function isInstalled(addonXML: AddonXML): boolean {
  const InstallSocket = addonXML.GameData?.InstallSocket
  if (!InstallSocket) return false

  const type = InstallSocket.Type || 'no-type'
  return Boolean(
    xml.GameData?.AddonSockets?.some(
      ({ Sockets }) => Sockets.some(
        ({ Names }) => Names.includes(type)
      )
    )
  )
}

async function initSelectOptions(items: File[]): Promise<OptionsType> {
  return await Promise.all(
    items.map(async addon => ({
      value: addon.name,
      label: await getAddonName(addon)
    }))
  )
}

async function getAddonName(addon: File): Promise<string | undefined> {
  const xml = await getAddonXML(addon)
  const uiDesc = xml?.GameData?.UiDesc
  const key = uiDesc ? uiDesc.UiName : undefined

  return GameTexts.get(key, mod) || addon.name
}

function getFile(name?: string): File | undefined {
  return files.value.find(item => item.name === name ?? addon.value)
}

async function getAddonData(file?: File) {
  if (!file) return defaultContent

  const addonXML = await AddonXML.from(file)
  if (!addonXML) return defaultContent

  let TruckData = addonXML.TruckData
  if (!TruckData) {
    addonXML.appendTag('TruckData')
    TruckData = addonXML.TruckData!
  }

  const wheels = TruckData.WheelRepairsCapacity
  const repairs = TruckData.RepairsCapacity
  const fuel = TruckData.FuelCapacity
  const water = TruckData.WaterCapacity

  return {
    ...defaultContent,

    ...wheels ? { wheels } : {},
    ...repairs ? { repairs } : {},
    ...fuel ? { fuel } : {},
    ...water ? { water } : {}
  }
}

async function getAddonXML(file?: File): Promise<AddonXML | undefined> {
  const addonFile = file ?? getFile()
  if (!await addonFile?.exists()) return

  return await AddonXML.from(addonFile!)
}

async function getAddons(
  truckName: string,
  mod?: string,
  filter?: (xml: AddonXML) => boolean,
  every?: () => void | Promise<void>
): Promise<File[]> {
  const out: File[] = []
  const tuningDir = Dirs.classes.dir(`trucks/${truckName}_tuning`)
  const inLoading = new Set<Promise<void>>()

  function filterFile(file: File) {
    inLoading.add((async () => {
      async function pushToOut(file: File) {
        out.push(file)
        await every?.()
      }

      if (filter) {
        const xml = await AddonXML.from(file)
        if (xml && filter(xml)) await pushToOut(file)
      }
      else {
        await pushToOut(file)
      }
    })())
  }

  if (await tuningDir.exists()) {
    for (const entry of await tuningDir.read()) {
      if (await entry.isDir()) continue
      filterFile(entry.asFile())
    }
  }

  const baseDir = Dirs.classes.dir('trucks/addons')
  if (await baseDir.exists()) {
    for (const entry of await baseDir.read()) {
      if (await entry.isDir()) continue
      filterFile(entry.asFile())
    }
  }

  for (const dlc of DLCs) {
    const DLCTrucks = dlc.dir.dir('classes/trucks')

    if (await DLCTrucks.exists()) {
      const DLCBasic = DLCTrucks.dir('addons')

      if (await DLCBasic.exists()) {
        for (const entry of await DLCBasic.read()) {
          if (await entry.isDir()) continue
          filterFile(entry.asFile())
        }
      }

      for (const entry of await DLCTrucks.read()) {
        if (!await entry.isDir() || !entry.basename().endsWith('_tuning')) continue

        for (const innerEntry of await entry.asDir().read()) {
          if (await innerEntry.isDir()) continue
          filterFile(innerEntry.asFile())
        }
      }
    }
  }

  if (mod) {
    for (const item of await Dirs.modsTemp.dir(mod, 'classes').findFiles({ ext: 'xml', recursive: true })) {
      const element = await XMLElement.from(item)
      
      if (element?.has('TruckAddon')) {
        filterFile(item)
      }
    }
  }

  await Promise.all(inLoading)
  return out
}
</script>

<style lang='scss' scoped>
.prepare,
.loading,
.main {
  margin-bottom: 10px;
  text-align: center;
}

.prepare {
  height: 100%;
}

.ac-grid {
  justify-content: space-around;
}

.open-file-btn,
.load-btn {
  display: block !important;
  margin: 15px auto 0;
}

.addon {
  &-select {
    min-width: 200px;
    margin-top: 10px;
  }

  &-filter {
    width: 200px;
  }
}
</style>

