<template>
  <Group
    key="addons-content"
    :label="label"
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
    <div
      v-else
      class="wrapper"
    >
      <div class="main">
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
        v-if="config.advancedMode"
        class="open-file-btn"
        type="primary"
        @click="openFile"
      >
        {{ texts.openFile }}
      </Button>
    </div>
  </Group>
</template>

<script lang='ts' setup>
import { LocalizationStrings } from '@localization'
import type { IFile } from '@modules/files/renderer'
import { TruckAddon, XMLElement } from '@modules/xml/renderer'
import Spin from '@renderer/components/spin.vue'
import { hasItems } from '@utilities/checks/renderer'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, DLC_TOKEN, GAME_TEXTS_TOKEN, MESSAGES_TOKEN, SYSTEM_TOKEN } from '@utilities/di/renderer/tokens'
import type { SelectProps } from 'ant-design-vue'
import { Button, Input, Select, Typography } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useEditorStore } from '../../../../store/editor'
import type { IActionProps } from '../../../types'
import Group from '../../group/group.vue'
import type { ReadyEmits, ReadyProps } from '../../utilities'
import { useReady } from '../../utilities'
import { EXTRA_LOCALIZATION as texts } from '../localization'
import ContentField from './content-field.vue'

const { Text } = Typography

type OptionsType = SelectProps['options']

export type AddonsContentProps = ReadyProps & IActionProps

const config = di.resolve(CONFIG_TOKEN)
const { file, xml } = defineProps<IActionProps>()
const emit = defineEmits<ReadyEmits>()

const { info } = storeToRefs(useEditorStore())
const files = ref<IFile[]>([])
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
const label = computed(() => new LocalizationStrings()
	.ru('Содержимое аддонов')
	.en('Addons content')
	.de('Addon-Inhalt')
	.ch('附加组件')
	.get(config)
)

useReady(emit)

async function changeNameFilter(value = '') {
	if (!hasItems(files.value) || !allSelectOptions) {
		return
	}

	selectOptions.value = allSelectOptions
		.filter(({ label }) => label.toLowerCase().includes(value.toLowerCase()))
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
	if (hasItems(files.value)) {
		return
	}

	loadStatus.isLoading = true

	const onFind = () => void loadStatus.count++

	const addons = await getAddons(file.name, info.value.mod, isInstalled, onFind)
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
	const xml = await getTruckAddon(item)

	if (!xml) {
		throw new Error('DOM is undefined')
	}

	if (!item) {
		throw new Error('Path to addon not found')
	}
	
	let TruckData = xml.TruckData
	let hasAny = false

	if (!TruckData) {
		xml.appendTag('TruckData')
		TruckData = xml.TruckData!
	}

	if (content.fuel === 0) {
		TruckData.FuelCapacity = undefined
	} else {
		TruckData.FuelCapacity = content.fuel
		hasAny = true
	}

	if (content.water === 0) {
		TruckData.WaterCapacity = undefined
	} else {
		TruckData.WaterCapacity = content.water
		hasAny = true
	}

	if (content.wheels === 0) {
		TruckData.WheelRepairsCapacity = undefined
	} else {
		TruckData.WheelRepairsCapacity = content.wheels
		hasAny = true
	}

	if (content.repairs === 0) {
		TruckData.RepairsCapacity = undefined
	} else {
		TruckData.RepairsCapacity = content.repairs
		hasAny = true
	}

	if (!hasAny && !TruckData.hasAttrs()) {
		TruckData.remove()
	}

	await item.write(xml.baseXML)
	di.resolve(MESSAGES_TOKEN).success(texts.changed)
}

function openFile() {
	const file = getFile(addon.value)

	if (file) {
		void di.resolve(SYSTEM_TOKEN).openFile(file.path)
	}
}

function isInstalled(addonXML: TruckAddon): boolean {
	const InstallSocket = addonXML.GameData?.InstallSocket

	if (!InstallSocket) {
		return false
	}

	const type = InstallSocket.Type || 'no-type'

	return Boolean(
		xml.GameData?.AddonSockets?.some(
			({ Sockets }) => Sockets.some(
				({ Names }) => Names.includes(type)
			)
		)
	)
}

