import { LocalizationStrings } from '@localization'
import { File, type IDir, type IFile } from '@modules/files/renderer'
import { TruckAddon } from '@modules/xml/renderer'
import { Spin } from '@renderer/components/spin'
import { useConfig } from '@renderer/utilities/use-reactive'
import { hasItems } from '@utilities/checks/renderer'
import { di } from '@utilities/di/container'
import { DIRS_TOKEN, DLC_TOKEN, FS_TOKEN, GAME_TEXTS_TOKEN, MESSAGES_TOKEN, SYSTEM_TOKEN } from '@utilities/di/renderer/tokens'
import type { SelectProps } from 'antd'
import { Button, Input, Select, Typography } from 'antd'
import { useRef, useState } from 'react'
import { useEditorStore } from '../../../../store/editor'
import type { IActionProps } from '../../../types'
import { Group } from '../../group/group'
import type { ReadyProps } from '../../utilities'
import { useReady } from '../../utilities'
import { EXTRA_LOCALIZATION as texts } from '../localization'
import { ContentField } from './content-field'
import './addons-content.scss'

const { Text } = Typography

/** Размер пачки файлов при массовом чтении. */
const READ_CHUNK = 100

/** Параметры содержимого аддонов. */
export type AddonsContentProps = ReadyProps & IActionProps

/** Содержимое аддона. */
interface AddonContent {
	/** Колёса. */
	wheels: number

	/** Запчасти. */
	repairs: number

	/** Топливо. */
	fuel: number

	/** Вода. */
	water: number
}

type OptionsType = SelectProps['options']

const DEFAULT_CONTENT: AddonContent = {
	wheels: 0,
	repairs: 0,
	fuel: 0,
	water: 0
}

const labelStrings = new LocalizationStrings()
	.ru('Содержимое аддонов')
	.en('Addons content')
	.de('Addon-Inhalt')
	.ch('附加组件')

