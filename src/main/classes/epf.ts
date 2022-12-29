import { readFileSync, writeFileSync } from 'fs'
import { basename } from 'path'

import { providePublic, publicMethod } from 'emr-bridge'

import dialogs from './dialogs'

import { APP_ID } from '#consts'
import { SEE_EXPORTED_MESSAGE, SUCCESS_JOIN } from '#m-scripts/programTexts'

class EPF {
  private readonly DEFAULT_NAME = 'joined'

  /**
   * Открыть окно выбора `.epf` файлов.
   *
   * После выбора объединяет их и сохраняет по выбранному пользователем пути
   */
  @publicMethod('joinEPF')
  join(): void {
    const files = dialogs.getMultiEPF()

    if (files && files.length > 1) {
      const result: any[] = []
      const names: string[] = []

      files.forEach(filePath => {
        const fileObject = JSON.parse(readFileSync(filePath).toString())

        if (fileObject instanceof Array) {
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

      const pathToSave = dialogs.saveEPF(this.DEFAULT_NAME)
      if (pathToSave) {
        writeFileSync(pathToSave, JSON.stringify(result, null, '\t'))
        dialogs.alert({
          title: APP_ID,
          message: `${SUCCESS_JOIN}\n- ${files.map(value => basename(value)).join('\n- ')}`
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
  see(): void {
    const path = dialogs.getEPF()
    if (!path) return

    const fileObject = JSON.parse(readFileSync(path).toString())
    const result: string[] = []

    if (fileObject instanceof Array) {
      fileObject.forEach(item => result.push(item.fileName))
    }
    else {
      result.push(fileObject.fileName)
    }

    dialogs.alert({
      title: APP_ID,
      message: `${SEE_EXPORTED_MESSAGE}\n\n${result.join('\n')}`
    })
  }
}

export default providePublic(new EPF())
