import type { MessageBoxReturnValue } from 'electron'
import { dialog, nativeImage } from 'electron'

import { providePublic, publicMethod } from 'emr-bridge'

import { paths } from './paths'

import { DialogAlertType, DialogSourceType, DialogType } from '#enums'
import { ERROR } from '#m-scripts/programTexts'
import type { IDialogAlertParams, IDialogParams, IOpenDialogParams } from '#types'

class Dialogs {
  private readonly extNames = {
    epf: 'Editor params file',
    ecf: 'Editor configuration file',
    pak: 'Package file',
    xml: 'XML file'
  }

  /** Выводит ошибку на экран */
  error(message: string): void {
    this.alert({
      type: 'warning',
      title: ERROR,
      message
    })
  }

  /** Открыть окно с сообщением */
  alert(params: IDialogAlertParams): number | Promise<MessageBoxReturnValue> {
    const {
      dialogType = DialogAlertType.sync,
      buttons = ['OK'],
      noLink = false,
      type = 'info',
      title, message
    } = params
    const dialogParams = {
      icon: nativeImage.createFromPath(paths.icon),
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
  getEPF(): string {
    return this.openDialog({ extention: 'epf' }) as string
  }

  /** Открыть окно сохранения `.epf` файла */
  @publicMethod()
  saveEPF(defaultName: string): string {
    return this.openDialog({
      type: DialogType.save,
      defaultPath: defaultName,
      extention: 'epf'
    }) as string
  }

  /** Открыть окно выбора `initial.pak` */
  @publicMethod()
  getInitial(): string {
    return this.openDialog({ extention: 'pak' }) as string
  }

  /** Открыть окно выбора папки */
  @publicMethod()
  getDir(): string {
    return this.openDialog({ source: DialogSourceType.dir }) as string
  }

  /** Открыть окно выбора нескольких `.epf` файлов */
  getMultiEPF(): string[] {
    return this.openDialog({
      properties: ['openFile', 'multiSelections'],
      extention: 'epf'
    }) as string[]
  }

  /** Открыть окно выбора `.xml` файла */
  @publicMethod()
  getXML(): string {
    return this.openDialog({ extention: 'xml' }) as string
  }

  /** Открыть диалоговое окно */
  openDialog(params: IOpenDialogParams): string | string[] {
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
          return result[0]
        }
        return result
      }
    }
    else {
      const saveDialogParams = {
        defaultPath,
        filters: dialogParams.filters
      }
      const result = dialog.showSaveDialogSync(saveDialogParams)

      if (result) return result
    }
    return []
  }
}

export const dialogs = new Dialogs()
providePublic(dialogs)
