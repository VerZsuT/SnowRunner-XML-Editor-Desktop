import type { MessageBoxReturnValue } from 'electron'
import { dialog, nativeImage } from 'electron'

import { publicFunction } from 'emr-bridge'

import { DialogSourceType, DialogType } from '../enums'
import type { IPublic } from '../public'
import { Keys } from '../public'
import type { IDialogAlertParams, IDialogParams, IOpenDialogParams } from '../types'
import texts from './texts'

import { Dir, File, Files } from '/mods/files/main'
import { hasItems } from '/utils/checks/main'


export * from '../enums'
export type * from '../types'

/**
 * Вывод системных диалогов  
 * _main process_
*/
class Dialogs {
  /** Описания расширений файлов программы (для диалогов) */
  private readonly extNames = {
    epf: 'Editor params file',
    ecf: 'Editor configuration file',
    pak: 'Package file',
    xml: 'XML file'
  }

  constructor() { this.initPublic() }

  /** Выводит ошибку на экран */
  error(message: string): Promise<MessageBoxReturnValue> {
    return this.alert({
      type: 'warning',
      title: texts.error,
      message
    })
  }

  /** Открыть окно с сообщением */
  alert(params: IDialogAlertParams): Promise<MessageBoxReturnValue> {
    const {
      buttons = [texts.ok],
      noLink = false,
      type = 'info',
      title, message
    } = params
    const dialogParams = {
      icon: nativeImage.createFromPath(Files.icon.path),
      title,
      message,
      buttons,
      noLink,
      type
    }

    return dialog.showMessageBox(dialogParams)
  }

  /** Открыть окно выбора `.epf` файла */
  getEPF(): File | undefined {
    const path = this.openDialog<string>({ extention: 'epf' })
    return path ? new File(path) : undefined
  }

  /** Открыть окно сохранения `.epf` файла */
  saveEPF(defaultName: string): File | undefined {
    const path = this.openDialog<string>({
      type: DialogType.save,
      defaultPath: defaultName,
      extention: 'epf'
    })
    return path ? new File(path) : undefined
  }

  /** Открыть окно выбора `initial.pak` */
  getInitial(): File | undefined {
    const path = this.openDialog<string>({ extention: 'pak' })
    return path ? new File(path) : undefined
  }

  /** Открыть окно выбора папки */
  getDir(): Dir | undefined {
    const path = this.openDialog<string>({ source: DialogSourceType.dir })
    return path ? new Dir(path) : undefined
  }

  /** Открыть окно выбора папки */
  getDirs(): Dir[] | undefined {
    const paths = this.openDialog<string[]>({ properties: ['multiSelections', 'openDirectory'] })
    return paths && hasItems(paths) ? paths.map(path => new Dir(path)) : undefined
  }

  /** Открыть окно выбора папки */
  getPaks(): File[] | undefined {
    const paths = this.openDialog<string[]>({ properties: ['multiSelections', 'openFile'], extention: '.pak' })
    return paths && hasItems(paths) ? paths.map(path => new File(path)) : undefined
  }

  /** Открыть окно выбора нескольких `.epf` файлов */
  getMultiEPF(): File[] | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['openFile', 'multiSelections'],
      extention: 'epf'
    })
    return paths && hasItems(paths) ? paths.map(path => new File(path)) : undefined
  }

  /** Открыть окно выбора `.xml` файла */
  getXML(): File | undefined {
    const path = this.openDialog<string>({ extention: 'xml' })
    return path ? new File(path) : undefined
  }

  /** Открыть диалоговое окно */
  openDialog<T extends string | string[]>(params: IOpenDialogParams): T | undefined {
    const {
      type = DialogType.open,
      source = DialogSourceType.file,
      properties = (source === DialogSourceType.file
        ? ['openFile']
        : ['openDirectory']),
      defaultPath, extention
    } = params
    const dialogParams: IDialogParams = { properties }

    if (extention) {
      dialogParams.filters = [{
        name: this.extNames[extention],
        extensions: [extention]
      }]
    }

    if (type === DialogType.open) {
      const result = dialog.showOpenDialogSync(dialogParams)
      return Array.isArray(result)
        ? (dialogParams.properties?.includes('multiSelections')
          ? result as T
          : result[0] as T)
        : undefined
    }
    else {
      const result = dialog.showSaveDialogSync({
        defaultPath,
        filters: dialogParams.filters
      })

      return result ? result as T : undefined
    }
  }

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicFunction<IPublic[Keys.getEPF]>(Keys.getEPF, () => this.getEPF()?.path)
    publicFunction<IPublic[Keys.saveEPF]>(Keys.saveEPF, name => this.saveEPF(name)?.path)
    publicFunction<IPublic[Keys.getInitial]>(Keys.getInitial, () => this.getInitial()?.path)
    publicFunction<IPublic[Keys.getDir]>(Keys.getDir, () => this.getDir()?.path)
    publicFunction<IPublic[Keys.getXML]>(Keys.getXML, () => this.getXML()?.path)
    publicFunction<IPublic[Keys.getDirs]>(Keys.getDirs, () => this.getDirs()?.map(dir => dir.path))
    publicFunction<IPublic[Keys.getPaks]>(Keys.getPaks, () => this.getPaks()?.map(pak => pak.path))
  }
}

export default new Dialogs()
