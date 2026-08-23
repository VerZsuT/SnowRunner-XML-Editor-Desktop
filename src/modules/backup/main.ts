import { providePublic, publicMethod } from '@bridge/main'
import { loadLocalization } from '@localization/main'
import Archive from '@modules/archive/main'
import Config, { BuildType } from '@modules/data/config/main'
import { Dirs, Files } from '@modules/files/main'
import Messages from '@modules/messages/main'
import localization from './localization'

const texts = loadLocalization(localization)

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
