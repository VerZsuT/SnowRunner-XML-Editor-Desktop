import type { IExportedData } from '@modules/epf/types'
import type { IFile } from '@modules/files/types'
import { TruckFileType, TruckXML } from '@modules/xml/renderer'
import { di } from '@utilities/di/container'
import { DIALOGS_TOKEN, DLC_TOKEN, FILES_TOKEN, MESSAGES_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import type { InjectionKey } from 'vue'
import { inject, onMounted, onUnmounted, provide } from 'vue'
import { exportUtils } from './export'

export type ImportListener = (data: IExportedData) => void | Promise<void>

class ImportUtils {
  private readonly listeners = new Set<ImportListener>()

  onImport(listener: ImportListener) {
    onMounted(() => this.listeners.add(listener))
    onUnmounted(() => this.listeners.delete(listener))
  }

  getName = exportUtils.getName

  async importFile(source: IFile, toImport?: IFile) {
		const dialogs = di.resolve(DIALOGS_TOKEN)
    const chosenPath = toImport?.path ?? dialogs.getEPF()

    if (!chosenPath) {
      return
    }

    const xml = await TruckXML.from(source)

    if (!xml) {
      return
    }

		const files = di.resolve(FILES_TOKEN)
		const messages = di.resolve(MESSAGES_TOKEN)

		const chosenFile = files.new(chosenPath)
    const data = await chosenFile.readFromJSON<IExportedData>()

    if (data.version !== exportUtils.EXPORT_VERSION) {
      messages.error('Unsupported file version')

      return
    }

		const dlcs = di.resolve(DLC_TOKEN)
		const mods = di.resolve(MODS_TOKEN)

    if (!data.info.some(item => (
      item.name === source.name
      && item.isTrailer === (xml.Type === TruckFileType.trailer)
      && item.dlc === dlcs.getDLC(source)
      && item.mod === mods.getModID(source)
    ))) {
      messages.error('The necessary parameters not found')

      return
    }

    return Promise.all([...this.listeners].map(async listener => await listener(data)))
  }
}

export const importUtils = new ImportUtils()

export const fileInjectKey: InjectionKey<IFile> = Symbol()
export const injectFile = () => inject(fileInjectKey)!
export const provideFile = (file: IFile) => provide(fileInjectKey, file)