/** Содержимое аддонов. */
export function AddonsContent({ file, xml, onReady, onMount }: AddonsContentProps) {
	const config = useConfig()
	const info = useEditorStore(state => state.info)
	const [files, setFiles] = useState<IFile[]>([])
	const [addon, setAddon] = useState('')
	const [selectOptions, setSelectOptions] = useState<OptionsType>([])
	const allSelectOptions = useRef<OptionsType>([])
	const [content, setContent] = useState<AddonContent>(() => ({ ...DEFAULT_CONTENT }))
	const [loadStatus, setLoadStatus] = useState({ isLoading: false, count: 0 })

	useReady({ onReady, onMount })

	function changeContent(key: keyof AddonContent, value: number) {
		setContent(state => ({ ...state, [key]: value }))
	}

	function changeNameFilter(value = '') {
		if (!hasItems(files) || !allSelectOptions.current) {
			return
		}

		setSelectOptions(allSelectOptions.current
			.filter(({ label }) => String(label).toLowerCase().includes(value.toLowerCase())))
	}

	async function selectAddon(addonName: string) {
		const data = await getAddonData(getFile(addonName))

		setAddon(addonName)
		setContent(data)
	}

	async function loadAddons() {
		if (hasItems(files)) {
			return
		}

		setLoadStatus({ isLoading: true, count: 0 })

		const onFind = () => setLoadStatus(state => ({ ...state, count: state.count + 1 }))

		const addons = await getAddons(file.name, info.mod, isInstalled, onFind)
		const data = await getAddonData(addons[0])

		allSelectOptions.current = await initSelectOptions(addons)
		setSelectOptions(allSelectOptions.current)
		setFiles(addons)

		if (addons[0]) {
			setAddon(addons[0].name)
		}

		setContent(data)
		setLoadStatus({ isLoading: false, count: 0 })
	}

	async function saveAddonData() {
		const item = getFile()

		if (!item) {
			throw new Error('Path to addon not found')
		}

		const addonXML = await getTruckAddon(item)

		if (!addonXML) {
			throw new Error('DOM is undefined')
		}

		let TruckData = addonXML.TruckData
		let hasAny = false

		if (!TruckData) {
			addonXML.appendTag('TruckData')
			TruckData = addonXML.TruckData!
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

		await item.write(addonXML.baseXML)
		di.resolve(MESSAGES_TOKEN).success(texts.changed)
	}

	function openFile() {
		const addonFile = getFile()

		if (addonFile) {
			void di.resolve(SYSTEM_TOKEN).openFile(addonFile.path)
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

	async function getAddonName(addonFile: IFile): Promise<string | undefined> {
		const addonXML = await getTruckAddon(addonFile)
		const uiDesc = addonXML?.GameData?.UiDesc
		const key = uiDesc
			? uiDesc.UiName
			: undefined

		return di.resolve(GAME_TEXTS_TOKEN).get(key, info.mod) || addonFile.name
	}

	function getFile(name?: string): IFile | undefined {
		return files.find(item => item.name === (name || addon))
	}

	async function getAddonData(addonFile?: IFile): Promise<AddonContent> {
		if (!addonFile) {
			return { ...DEFAULT_CONTENT }
		}

		const addonXML = await TruckAddon.from(addonFile)

		if (!addonXML) {
			return { ...DEFAULT_CONTENT }
		}

		let TruckData = addonXML.TruckData

		if (!TruckData) {
			addonXML.appendTag('TruckData')
			TruckData = addonXML.TruckData!
		}

		return {
			wheels: TruckData.WheelRepairsCapacity ?? DEFAULT_CONTENT.wheels,
			repairs: TruckData.RepairsCapacity ?? DEFAULT_CONTENT.repairs,
			fuel: TruckData.FuelCapacity ?? DEFAULT_CONTENT.fuel,
			water: TruckData.WaterCapacity ?? DEFAULT_CONTENT.water
		}
	}

	async function getTruckAddon(addonFile?: IFile): Promise<TruckAddon | undefined> {
		const file = addonFile ?? getFile()

		return await file?.exists()
			? TruckAddon.from(file!)
			: undefined
	}

	async function getAddons(
		truckName: string,
		mod?: string,
		filter?: (xml: TruckAddon) => boolean,
		every?: () => void | Promise<void>
	): Promise<IFile[]> {
		const dirs = di.resolve(DIRS_TOKEN)
		const fs = di.resolve(FS_TOKEN)
		const candidates: IFile[] = []

		async function collectFiles(dir: IDir) {
			if (!await dir.exists()) {
				return
			}

			candidates.push(...await dir.findFiles({ ext: 'xml' }))
		}

		async function collectTree(dir: IDir, filterPath: boolean) {
			const found = await fs.scan(dir.path, { kind: 'all', recursive: true })

			if (!found.ok) {
				return
			}

			const prefix = dir.path.toLowerCase()

			for (const info of found.value) {
				if (info.kind !== 'file' || !info.name.toLowerCase().endsWith('.xml')) {
					continue
				}

				if (filterPath) {
					const relative = info.path.toLowerCase().slice(prefix.length)

					if (!relative.includes('\\addons\\') && !relative.includes('_tuning\\')) {
						continue
					}
				}

				candidates.push(new File(info.path))
			}
		}

		await collectFiles(dirs.classes.dir(`trucks/${truckName}_tuning`))
		await collectFiles(dirs.classes.dir('trucks/addons'))

		for (const dlc of di.resolve(DLC_TOKEN)) {
			await collectTree(dlc.dir.dir('classes/trucks'), true)
		}

		if (mod) {
			await collectTree(dirs.modsTemp.dir(mod, 'classes'), false)
		}

		return await filterCandidates(candidates)

		/**
		 * Прочитать пачку файлов и оставить подходящие аддоны.
		 * @param files Файлы.
		 * @returns Подходящие файлы.
		 */
		async function filterCandidates(files: IFile[]): Promise<IFile[]> {
			const out: IFile[] = []

			for (let index = 0; index < files.length; index += READ_CHUNK) {
				const chunk = files.slice(index, index + READ_CHUNK)
				const contents = await fs.readMany(chunk.map(file => file.path))

				if (!contents.ok) {
					continue
				}

				for (let position = 0; position < chunk.length; position++) {
					const data = contents.value[position]

					if (data === null) {
						continue
					}

					const addonXml = await TruckAddon.from(data)

					if (!addonXml || (filter && !filter(addonXml))) {
						continue
					}

					out.push(chunk[position])
					await every?.()
				}
			}

			return out
		}
	}

	return (
		<Group label={labelStrings.get(config)} icon="wrench">
			{!hasItems(files)
				? loadStatus.isLoading
					? (
						<div className="addons-content loading">
							<Spin />
							<Text>{texts.foundAddons}: {loadStatus.count}</Text><br />
						</div>
					)
					: (
						<div className="addons-content prepare">
							<Button
								className="load-btn"
								type="primary"
								onClick={() => void loadAddons()}
							>
								{texts.load}
							</Button>
						</div>
					)
				: (
					<div className="addons-content wrapper">
						<div className="main">
							<Input
								className="addon-filter"
								type="text"
								placeholder={texts.addonFilter}
								onBlur={event => changeNameFilter(event.target.value)}
							/><br />
							<Select
								className="addon-select"
								value={addon || undefined}
								options={selectOptions}
								onChange={value => void selectAddon(String(value))}
							/>
						</div>
						<div className="grid ac-grid">
							<ContentField
								value={content.wheels}
								text={texts.addonWheels}
								onChange={value => changeContent('wheels', value)}
								onBlur={() => void saveAddonData()}
							/>
							<ContentField
								value={content.repairs}
								text={texts.addonRepairs}
								onChange={value => changeContent('repairs', value)}
								onBlur={() => void saveAddonData()}
							/>
							<ContentField
								value={content.fuel}
								text={texts.addonFuel}
								onChange={value => changeContent('fuel', value)}
								onBlur={() => void saveAddonData()}
							/>
							<ContentField
								value={content.water}
								text={texts.addonWater}
								onChange={value => changeContent('water', value)}
								onBlur={() => void saveAddonData()}
							/>
						</div>
						{config.advancedMode && (
							<Button
								className="open-file-btn"
								type="primary"
								onClick={openFile}
							>
								{texts.openFile}
							</Button>
						)}
					</div>
				)}
		</Group>
	)
}
