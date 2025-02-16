import type { InjectionKey } from 'vue'
import { inject, onMounted, onUnmounted, provide } from 'vue'
import ExportUtils from './export'
import type { IExportedData, IFile } from '/mods/renderer'
import { DLCs, Dialogs, Messages, Mods, TruckFileType, TruckXML } from '/mods/renderer'

export type ImportListener = (data: IExportedData) => void | Promise<void>

class ImportUtils {
  private readonly listeners = new Set<ImportListener>()

  onImport(listener: ImportListener) {
    onMounted(() => this.listeners.add(listener))
    onUnmounted(() => this.listeners.delete(listener))
  }

  getName = ExportUtils.getName

  async importFile(source: IFile, toImport?: IFile) {
    const chosen = toImport ?? Dialogs.getEPF()

    if (!chosen) {
      return
    }

    const xml = await TruckXML.from(source)

    if (!xml) {
      return
    }

    const data = await chosen.readFromJSON<IExportedData>()

    if (data.version !== ExportUtils.EXPORT_VERSION) {
      Messages.error('Unsupported file version')

      return
    }

    if (!data.info.some(item => (
      item.name === source.name
      && item.isTrailer === (xml.Type === TruckFileType.trailer)
      && item.dlc === DLCs.getDLC(source)
      && item.mod === Mods.getModID(source)
    ))) {
      Messages.error('The necessary parameters not found')

      return
    }

    return Promise.all([...this.listeners].map(async listener => await listener(data)))
  }
}

export const fileInjectKey: InjectionKey<IFile> = Symbol()
export const injectFile = () => inject(fileInjectKey)!
export const provideFile = (file: IFile) => provide(fileInjectKey, file)

export default new ImportUtils()
