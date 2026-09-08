import type { IExportedData } from '@modules/epf/types'
import type { IFile } from '@modules/files/types'
import { TruckFileType, TruckXML } from '@modules/xml/renderer'
import { di } from '@utilities/di/container'
import { DIALOGS_TOKEN, DLC_TOKEN, FILES_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import { onMounted, onUnmounted } from 'vue'

export type ExportListener = (data: IExportedData) => void | Promise<void>

class ExportUtils {
	readonly EXPORT_VERSION = '3.0'
	private readonly listeners = new Set<ExportListener>()

	onExport(listener: ExportListener) {
		onMounted(() => this.listeners.add(listener))
		onUnmounted(() => this.listeners.delete(listener))
	}

	getName(file: IFile, dlc?: string, mod?: string) {
		return `${file.name}_${dlc ?? mod ?? 'default'}`
	}

	async exportFile(file: IFile, toExport?: IFile): Promise<IExportedData | void> {
		const dialogs = di.resolve(DIALOGS_TOKEN)
		const chosenPath = toExport?.path ?? dialogs.saveEPF(file.name)

		if (!chosenPath) {
			return
		}

		const xml = await TruckXML.from(file)

		if (!xml) {
			return
		}

		let additionData: IExportedData = {
			version: this.EXPORT_VERSION,
			info: [],
			data: {},
			actionsData: {}
		}

		const files = di.resolve(FILES_TOKEN)
		const chosenFile = files.newFile(chosenPath)

		if (await chosenFile.exists()) {
			const chosedData = await chosenFile.readFromJSON<IExportedData>()

			if (chosedData.version === this.EXPORT_VERSION) {
				additionData = chosedData
			}
		}

		const dlcs = di.resolve(DLC_TOKEN)
		const mods = di.resolve(MODS_TOKEN)

		const dlc = dlcs.getDLC(file)
		const mod = mods.getModID(file)
		const isTrailer = xml.Type === TruckFileType.trailer
		const data: IExportedData = {
			version: this.EXPORT_VERSION,
			info: [...additionData.info ],
			data: { ...additionData.data },
			actionsData: { ...additionData.actionsData }
		}

		if (!data.info.some(item => item.name === file.name && item.dlc === dlc && item.mod === mod && item.isTrailer === isTrailer)) {
			data.info.push({
				name: file.name,
				isTrailer, dlc, mod
			})
		}

		await Promise.all([...this.listeners].map(async listener => await listener(data)))

		return chosenFile.writeToJSON(data)
	}
}

export const exportUtils = new ExportUtils()
