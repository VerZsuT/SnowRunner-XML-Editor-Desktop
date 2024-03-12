import { publicFunction } from 'emr-bridge'

import type { PubType } from '../public'
import { PubKeys } from '../public'
import texts from './texts'

import { APP_NAME } from '/consts'
import Dialogs from '/mods/dialogs/main'
import { HasPublic } from '/utils/bridge/main'

export type * from '../types'

/**
 * Работа с файлами `.epf`  
 * _main process_
*/
class EPF extends HasPublic {
  /** Название объединённого файла по умолчанию */
  private readonly defaultFilename = 'joined'

  /**
   * Открыть окно выбора `.epf` файлов.  
   * После выбора объединяет их и сохраняет по выбранному пользователем пути
   */
  async join() {
    const files = Dialogs.getMultiEPF()

    if (files && files.length > 1) {
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
        }
        else if (!names.includes(fileObject.fileName)) {
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
  }

  /**
   * Вывести содержимое `.epf` файла.  
   * Анализирует выбранный `.epf` файл и выводит окно с его содержимым в более удобном формате
   */
  async see() {
    const file = Dialogs.getEPF()
    if (!file) return

    const fileObject = await file.readFromJSON()
    const result: string[] = []

    if (Array.isArray(fileObject)) {
      for (const item of fileObject) {
        result.push(item.fileName)
      }
    }
    else {
      result.push(fileObject.fileName)
    }

    void Dialogs.alert({
      title: APP_NAME,
      message: `${texts.seeExportedMessage}\n\n${result.join('\n')}`
    })
  }

  /** Инициализация публичных объектов/методов */
  protected initPublic() {
    publicFunction<PubType[PubKeys.join]>(PubKeys.join, this.join.bind(this))
    publicFunction<PubType[PubKeys.see]>(PubKeys.see, this.see.bind(this))
  }
}

export default new EPF()
