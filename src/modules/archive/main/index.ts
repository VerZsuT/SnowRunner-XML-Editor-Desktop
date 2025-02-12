import TextsLoader from '../texts'
import WinRAR from './archiver'

import Config from '/mods/data/config/main'
import Mods from '/mods/data/mods/main'
import Sizes from '/mods/data/sizes/main'
import { Dir, Dirs, File, Files } from '/mods/files/main'
import { Loading } from '/mods/main'
import Messages from '/mods/messages/main'
import { providePublic, publicMethod } from '/utils/bridge/main'

const texts = await TextsLoader.loadMain()

/**
 * Работа с архивами.  
 * _main process_
*/
@providePublic()
class Archive {
  /**
   * Обновить файлы в архиве.
   * @param dir Папка с файлами.
   * @param archive Обновляемый архив.
   */
  async update(dir: Dir, archive: File) {
    const marker = dir.file('edited')

    await WinRAR.update(dir, archive)
    await marker.make()
    await WinRAR.add(marker, archive)
    await this.saveSize(archive)
  }

  @publicMethod()
  async updateFiles(modName?: string) {
    if (!modName) {
      return this.update(Dirs.mainTemp, Config.initial)
    }

    const mod = Mods.find(mod => mod.name === modName)

    if (!mod) {
      Messages.error(`Mod '${modName}' not found`)

      return
    }

    return this.update(Dirs.modsTemp.dir(modName), new File(mod.path))
  }

  /**
   * Распаковать файлы из архива в папку.
   * @param archive Распаковываемый архив.
   * @param dir Папка, в которую будет распаковываться архив.
   */
  @publicMethod([File, Dir])
  async unpack(archive: File, dir: Dir) {
    await dir.remove()
    await WinRAR.unpack(archive, dir)
  }

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak`.
   * @param hideLoading Скрывать окно загрузки после окончания (default - `true`).
   */
  @publicMethod()
  async unpackMain(hideLoading = true) {
    Loading.init(texts.unpacking, undefined, hideLoading)

    await Dirs.mainTemp.clear()
    await Files.initialTexts.remove()
    await this.unpack(Config.initial, Dirs.mainTemp)
    await this.saveSize(Config.initial)

    Loading.completeStage()
  }

  /**
   * Распаковать XML файлы из архива модификации.
   * @param archive Архив модификации.
   * @param name Название модификации.
   */
  async unpackMod(archive: File, name: string) {
    const modDir = Dirs.modsTemp.dir(name)

    await Dirs.modsTemp.make()
    await modDir.clear()
    await this.saveSize(archive)
    await this.unpack(archive, modDir)
  }

  /**
   * Сохранить размер архива для фиксации изменений извне.
   * @param archive Архив, размер которого будет сохранён.
   */
  private async saveSize(archive: File) {
    const size = await archive.getSize()

    if (!Config.initialPath || archive.path === Config.initialPath) {
      Sizes.initial = size
    } else {
      Sizes.setModSize(archive, size)
    }
  }
}

export default new Archive()
