import { homedir, userInfo } from 'node:os'

import MainArrayBase, { initArrayPublic } from '/utils/json-arrays/main'

import { publicFunction, publicMainEvent, publicRendererEvent } from 'emr-bridge'

import Config from '../config/main'
import type { IPublic } from './public'
import { Keys } from './public'
import type { IMod } from './types'

import Archive from '/mods/archive/main'
import Checks from '/mods/checks/main'
import Sizes from '/mods/data/sizes/main'
import { Dir, Dirs, File, Files } from '/mods/files/main'
import GameTexts from '/mods/game-texts/main'
import { hasItems } from '/utils/checks/main'
import { procNameForFS } from '/utils/main'

export type * from './types'

/**
 * Работа с массивом модификаций  
 * _main process_
*/
class Mods extends MainArrayBase<IMod, IMod & { file: File }> {
  protected override emitChangeEvent = publicMainEvent<[IMod[]]>(Keys.mainChangeEvent)
  protected override onChangeEvent = publicRendererEvent<IMod[]>(Keys.onRendererChange)

  protected override jsonFile = Files.mods

  constructor() { super(); this.initPublic(); initArrayPublic(this, Keys.array, Keys.reset, Keys.save) }

  protected override convert(item: IMod): IMod & { file: File } {
    return { ...item, file: new File(item.path) }
  }

  /** Обрабатывает имеющиеся моды в архиве */
  async procMods() {
    if (!Config.useMods) return
    if (!hasItems(this)) return

    let counter = this.length

    const deleteFromList = (name: string) => {
      this.findAndRemove(mod => mod.name === name)
      counter--
    }

    for (const { file, name } of this) {
      if (!await file.exists()) {
        deleteFromList(name)
        continue
      }
      else if (!await Checks.hasPermissions(file)) {
        deleteFromList(name)
        continue
      }

      if (await file.getSize() === Sizes.getModSize(file) && await Dirs.modsTemp.dir(name).exists()) {
        --counter
      }
      else {
        await Archive.unpackMod(file, name)

        if (await Dirs.modsTemp.dir(name, 'classes').exists()) {
          --counter
        }
        else {
          deleteFromList(name)
        }

        if (counter === 0) {
          await GameTexts.initFromMods(this.get())
          return
        }
      }
    }

    if (counter <= 0) {
      await GameTexts.initFromMods(this.get())
    }
  }

  /** Находит `.pak` файл модификаций в папке */
  async findMods(dir: Dir): Promise<[File, name: string][]> {
    const out: [File, string][] = []
    if (!await dir.exists()) return []

    const processFile = async (file: File, dir: Dir) => {
      const tempDir = Dirs.modsTemp.dir(file.name)

      if (file.isExt('pak')) {
        await Archive.unpack(file, tempDir)
        if (await tempDir.dir('classes').exists()) {
          const modioFile = dir.file('modio.json')
          let name = file.name
          if (await modioFile.exists()) {
            const data = await modioFile.readFromJSON()
            name = data.name
          }
          out.push([file, procNameForFS(name)])
        }
      }
    }

    for (const entry of await dir.read()) {
      if (await entry.isFile()) {
        await processFile(entry.asFile(), dir)
        continue
      }

      const innerDir = entry.asDir()
      for (const innerEntry of await innerDir.read()) {
        if (await innerEntry.isDir()) continue
        await processFile(innerEntry.asFile(), innerDir)
      }
    }

    return out
  }

  /** Возвращает список всех модов (добавленных и в документах) */
  async getAllMods(): Promise<[File, string][]> {
    const userDir = new Dir(userInfo().homedir || homedir() || process.env.HOME || '')
    const out: [File, string][] = []

    if (await userDir.exists()) {
      let existedDir: Dir | undefined
      const dirs = [
        userDir.dir('Documents/My Games/SnowRunner/base/Mods/.modio/mods'),
        userDir.dir('Documents/my games/SnowRunner/base/Mods/.modio/mods'),
        userDir.dir('Documents/mygames/SnowRunner/base/Mods/.modio/mods'),
        userDir.dir('Documents/MyGames/SnowRunner/base/Mods/.modio/mods')
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

      if (!isExists) out.push([mod.file, mod.name])
    }

    return out
  }
  
  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicFunction<IPublic[Keys.findMods]>(Keys.findMods, async dirPath => {
      const items = await this.findMods(new Dir(dirPath))
      return items.map(([mod, name]) => [mod.path, name])
    })
    publicFunction<IPublic[Keys.getAllMods]>(Keys.getAllMods, async () => {
      const items = await this.getAllMods()
      return items.map(([mod, name]) => [mod.path, name])
    })
  }
}

export default (await new Mods()._init())
