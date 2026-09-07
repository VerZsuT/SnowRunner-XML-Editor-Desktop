import { loadLocalization } from '@localization/main'
import type { Files, IFile } from '@modules/files/main'
import { hasItems } from '@utilities/checks/main'
import { inject } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/main/tokens'
import type { MessageBoxReturnValue } from 'electron'
import { dialog, nativeImage } from 'electron'
import { DialogSourceType, DialogType } from '../enums'
import { DIALOGS_LOCALIZATION } from '../localization'
import type { IDialogAlertParams, IDialogParams, IOpenDialogParams } from '../types'

export * from '../enums'
export type * from '../types'

/**
 * Вывод системных диалогов.
 * _main process_
 */
export class Dialogs {
	/** Локализация. */
	private readonly texts = loadLocalization(DIALOGS_LOCALIZATION)

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: Files

  /** Описания расширений файлов программы (для диалогов). */
  private readonly extNames = {
    epf: 'Editor params file',
    ecf: 'Editor configuration file',
    pak: 'Package file',
    xml: 'XML file'
  }

  /**
   * Вывести ошибку.
   * @param message Сообщение ошибки.
   */
  error(message: string): Promise<MessageBoxReturnValue> {
    return this.alert({
      type: 'warning',
      title: this.texts.error,
      message
    })
  }

  /**
   * Вывести сообщение.
   * @param params Параметры сообщения.
   */
  alert(params: IDialogAlertParams): Promise<MessageBoxReturnValue> {
    const {
      buttons = [this.texts.ok],
      noLink = false,
      type = 'info',
      title, message
    } = params
    const dialogParams = {
      icon: nativeImage.createFromPath(this.files.icon.path),
      title, message, buttons, noLink, type
    }

    return dialog.showMessageBox(dialogParams)
  }

  /**
   * Открыть окно выбора `.epf` файла.
   * @returns Выбранный `.epf` файл.
   */
  getEPF(): string | undefined {
    return this.openDialog<string>({
      extention: 'epf'
    })
  }

  /**
   * Открыть окно сохранения `.epf` файла.
   * @param defaultName Название файла по умолчанию.
   * @returns Выбранный`.epf` файл.
   */
  saveEPF(defaultName: string): string | undefined {
    return this.openDialog<string>({
      type: DialogType.save,
      defaultPath: defaultName,
      extention: 'epf'
    })
  }

  /**
   * Открыть окно выбора `initial.pak`.
   * @returns Выбранный `initial.pak` файл.
   */
  getInitial(): string | undefined {
    return this.openDialog<string>({
      extention: 'pak'
    })
  }

  /**
   * Открыть окно выбора папки.
   * @returns Выбранная папка.
   */
  getDir(): string | undefined {
    return this.openDialog<string>({
      source: DialogSourceType.dir
    })
  }

  /**
   * Открыть окно выбора папок.
   * @returns Выбранные папки.
   */
  getDirs(): string[] | undefined {
    return this.openDialog<string[]>({
      properties: ['multiSelections', 'openDirectory']
    })
  }

  /**
   * Открыть окно выбора `.pak` файлов.
   * @returns Выбранные `.pak` файлы.
   */
  getPaks(): string[] | undefined {
    return this.openDialog<string[]>({
      properties: ['multiSelections', 'openFile'],
      extention: '.pak'
    })
  }

  /**
   * Открыть окно выбора `.epf` файлов.
   * @returns Выбранные `.epf` файлы.
   */
  getMultiEPF(): IFile[] | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['openFile', 'multiSelections'],
      extention: 'epf'
    })

    if (paths && hasItems(paths)) {
      return this.files.newArray(...paths.map(path => this.files.new(path)))
    }
  }

  /**
   * Открыть окно выбора `.xml` файла.
   * @returns Выбранный `.xml` файл.
   */
  getXML(): string | undefined {
    return this.openDialog<string>({
      extention: 'xml'
    })
  }

  /**
   * Открыть диалоговое окно.
   * @param params Параметры окна.
   * @returns Выбранная сущность.
   */
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
        return (properties.includes('multiSelections')
          ? result
          : result[0]
        ) as T
      }
    } else {
      const result = dialog.showSaveDialogSync({
        defaultPath,
        filters: dialogParams.filters
      })

      if (result) {
        return result as T
      }
    }
  }
}
