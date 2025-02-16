import { publishFunction } from 'emr-bridge/main'
import { homedir, userInfo } from 'node:os'
import type { PubType } from './public'
import { PubKeys } from './public'
import type { IMod } from './types'
import Archive from '/mods/archive/main'
import Checks from '/mods/checks/main'
import Config from '/mods/data/config/main'
import Sizes from '/mods/data/sizes/main'
import type { IDir, IFile } from '/mods/files/main'
import { Dir, Dirs, File, Files } from '/mods/files/main'
import GameTexts from '/mods/game-texts/main'
import { providePublic, publicMethod } from '/utils/bridge/main'
import { hasItems } from '/utils/checks/main'
import MainArrayBase from '/utils/json-arrays/main'
import { processNameForFilesystem } from '/utils/main'

export type * from './types'

/**
 * Работа с массивом модификаций.  
 * _main process_
 */
@providePublic()
class Mods extends MainArrayBase<IMod, IMod & { file: IFile }> {
  protected override jsonFile = Files.mods

  constructor() {
    super()
    this.initPublic()
    this.isReady = this.init()
  }

  protected override convert(item: IMod): IMod & { file: IFile } {
    return { ...item, file: new File(item.path) }
  }

  /** обработать добавленные моды. */
  @publicMethod()
  async procMods() {
    if (!Config.useMods || !hasItems(this)) {
      return
    }

    const deleteFromList = (name: string) => {
      this.findAndRemove(mod => mod.name === name)
    }

    for (const { file, name } of this.converted) {
      const hasFile = await file.exists()
      const hasPermissions = await Checks.hasPermissions(file)

      if (!hasFile || !hasPermissions) {
        deleteFromList(name)

        continue
      }

      const sizeChanged = await file.getSize() !== Sizes.getModSize(file)
      const hasDir = await Dirs.modsTemp.dir(name).exists()

      if (!sizeChanged && hasDir) {
        continue
      }

      await Archive.unpackMod(file, name)
      const hasClasses = await Dirs.modsTemp.dir(name, 'classes').exists()

      if (!hasClasses) {
        deleteFromList(name)
        
        continue
      }
    }

    await GameTexts.initFromMods()
  }

  /**
   * Найти `.pak` файлы модификаций в папке.
   * @param dir Папка.
   * @returns `.pak` файлы модификаций в папке.
   */
  async findMods(dir: IDir): Promise<[IFile, name: string][]> {
    const out: [IFile, string][] = []

    if (!await dir.exists()) {
      return []
    }

    for (const entry of await dir.read()) {
      if (await entry.isFile()) {
        await processFile(entry.asFile(), dir)
      } else {
        const innerDir = entry.asDir()

        for (const innerEntry of await innerDir.read()) {
          if (await innerEntry.isDir()) {
            continue
          }

          await processFile(innerEntry.asFile(), innerDir)
        }
      }
    }

    async function processFile(file: IFile, dir: IDir) {
      if (out.some(([outFile]) => outFile.path === file.path)) {
        return
      }

      const tempDir = Dirs.modsTemp.dir(file.name)

      if (file.isExt('pak')) {
        await Archive.unpack(file, tempDir)

        if (await tempDir.dir('classes').exists()) {
          const modioFile = dir.file('modio.json')
          let name = file.name

          if (await modioFile.exists()) {
            const modIoName = (await modioFile.readFromJSON()).name
            const procedName = processNameForFilesystem(modIoName)

            if (!out.some(([, fileName]) => fileName === procedName)) {
              name = modIoName
            }
          }

          out.push([file, processNameForFilesystem(name)])
        }
      }
    }

    return out
  }

  /**
   * Получить список всех модов (добавленных и в документах).
   * @returns Список всех модов (добавленных и в документах).
   */
  async getAllMods(): Promise<[IFile, string][]> {
    const userDir = new Dir(userInfo().homedir || homedir() || process.env.HOME || '')
    const out: [IFile, string][] = []

    if (await userDir.exists()) {
      let existedDir: IDir | undefined

      const getModsDir = (gamesDir: string) => `Documents/${gamesDir}/SnowRunner/base/Mods/.modio/mods`
      const dirs = [
        userDir.dir(getModsDir('My Games')),
        userDir.dir(getModsDir('my games')),
        userDir.dir(getModsDir('mygames')),
        userDir.dir(getModsDir('MyGames'))
      ]

      for (const dir of dirs) {
        if (await dir.exists()) {
          existedDir = dir

          break
        }
      }

      if (existedDir) {
        out.push(...await this.findMods(existedDir))
      }
    }

    for (const mod of this) {
      let isExists = false

      for (const [foundedMod] of out) {
        if (foundedMod.path === mod.path) {
          isExists = true
        }
      }

      if (!isExists) {
        out.push([mod.file, mod.name])
      }
    }

    return out
  }
  
  /** Инициализировать публичные объекты/методы. */
  private initPublic() {
    publishFunction<PubType[PubKeys.findMods]>(PubKeys.findMods, async dirPath => {
      return (await this.findMods(new Dir(dirPath)))
        .map(([mod, name]) => [mod.path, name])
    })
    publishFunction<PubType[PubKeys.getAllMods]>(PubKeys.getAllMods, async () => {
      return (await this.getAllMods())
        .map(([mod, name]) => [mod.path, name])
    })
  }
}

/**
 * Работа с массивом модификаций.  
 * _main process_
 */
export default await new Mods().isReady
