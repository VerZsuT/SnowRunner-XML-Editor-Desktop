import TextsLoader from './texts'
import Archive from '/mods/archive/main'
import Config, { BuildType } from '/mods/data/config/main'
import { Dirs, Files } from '/mods/files/main'
import Messages from '/mods/messages/main'
import { providePublic, publicMethod } from '/utils/bridge/main'

const Texts = await TextsLoader.loadMain()

/**
 * Работа с бэкапом.  
 * _main process_
*/
@providePublic()
class Backup {
  /** Сохранить бэкап `initial.pak`. */
  @publicMethod()
  async save() {
    await Dirs.backupFolder.make()
    await Files.backupInitial.remove()

    // Не сохранять бэкап в dev режиме.
    if (Config.buildType === BuildType.dev) {
      return
    }

    await Config.initial.copyTo(Files.backupInitial)
    Messages.info(Texts.successBackupSave)
  }

  /** Заменить оригинальный `initial.pak` на сохранённый. */
  @publicMethod()
  async recoverFromIt() {
    if (!await Files.backupInitial.exists()) {
      return
    }

    await Config.initial.remove()
    await Files.backupInitial.copyTo(Config.initial)
    await Archive.unpackMain()
    Messages.info(Texts.successInitialRestore)
  }
}

export default new Backup()
