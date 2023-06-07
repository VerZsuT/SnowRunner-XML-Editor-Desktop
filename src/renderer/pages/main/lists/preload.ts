import type { Dirent } from 'fs'
import { existsSync, readdirSync, readFileSync, rmSync } from 'fs'
import { homedir, userInfo } from 'os'
import { basename, extname, join } from 'path'

import { Category, PreloadType, SrcType } from '#g/enums'
import type { IFindItem, IItem, IListPreload } from '#g/types'
import Main from '#r/scripts/main'
import { Preload } from '#r/services/interprocess'

class _ListsPreload {
  static readonly paths = Main.paths
  static readonly config = Main.config
  static readonly dlc = this.config.dlc
  static readonly mods = this.config.mods

  static removeDir = (path: string): void => {
    rmSync(path, { recursive: true })
  }

  static findMods = async (path: string): Promise<IFindItem[]> => {
    const out: IFindItem[] = []
    if (!path || !existsSync(path)) return []

    const processFile = async (file: Dirent, dirPath: string): Promise<void> => {
      const filePath = join(dirPath, file.name)
      const tempModFolder = join(this.paths.modsTemp, file.name)
      if (extname(file.name) === '.pak') {
        await Main.unpack(filePath, tempModFolder, true)
        if (existsSync(join(tempModFolder, 'classes'))) {
          const pathToModio = join(filePath, 'modio.json')
          let modName = basename(file.name, '.pak')
          if (existsSync(pathToModio)) {
            modName = JSON.parse(readFileSync(pathToModio).toString()).name
          }

          out.push({
            name: modName,
            path: filePath
          })
        }
      }
    }

    for (const item of readdirSync(path, { withFileTypes: true })) {
      if (item.isFile()) {
        await processFile(item, path)
        continue
      }

      const itemPath = join(path, item.name)
      for (const file of readdirSync(itemPath, { withFileTypes: true })) {
        if (file.isDirectory()) continue
        await processFile(file, itemPath)
      }
    }

    return out
  }

  static getMods = async (): Promise<IFindItem[]> => {
    const pathToUser = userInfo().homedir || homedir() || process.env.HOME || ''
    const out: IFindItem[] = []

    if (pathToUser) {
      let pathToMods: string | undefined
      const pathToModsEpic = join(pathToUser, 'Documents/My Games/SnowRunner/base/Mods/.modio/mods')
      const pathToModsSteam = join(pathToUser, 'Documents/my games/SnowRunner/base/Mods/.modio/mods')
      if (existsSync(pathToModsEpic)) {
        pathToMods = pathToModsEpic
      }
      else if (existsSync(pathToModsSteam)) {
        pathToMods = pathToModsSteam
      }
      if (pathToMods) {
        out.push(...await this.findMods(pathToMods))
      }
    }

    for (const enabledModName in this.mods.items) {
      const enabledModPath = this.mods.items[enabledModName].path
      let isExists = false

      for (const foundedModName in out) {
        if (out[foundedModName].path === enabledModPath) {
          isExists = true
        }
      }

      if (!isExists) out.push(this.mods.items[enabledModName])
    }

    return out
  }

  static getFromFolders = async (): Promise<IFindItem[] | undefined> => {
    const paths = Main.getDirs()
    const out: IFindItem[] = []
    if (!paths) return undefined

    for (const path of paths) {
      out.push(...await this.findMods(path))
    }

    return out
  }

  static getModPaks = async (): Promise<IFindItem[] | undefined> => {
    const paths = Main.getPaks()
    const out: IFindItem[] = []
    if (!paths) return undefined

    for (const path of paths) {
      const id = basename(path, '.pak')
      await Main.unpack(path, join(this.paths.modsTemp, id), true)
      if (!existsSync(join(this.paths.modsTemp, id, 'classes')))
        return undefined

      out.push({ path, name: id })
    }

    return out
  }

  static getList = (category: Category, from?: SrcType): IItem[] => {
    if (from === SrcType.dlc) {
      const array: IItem[] = []

      this.dlc.forEach(dlcItem => {
        const path = `${dlcItem.path}/classes`
        let items: IFindItem[] = []

        if (category === Category.trucks) {
          items = Main.findInDir(join(path, 'trucks'))
        }
        else if (category === Category.trailers) {
          items = Main.findInDir(join(path, 'trucks/trailers'))
        }

        array.push({
          dlcName: dlcItem.name,
          items,
          path: '',
          name: ''
        })
      })

      return array
    }
    if (from === SrcType.mods) {
      const array: IItem[] = []

      for (const modId in this.mods.items) {
        const item = this.mods.items[modId]
        let items: IFindItem[] = []

        if (category === Category.trucks) {
          items = Main.findInDir(join(this.paths.modsTemp, modId, 'classes/trucks'), false, '.xml', true)
        }
        else if (category === Category.trailers) {
          items = Main.findInDir(join(this.paths.modsTemp, modId, 'classes/trucks'), false, '.xml', true)
        }

        array.push({
          id: modId,
          name: item.name,
          path: '',
          items
        })
      }
      return array
    }

    if (category === Category.trucks) {
      return <IItem[]>Main.findInDir(join(this.paths.classes, 'trucks'))
    }

    if (category === Category.trailers) {
      return <IItem[]>Main.findInDir(join(this.paths.classes, 'trucks/trailers'))
    }

    return []
  }

  static {
    Preload.register<IListPreload>({
      getMods: this.getMods,
      getList: this.getList,
      getModPaks: this.getModPaks,
      getFromFolders: this.getFromFolders,
      removeDir: this.removeDir
    }, PreloadType.lists)
  }
}
