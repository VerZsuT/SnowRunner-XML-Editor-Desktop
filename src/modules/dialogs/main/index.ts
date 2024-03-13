import type { MessageBoxReturnValue } from 'electron'
import { dialog, nativeImage } from 'electron'

import { publicFunction } from 'emr-bridge'

import { DialogSourceType, DialogType } from '../enums'
import type { PubType } from '../public'
import { PubKeys } from '../public'
import type { IDialogAlertParams, IDialogParams, IOpenDialogParams } from '../types'
import texts from './texts'

import { Dir, File, Files } from '/mods/files/main'
import { HasPublic } from '/utils/bridge/main'
import { hasItems } from '/utils/checks/main'

export * from '../enums'
export type * from '../types'

/**
 * Вывод системных диалогов  
 * _main process_
*/
class Dialogs extends HasPublic {
  /** Описания расширений файлов программы (для диалогов) */
  private readonly extNames = {
    epf: 'Editor params file',
    ecf: 'Editor configuration file',
    pak: 'Package file',
    xml: 'XML file'
  }

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
      title, message, buttons, noLink, type
    }

    return dialog.showMessageBox(dialogParams)
  }

  /** Открыть окно выбора `.epf` файла */
  getEPF(): File | undefined {
    const path = this.openDialog<string>({
      extention: 'epf'
    })
    if (path) return new File(path)
  }

  /** Открыть окно сохранения `.epf` файла */
  saveEPF(defaultName: string): File | undefined {
    const path = this.openDialog<string>({
      type: DialogType.save,
      defaultPath: defaultName,
      extention: 'epf'
    })
    if (path) return new File(path)
  }

  /** Открыть окно выбора `initial.pak` */
  getInitial(): File | undefined {
    const path = this.openDialog<string>({
      extention: 'pak'
    })
    if (path) return new File(path)
  }

  /** Открыть окно выбора папки */
  getDir(): Dir | undefined {
    const path = this.openDialog<string>({
      source: DialogSourceType.dir
    })
    if (path) return new Dir(path)
  }

  /** Открыть окно выбора папки */
  getDirs(): Dir[] | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['multiSelections', 'openDirectory']
    })
    if (paths && hasItems(paths)) {
      return paths.map(path => new Dir(path))
    }
  }

  /** Открыть окно выбора папки */
  getPaks(): File[] | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['multiSelections', 'openFile'],
      extention: '.pak'
    })
    if (paths && hasItems(paths)) {
      return paths.map(path => new File(path))
    }
  }

  /** Открыть окно выбора нескольких `.epf` файлов */
  getMultiEPF(): File[] | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['openFile', 'multiSelections'],
      extention: 'epf'
    })
    if (paths && hasItems(paths)) {
      return paths.map(path => new File(path))
    }
  }

  /** Открыть окно выбора `.xml` файла */
  getXML(): File | undefined {
    const path = this.openDialog<string>({
      extention: 'xml'
    })
    if (path) return new File(path)
  }

  /** Открыть диалоговое окно */
  openDialog<T extends string | string[]>(params: IOpenDialogParams): T | undefined {
    const {
      type = DialogType.open,
      source = DialogSourceType.file,
      properties = (
        source === DialogSourceType.file
          ? ['openFile']
          : ['openDirectory']
        ),
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
      if (Array.isArray(result)) {
        return properties.includes('multiSelections')
          ? result as T
          : result[0] as T
      }
    }
    else {
      const result = dialog.showSaveDialogSync({
        defaultPath,
        filters: dialogParams.filters
      })

      if (result) return result as T
    }
  }

  /** Инициализация публичных объектов/методов */
  protected initPublic() {
    publicFunction<PubType[PubKeys.getEPF]>(PubKeys.getEPF, () => this.getEPF()?.path)
    publicFunction<PubType[PubKeys.saveEPF]>(PubKeys.saveEPF, name => this.saveEPF(name)?.path)
    publicFunction<PubType[PubKeys.getInitial]>(PubKeys.getInitial, () => this.getInitial()?.path)
    publicFunction<PubType[PubKeys.getDir]>(PubKeys.getDir, () => this.getDir()?.path)
    publicFunction<PubType[PubKeys.getXML]>(PubKeys.getXML, () => this.getXML()?.path)
    publicFunction<PubType[PubKeys.getDirs]>(PubKeys.getDirs, () => this.getDirs()?.map(dir => dir.path))
    publicFunction<PubType[PubKeys.getPaks]>(PubKeys.getPaks, () => this.getPaks()?.map(pak => pak.path))
  }
}

export default new Dialogs()
