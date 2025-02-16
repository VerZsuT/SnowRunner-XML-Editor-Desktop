import TextsLoader from './texts'
import { APP_NAME } from '/consts'
import Dialogs from '/mods/dialogs/main'
import { providePublic, publicMethod } from '/utils/bridge/main'

export type * from './types'

const texts = await TextsLoader.loadMain()

/**
 * Работа с файлами `.epf`  
 * _main process_
 */
@providePublic()
class EPF {
  /** Название объединённого файла по умолчанию. */
  private readonly defaultFilename = 'joined'

  /**
   * Открыть окно выбора `.epf` файлов.  
   * После выбора объединяет их и сохраняет по выбранному пользователем пути.
   */
  @publicMethod()
  async join() {
    const files = Dialogs.getMultiEPF()

    if (!files || files.length <= 1) {
      return
    }

    const result: any[] = []
    const names: string[] = []

    for (const file of files) {
      const fileObject = await file.readFromJSON()

      if (Array.isArray(fileObject)) {
        for (const object of fileObject) {
          if (!names.includes(object.fileName)) {
            result.push(object)
            names.push(object.fileName)
          }
        }
      } else if (!names.includes(fileObject.fileName)) {
        result.push(fileObject)
        names.push(fileObject.fileName)
      }
    }

    const fileToSave = Dialogs.saveEPF(this.defaultFilename)

    if (fileToSave) {
      await fileToSave.writeToJSON(result)
      void Dialogs.alert({
        title: APP_NAME,
        message: `${texts.successJoin}\n- ${files.map(value => value.basename()).join('\n- ')}`
      })
    }
  }

  /**
   * Вывести содержимое `.epf` файла.  
   * Анализирует выбранный `.epf` файл и выводит окно с его содержимым в более удобном формате.
   */
  @publicMethod()
  async see() {
    const file = Dialogs.getEPF()

    if (!file) {
      return
    }

    const fileObject = await file.readFromJSON()
    const result: string[] = []

    if (Array.isArray(fileObject)) {
      for (const item of fileObject) {
        result.push(item.fileName)
      }
    } else {
      result.push(fileObject.fileName)
    }

    void Dialogs.alert({
      title: APP_NAME,
      message: `${texts.seeExportedMessage}\n\n${result.join('\n')}`
    })
  }
}

/**
 * Работа с файлами `.epf`  
 * _main process_
 */
export default new EPF()
