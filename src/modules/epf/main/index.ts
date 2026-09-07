import { loadLocalization } from '@localization/main'
import type { AppConstants } from '@modules/app/constants'
import type { Dialogs } from '@modules/dialogs/main'
import type { Files } from '@modules/files/main'
import { inject } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN, DIALOGS_TOKEN, FILES_TOKEN } from '@utilities/di/main/tokens'
import { EPF_LOCALIZATION } from '../localization'

export type * from '../types'

/**
 * Работа с файлами `.epf`
 * _main process_
 */
export class EPF {
	/** Локализация. */
	private readonly texts = loadLocalization(EPF_LOCALIZATION)

	/** Константы приложения. */
	@inject(APP_CONSTANTS_TOKEN)
	private readonly appConstants!: AppConstants

	/** Диалоги. */
	@inject(DIALOGS_TOKEN)
	private readonly dialogs!: Dialogs

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: Files

  /** Название объединённого файла по умолчанию. */
  private readonly defaultFilename = 'joined'

  /**
   * Открыть окно выбора `.epf` файлов.
   * После выбора объединяет их и сохраняет по выбранному пользователем пути.
   */
  async join() {
    const files = this.dialogs.getMultiEPF()

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

    const pathToSave = this.dialogs.saveEPF(this.defaultFilename)

    if (pathToSave) {
      await this.files.new(pathToSave).writeToJSON(result)
      void this.dialogs.alert({
        title: this.appConstants.NAME,
        message: `${this.texts.successJoin}\n- ${files.map(value => value.basename()).join('\n- ')}`
      })
    }
  }

  /**
   * Вывести содержимое `.epf` файла.
   * Анализирует выбранный `.epf` файл и выводит окно с его содержимым в более удобном формате.
   */
  async see() {
    const path = this.dialogs.getEPF()

    if (!path) {
      return
    }

    const fileObject = await this.files.new(path).readFromJSON()
    const result: string[] = []

    if (Array.isArray(fileObject)) {
      for (const item of fileObject) {
        result.push(item.fileName)
      }
    } else {
      result.push(fileObject.fileName)
    }

    void this.dialogs.alert({
      title: this.appConstants.NAME,
      message: `${this.texts.seeExportedMessage}\n\n${result.join('\n')}`
    })
  }
}