async function initSelectOptions(items: IFile[]): Promise<OptionsType> {
	return await Promise.all(
		items.map(async addon => ({
			value: addon.name,
			label: await getAddonName(addon)
		}))
	)
}

async function getAddonName(addon: IFile): Promise<string | undefined> {
	const xml = await getTruckAddon(addon)
	const uiDesc = xml?.GameData?.UiDesc
	const key = uiDesc
		? uiDesc.UiName
		: undefined

	return di.resolve(GAME_TEXTS_TOKEN).get(key, info.value.mod) || addon.name
}

function getFile(name?: string): IFile | undefined {
	return files.value.find(item => item.name === (name || addon.value))
}

async function getAddonData(file?: IFile) {
	if (!file) {
		return defaultContent
	}

	const addonXML = await TruckAddon.from(file)

	if (!addonXML) {
		return defaultContent
	}

	let TruckData = addonXML.TruckData

	if (!TruckData) {
		addonXML.appendTag('TruckData')
		TruckData = addonXML.TruckData!
	}

	const wheels = TruckData.WheelRepairsCapacity ?? defaultContent.wheels
	const repairs = TruckData.RepairsCapacity ?? defaultContent.repairs
	const fuel = TruckData.FuelCapacity ?? defaultContent.fuel
	const water = TruckData.WaterCapacity ?? defaultContent.water

	return {
		...defaultContent,
		...wheels ? { wheels } : {},
		...repairs ? { repairs } : {},
		...fuel ? { fuel } : {},
		...water ? { water } : {}
	}
}

async function getTruckAddon(file?: IFile): Promise<TruckAddon | undefined> {
	const addonFile = file ?? getFile()

	return await addonFile?.exists()
		? TruckAddon.from(addonFile!)
		: undefined
}

async function getAddons(
	truckName: string,
	mod?: string,
	filter?: (xml: TruckAddon) => boolean,
	every?: () => void | Promise<void>
): Promise<IFile[]> {
	const dirs = di.resolve(DIRS_TOKEN)
	
	const out: IFile[] = []
	const tuningDir = dirs.classes.dir(`trucks/${truckName}_tuning`)
	const inLoading = new Set<Promise<void>>()

	function filterFile(file: IFile) {
		inLoading.add((async () => {
			async function pushToOut(file: IFile) {
				out.push(file)
				await every?.()
			}

			if (filter) {
				const xml = await TruckAddon.from(file)

				if (xml && filter(xml)) {
					await pushToOut(file)
				}
			} else {
				await pushToOut(file)
			}
		})())
	}

	if (await tuningDir.exists()) {
		for (const entry of await tuningDir.read()) {
			if (await entry.isDir()) {
				continue
			}

			filterFile(entry.asFile())
		}
	}

	const baseDir = dirs.classes.dir('trucks/addons')
	if (await baseDir.exists()) {
		for (const entry of await baseDir.read()) {
			if (await entry.isDir()) {
				continue
			}

			filterFile(entry.asFile())
		}
	}

	for (const dlc of di.resolve(DLC_TOKEN)) {
		const DLCTrucks = dlc.dir.dir('classes/trucks')

		if (await DLCTrucks.exists()) {
			const DLCBasic = DLCTrucks.dir('addons')

			if (await DLCBasic.exists()) {
				for (const entry of await DLCBasic.read()) {
					if (await entry.isDir()) {
						continue
					}

					filterFile(entry.asFile())
				}
			}

			for (const entry of await DLCTrucks.read()) {
				if (!await entry.isDir() || !entry.basename().endsWith('_tuning')) {
					continue
				}

				for (const innerEntry of await entry.asDir().read()) {
					if (await innerEntry.isDir()) {
						continue
					}

					filterFile(innerEntry.asFile())
				}
			}
		}
	}

	if (mod) {
		for (const item of await dirs.modsTemp.dir(mod, 'classes').findFiles({ ext: 'xml', recursive: true })) {
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
.wrapper {
	width: 100%;
	height: 100%;
	margin-bottom: 10px;
	text-align: center;
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

.wrapper {
	width: 100%;
	text-align: center;

	.main {
		margin-bottom: 10px;
	}
}
</style>

