import { publicFunction } from 'emr-bridge'

import type { PubType } from '../public'
import { PubKeys } from '../public'
import WinRAR from './archiver'
import texts from './texts'

import Config from '/mods/data/config/main'
import Mods from '/mods/data/mods/main'
import Sizes from '/mods/data/sizes/main'
import { Dir, Dirs, File, Files } from '/mods/files/main'
import Messages from '/mods/messages/main'
import Windows from '/mods/windows/main'
import { HasPublic } from '/utils/bridge/main'

/**
 * Работа с архивами  
 * _main process_
*/
class Archive extends HasPublic {
  /**
   * Обновить файлы в архиве
   * @param dir - папка с файлами
   * @param archive - обновляемый архив
   */
  async update(dir: Dir, archive: File) {
    const marker = dir.file('edited')

    await WinRAR.update(dir, archive)
    await marker.make()
    await WinRAR.add(marker, archive)

    await this.saveSize(archive)
  }

  /**
   * Распаковать файлы из архива в папку
   * @param archive - распаковываемый архив
   * @param dir - папка, в которую будет распаковываться архив
   */
  async unpack(archive: File, dir: Dir) {
    await dir.remove()
    await WinRAR.unpack(archive, dir)
  }

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak`
   * @param hideLoading - скрывать окно загрузки после окончания (default - `true`)
   */
  async unpackMain(hideLoading = true) {
    await Windows.loadingWindow?.showAndWait()
    Windows.loadingWindow?.setText(texts.unpacking)

    await Dirs.mainTemp.clear()
    await Files.initialTexts.remove()

    await this.unpack(Config.initial, Dirs.mainTemp)
    await this.saveSize(Config.initial)

    hideLoading && Windows.loadingWindow?.hide()
  }

  /**
   * Распаковать XML файлы из архива модификации
   * @param archive - архив модификации
   * @param name - название модификации
   */
  async unpackMod(archive: File, name: string) {
    const modDir = Dirs.modsTemp.dir(name)

    await Dirs.modsTemp.make()
    await modDir.clear()

    await this.saveSize(archive)
    await this.unpack(archive, modDir)
  }

  /**
   * Сохранить размер архива для фиксации изменений извне
   * @param archive - архив, размер которого будет сохранён
   */
  private async saveSize(archive: File) {
    if (!Config.initialPath || archive.path === Config.initialPath) {
      Sizes.initial = await archive.getSize()
    }
    else {
      Sizes.setModSize(archive, await archive.getSize())
    }
  }

  /** Инициализация публичных объектов/методов */
  protected initPublic() {
    publicFunction<PubType[PubKeys.unpack]>(PubKeys.unpack, (archive, dir) => this.unpack(new File(archive), new Dir(dir)))
    publicFunction<PubType[PubKeys.unpackMain]>(PubKeys.unpackMain, this.unpackMain.bind(this))
    publicFunction<PubType[PubKeys.updateFiles]>(PubKeys.updateFiles, modName => {
      if (!modName) return this.update(Dirs.mainTemp, Config.initial)

      const mod = Mods.find(mod => mod.name === modName)
      if (!mod) {
        Messages.error(`Mod '${modName}' not found`)
        return
      }

      return this.update(Dirs.modsTemp.dir(modName), new File(mod.path))
    })
  }
}

export default new Archive()
