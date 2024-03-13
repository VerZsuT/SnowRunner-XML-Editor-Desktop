<template>
  <Group
    key="addons-content"
    :label="label.value"
    icon="wrench"
    @click="open = true"
  >
    <Spin v-if="!state.items" />
    <template v-else>
      <div class="main">
        <Text>
          {{ texts.addonName }}
        </Text><br>
        <Input
          class="addon-filter"
          type="text"
          :placeholder="texts.addonFilter"
          @blur="changeFilter($event.target?.['value'])"
        /><br>
        <Select
          class="addon-select"
          :value="state.addon"
          :options="options"
          @change="value => select(String(value))"
        />
      </div>
      <div class="grid ac-grid">
        <ContentField
          :value="state.wheels"
          :text="texts.addonWheels"
          @change="state.wheels = $event"
        />
        <ContentField
          :value="state.repairs"
          :text="texts.addonRepairs"
          @change="state.repairs = $event"
        />
        <ContentField
          :value="state.fuel"
          :text="texts.addonFuel"
          @change="state.fuel = $event"
        />
        <ContentField
          :value="state.water"
          :text="texts.addonWater"
          @change="state.water = $event"
        />
      </div>

      <Button
        class="save"
        type="primary"
        @click="save"
      >
        {{ texts.saveButton }}
      </Button>
    </template>
  </Group>
</template>

<script lang='ts' setup>
import type { SelectProps } from 'ant-design-vue'
import { Button, Input, Select, Typography } from 'ant-design-vue'
import { reactive, ref, watch } from 'vue'

import { useEditorStore } from '../../../../store'
import type { IActionProps } from '../../../types'
import Group from '../../group'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { useReady } from '../../utils'
import texts from '../texts'
import ContentField from './content-field.vue'

import type { File } from '/mods/renderer'
import { AddonXML, DLCs, Dirs, GameTexts, Lang, Messages, XMLElement } from '/mods/renderer'
import { Spin } from '/rend/components'
import { localize } from '/utils/texts/renderer'

const { Text } = Typography

type OptionsType = SelectProps['options']

export type AddonsContentProps = ReadyProps & IActionProps

const { file, xml } = defineProps<IActionProps>()
const emit = defineEmits<ReadyEmits>()

const { mod } = useEditorStore().info
const open = ref(false)
const options = ref<OptionsType>([])

const defaultVal = {
  wheels: 0,
  repairs: 0,
  fuel: 0,
  water: 0
}

const state = reactive({
  ...defaultVal,
  items: null as File[] | null,
  addon: ''
})

const label = localize({
  value: {
    [Lang.ru]: 'Содержимое аддонов',
    [Lang.en]: 'Addons content',
    [Lang.de]: 'Addon-Inhalt',
    [Lang.ch]: '附加组件的内容'
  }
})

let allOptions: OptionsType = []

useReady(emit)

watch(open, async () => {
  if (state.items) return

  const items = await getAddons(file.name, mod, isInstalled)
  const data = await getAddonData(items[0])

  allOptions = options.value = await initOptions(items)
  state.items = items
  state.addon = items[0].name
  state.wheels = data.wheels
  state.repairs = data.repairs
  state.fuel = data.fuel
  state.water = data.water
})

async function changeFilter(value = '') {
  if (!state.items || !allOptions) return
  options.value = allOptions.filter(({ label }) => label.toLowerCase().includes(value.toLowerCase()))
}

async function select(addonName: string) {
  const data = await getAddonData(getItem(addonName))

  state.addon = addonName
  state.wheels = data.wheels
  state.repairs = data.repairs
  state.fuel = data.fuel
  state.water = data.water
}

