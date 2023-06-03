import { readFileSync, writeFileSync } from 'fs'
import { basename } from 'path'

import { publicMethod } from 'emr-bridge'

import Dialogs from './Dialogs'

import { APP_NAME } from '#g/consts'
import $ from '#m/texts'

export default class EPF {
  private static readonly DEFAULT_NAME = 'joined'

  /**
   * Открыть окно выбора `.epf` файлов.
   *
   * После выбора объединяет их и сохраняет по выбранному пользователем пути
   */
  @publicMethod('joinEPF')
  static join(): void {
    const files = Dialogs.getMultiEPF()

    if (files && files.length > 1) {
      const result: any[] = []
      const names: string[] = []

      files.forEach(filePath => {
        const fileObject = JSON.parse(readFileSync(filePath).toString())

        if (Array.isArray(fileObject)) {
          fileObject.forEach(obj => {
            if (!names.includes(obj.fileName)) {
              result.push(obj)
              names.push(obj.fileName)
            }
          })
        }
        else if (!names.includes(fileObject.fileName)) {
          result.push(fileObject)
          names.push(fileObject.fileName)
        }
      })

      const pathToSave = Dialogs.saveEPF(this.DEFAULT_NAME)
      if (pathToSave) {
        writeFileSync(pathToSave, JSON.stringify(result, null, '\t'))
        Dialogs.alert({
          title: APP_NAME,
          message: `${$.SUCCESS_JOIN}\n- ${files.map(value => basename(value)).join('\n- ')}`
        })
      }
    }
  }

  /**
   * Вывести содержимое `.epf` файла.
   *
   * Анализирует выбранный .epf файл и выводит окно с его содержимым в более удобном формате
   */
  @publicMethod('seeEPF')
  static see(): void {
    const path = Dialogs.getEPF()
    if (!path) return

    const fileObject = JSON.parse(readFileSync(path).toString())
    const result: string[] = []

    if (Array.isArray(fileObject)) {
      fileObject.forEach(item => result.push(item.fileName))
    }
    else {
      result.push(fileObject.fileName)
    }

    Dialogs.alert({
      title: APP_NAME,
      message: `${$.SEE_EXPORTED_MESSAGE}\n\n${result.join('\n')}`
    })
  }
}
