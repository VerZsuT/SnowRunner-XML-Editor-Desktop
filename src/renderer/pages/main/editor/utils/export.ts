import { onMounted, onUnmounted } from 'vue'

import type { File, IExportedData } from '/mods/renderer'
import { DLCs, Dialogs, Mods, TruckFileType, TruckXML } from '/mods/renderer'

export type ExportListener = (data: IExportedData) => void | Promise<void>

class ExportUtils {
  readonly EXPORT_VERSION = '3.0'
  private readonly listeners = new Set<ExportListener>()

  onExport(listener: ExportListener) {
    onMounted(() => this.listeners.add(listener))
    onUnmounted(() => this.listeners.delete(listener))
  }

  getName(file: File, dlc?: string, mod?: string) {
    return `${file.name}_${dlc ?? mod ?? 'default'}`
  }

  async exportFile(file: File, toExport?: File): Promise<IExportedData | void> {
    const chosed = toExport ?? Dialogs.saveEPF(file.name)
    if (!chosed) return

    const xml = await TruckXML.fromFile(file)
    if (!xml) return

    let additionData: IExportedData = {
      version: this.EXPORT_VERSION,
      info: [], data: {}, actionsData: {}
    }
    if (chosed && await chosed.exists()) {
      const chosedData = await chosed.readFromJSON<IExportedData>()
      if (chosedData.version === this.EXPORT_VERSION) {
        additionData = chosedData
      }
    }

    const dlc = DLCs.getDLC(file)
    const mod = Mods.getModID(file)
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
    return chosed!.writeToJSON(data)
  }
}

export default new ExportUtils()
