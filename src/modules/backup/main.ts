import TextsLoader from './texts'
import Archive from '/mods/archive/main'
import Config, { BuildType } from '/mods/data/config/main'
import { Dirs, Files } from '/mods/files/main'
import Messages from '/mods/messages/main'
import { providePublic, publicMethod } from '/utils/bridge/main'

const texts = await TextsLoader.loadMain()

/**
 * Работа с бэкапом.  
 * _main process_
*/
@providePublic()
class Backup {
  /** Сохранить бэкап `initial.pak`. */
  @publicMethod()
  async save() {
    const backupInitialWithDate = Files.backupInitialWithDate

    await Dirs.backupFolder.make()
    await Files.backupInitial.remove()
    await backupInitialWithDate.remove()

    // Не сохранять бэкап в dev режиме.
    if (Config.buildType === BuildType.dev) {
     return
    }

    await Config.initial.copyTo(Files.backupInitial)
    await Config.initial.copyTo(backupInitialWithDate)
    Messages.info(texts.successBackupSave)
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
    Messages.info(texts.successInitialRestore)
  }
}

/**
 * Работа с бэкапом.  
 * _main process_
*/
export default new Backup()
