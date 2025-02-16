import { onMounted, onUnmounted } from 'vue'

import type { IExportedData, IFile } from '/mods/renderer'

export type EveryCallback = () => Promise<void> | void

export type ExportArgs = { source: IFile, toExport?: IFile }[]
export type ExportListener = (args: ExportArgs, every?: EveryCallback) => IExportedData | void | Promise<IExportedData | void>

export type ImportArgs = { file: IFile, toImport?: IFile }[]
export type ImportListener = (args: ImportArgs, every?: EveryCallback) => void | Promise<void>

export type ResetArgs = IFile[]
export type ResetListener = (args: ResetArgs, every?: EveryCallback) => void | Promise<void>

class EditorUtils {
  private exportListener?: ExportListener
  private importListener?: ImportListener
  private resetListener?: ResetListener

  onExport = (listener: ExportListener) => {
    onMounted(() => this.exportListener = listener)
    onUnmounted(() => this.exportListener = undefined)
  }

  onImport = (listener: ImportListener) => {
    onMounted(() => this.importListener = listener)
    onUnmounted(() => this.importListener = undefined)
  }

  onReset = (listener: ResetListener) => {
    onMounted(() => this.resetListener = listener)
    onUnmounted(() => this.resetListener = undefined)
  }
  
  async export(args: ExportArgs, every?: EveryCallback) {
    return args.length
      ? this.exportListener?.(args, every)
      : undefined
  }

  async import(args: ImportArgs, every?: EveryCallback) {
    const filtered: ImportArgs = []

    for (const item of args) {
      if (!item.toImport || await item.toImport?.exists()) {
        filtered.push(item)
      }
    }

    if (filtered.length) {
      await this.importListener?.(filtered, every)
    }
  }

  async reset(args: ResetArgs, every?: EveryCallback) {
    if (args.length) {
      await this.resetListener?.(args, every)
    }
  }
}

export default new EditorUtils()
