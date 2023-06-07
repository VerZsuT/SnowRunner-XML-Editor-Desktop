import type { MessageBoxReturnValue } from 'electron'
import { dialog, nativeImage } from 'electron'

import { publicMethod } from 'emr-bridge'

import Paths from './Paths'

import { DialogAlertType, DialogSourceType, DialogType } from '#g/enums'
import type { IDialogAlertParams, IDialogParams, IOpenDialogParams } from '#g/types'
import $ from '#m/texts'

export default class Dialogs {
  private static readonly extNames = {
    epf: 'Editor params file',
    ecf: 'Editor configuration file',
    pak: 'Package file',
    xml: 'XML file'
  }

  /** Выводит ошибку на экран */
  static error(message: string): void {
    this.alert({
      type: 'warning',
      title: $.ERROR,
      message
    })
  }

  /** Открыть окно с сообщением */
  static alert(params: IDialogAlertParams): number | Promise<MessageBoxReturnValue> {
    const {
      dialogType = DialogAlertType.sync,
      buttons = [$.OK],
      noLink = false,
      type = 'info',
      title, message
    } = params
    const dialogParams = {
      icon: nativeImage.createFromPath(Paths.icon),
      title,
      message,
      buttons,
      noLink,
      type
    }

    if (dialogType === DialogAlertType.sync) {
      return dialog.showMessageBoxSync(dialogParams)
    }

    return dialog.showMessageBox(dialogParams)
  }

  /** Открыть окно выбора `.epf` файла */
  @publicMethod()
  static getEPF(): string | undefined {
    return this.openDialog<string>({ extention: 'epf' })
  }

  /** Открыть окно сохранения `.epf` файла */
  @publicMethod()
  static saveEPF(defaultName: string): string | undefined {
    return this.openDialog<string>({
      type: DialogType.save,
      defaultPath: defaultName,
      extention: 'epf'
    })
  }

  /** Открыть окно выбора `initial.pak` */
  @publicMethod()
  static getInitial(): string | undefined {
    return this.openDialog<string>({ extention: 'pak' })
  }

  /** Открыть окно выбора папки */
  @publicMethod()
  static getDir(): string | undefined {
    return this.openDialog<string>({ source: DialogSourceType.dir })
  }

  /** Открыть окно выбора папки */
  @publicMethod()
  static getDirs(): string[] | undefined {
    return this.openDialog<string[]>({ properties: ['multiSelections', 'openDirectory'] })
  }

  /** Открыть окно выбора папки */
  @publicMethod()
  static getPaks(): string[] | undefined {
    return this.openDialog<string[]>({ properties: ['multiSelections', 'openFile'], extention: '.pak' })
  }

  /** Открыть окно выбора нескольких `.epf` файлов */
  static getMultiEPF(): string[] | undefined {
    return this.openDialog<string[]>({
      properties: ['openFile', 'multiSelections'],
      extention: 'epf'
    }) as string[]
  }

  /** Открыть окно выбора `.xml` файла */
  @publicMethod()
  static getXML(): string | undefined {
    return this.openDialog<string>({ extention: 'xml' })
  }

  /** Открыть диалоговое окно */
  static openDialog<T extends string | string[]>(params: IOpenDialogParams): T | undefined {
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
      if (Array.isArray(result)) {
        if (!dialogParams.properties?.includes('multiSelections')) {
          return result[0] as T
        }
        else {
          return result as T
        }
      }
      else {
        return undefined
      }
    }
    else {
      const result = dialog.showSaveDialogSync({
        defaultPath,
        filters: dialogParams.filters
      })

      if (result) {
        return result as T
      }
      else {
        return undefined
      }
    }
  }
}