async function save() {
  const addon = getItem(state.addon)
  const xml = await getAddonXML(addon)

  if (!xml) throw new Error('DOM is undefined')
  if (!addon) throw new Error('Path to addon not found')
  
  let TruckData = xml.TruckData
  let hasAny = false

  if (!TruckData) {
    xml.appendTag('TruckData')
    TruckData = xml.TruckData!
  }

  if (state.fuel === 0) {
    TruckData.FuelCapacity = undefined
  }
  else {
    TruckData.FuelCapacity = state.fuel
    hasAny = true
  }

  if (state.water === 0) {
    TruckData.WaterCapacity = undefined
  }
  else {
    TruckData.WaterCapacity = state.water
    hasAny = true
  }

  if (state.wheels === 0) {
    TruckData.WheelRepairsCapacity = undefined
  }
  else {
    TruckData.WheelRepairsCapacity = state.wheels
    hasAny = true
  }

  if (state.repairs === 0) {
    TruckData.RepairsCapacity = undefined
  }
  else {
    TruckData.RepairsCapacity = state.repairs
    hasAny = true
  }

  if (!hasAny && !TruckData.hasAttrs()) {
    TruckData.remove()
  }

  await addon.write(xml.baseXML)
  Messages.success(texts.changed)
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

async function initOptions(items: File[]): Promise<OptionsType> {
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

function getItem(name?: string): File | undefined {
  return state.items?.filter(item => item.name === name ?? state.addon)[0]
}

async function getAddonData(file?: File) {
  if (!file) return defaultVal

  const addonXML = await AddonXML.from(file)
  if (!addonXML) return defaultVal

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
    ...defaultVal,

    ...wheels ? { wheels } : {},
    ...repairs ? { repairs } : {},
    ...fuel ? { fuel } : {},
    ...water ? { water } : {}
  }
}

async function getAddonXML(file?: File): Promise<AddonXML | undefined> {
  const addonFile = file ?? getItem()
  if (!await addonFile?.exists()) return

  return await AddonXML.from(addonFile!)
}

async function getAddons(truckName: string, mod?: string, filter?: (xml: AddonXML) => boolean): Promise<File[]> {
  const allAddons: File[] = []
  const out: File[] = []
  const tuningDir = Dirs.classes.dir(`trucks/${truckName}_tuning`)

  if (await tuningDir.exists()) {
    for (const entry of await tuningDir.read()) {
      if (await entry.isDir()) continue
      allAddons.push(entry.asFile())
    }
  }

  const baseDir = Dirs.classes.dir('trucks/addons')
  if (await baseDir.exists()) {
    for (const entry of await baseDir.read()) {
      if (await entry.isDir()) continue
      allAddons.push(entry.asFile())
    }
  }

  for (const dlc of DLCs) {
    const DLCTrucks = dlc.dir.dir('classes/trucks')

    if (await DLCTrucks.exists()) {
      const DLCBasic = DLCTrucks.dir('addons')

      if (await DLCBasic.exists()) {
        for (const entry of await DLCBasic.read()) {
          if (await entry.isDir()) continue
          allAddons.push(entry.asFile())
        }
      }

      for (const entry of await DLCTrucks.read()) {
        if (!await entry.isDir() || !entry.basename().endsWith('_tuning')) continue

        for (const innerEntry of await entry.asDir().read()) {
          if (await innerEntry.isDir()) continue
          allAddons.push(innerEntry.asFile())
        }
      }
    }
  }

  if (mod) {
    for (const item of await Dirs.modsTemp.dir(mod, 'classes').findFiles({ ext: 'xml', recursive: true })) {
      const element = await XMLElement.from(item)
      
      if (element?.has('TruckAddon')) {
        allAddons.push(item)
      }
    }
  }

  for (const addon of allAddons) {
    if (filter) {
      const xml = await AddonXML.from(addon)
      if (xml && filter(xml)) out.push(addon)
    }
    else {
      out.push(addon)
    }
  }

  return out
}
</script>

<style lang='scss' scoped>
.main {
  margin-bottom: 10px;
  text-align: center;
}

.ac-grid {
  justify-content: space-around;
}

.save {
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

