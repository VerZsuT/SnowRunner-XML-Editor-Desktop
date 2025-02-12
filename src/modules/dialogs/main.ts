import type { MessageBoxReturnValue } from 'electron'
import { dialog, nativeImage } from 'electron'
import { DialogSourceType, DialogType } from './enums'
import TextsLoader from './texts'
import type { IDialogAlertParams, IDialogParams, IOpenDialogParams } from './types'
import { Dir, DirArray, File, FileArray, Files } from '/mods/files/main'
import { providePublic, publicMethod } from '/utils/bridge/main'
import { hasItems } from '/utils/checks/main'

export * from './enums'
export type * from './types'

const Texts = await TextsLoader.loadMain()

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

  /** Выводит ошибку на экран. */
  error(message: string): Promise<MessageBoxReturnValue> {
    return this.alert({
      type: 'warning',
      title: Texts.error,
      message
    })
  }

  /** Открыть окно с сообщением. */
  alert(params: IDialogAlertParams): Promise<MessageBoxReturnValue> {
    const {
      buttons = [Texts.ok],
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

  /** Открыть окно выбора `.epf` файла. */
  @publicMethod()
  getEPF(): File | undefined {
    const path = this.openDialog<string>({
      extention: 'epf'
    })

    if (path) {
      return new File(path)
    }
  }

  /** Открыть окно сохранения `.epf` файла. */
  @publicMethod()
  saveEPF(defaultName: string): File | undefined {
    const path = this.openDialog<string>({
      type: DialogType.save,
      defaultPath: defaultName,
      extention: 'epf'
    })

    if (path) {
      return new File(path)
    }
  }

  /** Открыть окно выбора `initial.pak`. */
  @publicMethod()
  getInitial(): File | undefined {
    const path = this.openDialog<string>({
      extention: 'pak'
    })

    if (path) {
      return new File(path)
    }
  }

  /** Открыть окно выбора папки. */
  @publicMethod()
  getDir(): Dir | undefined {
    const path = this.openDialog<string>({
      source: DialogSourceType.dir
    })

    if (path) {
      return new Dir(path)
    }
  }

  /** Открыть окно выбора папки. */
  @publicMethod()
  getDirs(): DirArray | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['multiSelections', 'openDirectory']
    })

    if (paths && hasItems(paths)) {
      return new DirArray(...paths.map(path => new Dir(path)))
    }
  }

  /** Открыть окно выбора папки. */
  @publicMethod()
  getPaks(): FileArray | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['multiSelections', 'openFile'],
      extention: '.pak'
    })

    if (paths && hasItems(paths)) {
      return new FileArray(...paths.map(path => new File(path)))
    }
  }

  /** Открыть окно выбора нескольких `.epf` файлов. */
  getMultiEPF(): FileArray | undefined {
    const paths = this.openDialog<string[]>({
      properties: ['openFile', 'multiSelections'],
      extention: 'epf'
    })

    if (paths && hasItems(paths)) {
      return new FileArray(...paths.map(path => new File(path)))
    }
  }

  /** Открыть окно выбора `.xml` файла. */
  @publicMethod()
  getXML(): File | undefined {
    const path = this.openDialog<string>({
      extention: 'xml'
    })

    if (path) {
      return new File(path)
    }
  }

  /** Открыть диалоговое окно, */
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

export default new Dialogs()
