import { publicFunction } from 'emr-bridge'

import type { IPublic } from '../public'
import { Keys } from '../public'
import texts from './texts'

import Archive from '/mods/archive/main'
import Config, { BuildType } from '/mods/data/config/main'
import { Dirs, Files } from '/mods/files/main'
import Messages from '/mods/messages/main'

/**
 * Работа с бэкапом  
 * _main process_
*/
class Backup {
  constructor() { this.initPublic() }

  /** Сохранить бэкап `initial.pak` */
  async save() {
    await Dirs.backupFolder.make()
    await Files.backupInitial.remove()

    // Не сохранять бэкап в dev режиме
    if (Config.buildType === BuildType.dev) return

    await Config.initial.copyTo(Files.backupInitial)
    Messages.info(texts.successBackupSave)
  }

  /** Заменить оригинальный `initial.pak` на сохранённый. */
  async recoverFromIt() {
    if (!await Files.backupInitial.exists()) return

    await Config.initial.remove()
    await Files.backupInitial.copyTo(Config.initial)
    await Archive.unpackMain()
    Messages.info(texts.successInitialRestore)
  }

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicFunction<IPublic[Keys.save]>(Keys.save, this.save.bind(this))
    publicFunction<IPublic[Keys.recoverFromIt]>(Keys.recoverFromIt, this.recoverFromIt.bind(this))
  }
}

export default new Backup()
