import type { MessageBoxReturnValue } from 'electron'
import { dialog, nativeImage } from 'electron'
import { DialogSourceType, DialogType } from './enums'
import TextsLoader from './texts'
import type { IDialogAlertParams, IDialogParams, IOpenDialogParams } from './types'
import type { IDir, IFile } from '/mods/files/main'
import { Dir, DirArray, File, FileArray, Files } from '/mods/files/main'
import { providePublic, publicMethod } from '/utils/bridge/main'
import { hasItems } from '/utils/checks/main'

export * from './enums'
export type * from './types'

const texts = await TextsLoader.loadMain()

/**
 * Вывод системных диалогов.  
 * _main process_
 */
@providePublic()
class Dialogs {
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
      title: texts.error,
      message
    })
  }

  /**
   * Вывести сообщение.
   * @param params Параметры сообщения.
   */
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

  /**
   * Открыть окно выбора `.epf` файла.
   * @returns Выбранный `.epf` файл.
   */
  @publicMethod()
  getEPF(): IFile | undefined {
    const path = this.openDialog<string>({
      extention: 'epf'
    })

    if (path) {
      return new File(path)
    }
  }

  /**
   * Открыть окно сохранения `.epf` файла.
   * @param defaultName Название файла по умолчанию.
   * @returns Выбранный`.epf` файл.
   */
  @publicMethod()
  saveEPF(defaultName: string): IFile | undefined {
    const path = this.openDialog<string>({
      type: DialogType.save,
      defaultPath: defaultName,
      extention: 'epf'
    })

    if (path) {
      return new File(path)
    }
  }

  /**
   * Открыть окно выбора `initial.pak`.
   * @returns Выбранный `initial.pak` файл.
   */
  @publicMethod()
  getInitial(): IFile | undefined {
    const path = this.openDialog<string>({
      extention: 'pak'
    })

    if (path) {
      return new File(path)
    }
  }

  /**
   * Открыть окно выбора папки.
   * @returns Выбранная папка.
   */
  @publicMethod()
  getDir(): IDir | undefined {
    const path = this.openDialog<string>({
      source: DialogSourceType.dir
    })

    if (path) {
      return new Dir(path)
    }
  }

  /**
   * Открыть окно выбора папок.
   * @returns Выбранные папки.
   */
  @publicMethod()
  getDirs(): IDir[] | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['multiSelections', 'openDirectory']
    })

    if (paths && hasItems(paths)) {
      return new DirArray(...paths.map(path => new Dir(path)))
    }
  }

  /**
   * Открыть окно выбора `.pak` файлов.
   * @returns Выбранные `.pak` файлы.
   */
  @publicMethod()
  getPaks(): IFile[] | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['multiSelections', 'openFile'],
      extention: '.pak'
    })

    if (paths && hasItems(paths)) {
      return new FileArray(...paths.map(path => new File(path)))
    }
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
      return new FileArray(...paths.map(path => new File(path)))
    }
  }

  /**
   * Открыть окно выбора `.xml` файла.
   * @returns Выбранный `.xml` файл.
   */
  @publicMethod()
  getXML(): IFile | undefined {
    const path = this.openDialog<string>({
      extention: 'xml'
    })

    if (path) {
      return new File(path)
    }
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

/**
 * Вывод системных диалогов.  
 * _main process_
 */
export default new Dialogs()
