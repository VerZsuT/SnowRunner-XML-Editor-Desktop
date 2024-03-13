import { homedir, userInfo } from 'node:os'

import MainArrayBase from '/utils/json-arrays/main'

import { publicFunction, publicMainEvent, publicRendererEvent } from 'emr-bridge'

import Config from '../config/main'
import type { PubType } from './public'
import { PubKeys } from './public'
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
  protected override emitChangeEvent = publicMainEvent<[IMod[]]>(PubKeys.mainChangeEvent)
  protected override onChangeEvent = publicRendererEvent<IMod[]>(PubKeys.onRendererChange)

  protected override jsonFile = Files.mods

  constructor() { super(PubKeys.array, PubKeys.reset, PubKeys.save) }

  protected override convert(item: IMod): IMod & { file: File } {
    return { ...item, file: new File(item.path) }
  }

  /** Обрабатывает имеющиеся моды в архиве */
  async procMods() {
    if (!Config.useMods || !hasItems(this)) return

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

    await GameTexts.initFromMods(this.get())
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
            name = (await modioFile.readFromJSON()).name
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

      if (!isExists) out.push([mod.file, mod.name])
    }

    return out
  }
  
  /** Инициализация публичных объектов/методов */
  protected override initPublic(arrayKey: string, resetKey: string, saveKey: string) {
    super.initPublic(arrayKey, resetKey, saveKey)

    publicFunction<PubType[PubKeys.findMods]>(PubKeys.findMods, async dirPath => {
      const items = await this.findMods(new Dir(dirPath))
      return items.map(([mod, name]) => [mod.path, name])
    })
    publicFunction<PubType[PubKeys.getAllMods]>(PubKeys.getAllMods, async () => {
      const items = await this.getAllMods()
      return items.map(([mod, name]) => [mod.path, name])
    })
  }
}

export default (await new Mods()._init())
