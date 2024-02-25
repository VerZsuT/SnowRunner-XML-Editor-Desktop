import { Bridge } from 'emr-bridge/renderer'

import type { Dir, File } from '/mods/files/renderer'
import { providePubFunc } from '/utils/bridge/renderer'

import type _MainArchive from './main'
import type { IPublic } from './public'
import { Keys } from './public'

/**
 * Работа с архивами  
 * _renderer process_
*/
class Archive {
  /** Мост main-rend */
  private readonly Bridge = Bridge.as<IPublic>()

  /**
   * Распаковать файлы из архива в папку
   * 
   * @param archive - файл архива
   * @param dir - папки
   * {@link _MainArchive.unpack|Перейти к методу}
   */
  async unpack(archive: File, dir: Dir) {
    return await this.Bridge[Keys.unpack](archive.path, dir.path)
  }

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak` 
   * 
   * @param hideLoading - скрывать окно загрузки после окончания (default - `true`)  
   * {@link _MainArchive.unpackMain|Перейти к методу}
   */
  unpackMain = providePubFunc<IPublic[Keys.unpackMain]>(Keys.unpackMain)

  /**
   * Обновить файлы в initial.pak и модах
   * 
   * @param mod - модификация
   */
  async updateFiles(modName?: string) {
    return await this.Bridge[Keys.updateFiles](modName)
  }
}

export default new Archive()
