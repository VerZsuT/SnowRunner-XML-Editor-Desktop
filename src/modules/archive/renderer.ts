import { Bridge } from 'emr-bridge/renderer'

import type { Dir, File } from '/mods/files/renderer'
import { providePubFunc } from '/utils/bridge/renderer'

import type _MainArchive from './main'
import type { PubType } from './public'
import { PubKeys } from './public'

/** Мост main-rend */
const Main = Bridge.as<PubType>()

/**
 * Работа с архивами  
 * _renderer process_
*/
class Archive {
  /**
   * Распаковать файлы из архива в папку
   * @param archive - файл архива
   * @param dir - папки
   * {@link _MainArchive.unpack|Перейти к методу}
   */
  async unpack(archive: File, dir: Dir) {
    return await Main[PubKeys.unpack](archive.path, dir.path)
  }

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak` 
   * @param hideLoading - скрывать окно загрузки после окончания (default - `true`)  
   * {@link _MainArchive.unpackMain|Перейти к методу}
   */
  unpackMain = providePubFunc<PubType[PubKeys.unpackMain]>(PubKeys.unpackMain)

  /**
   * Обновить файлы в initial.pak и модах
   * @param mod - модификация
   */
  async updateFiles(modName?: string) {
    return await Main[PubKeys.updateFiles](modName)
  }
}

export default new Archive()
