import { existsSync, readdirSync, readFileSync, rmSync } from 'fs'
import { homedir, userInfo } from 'os'
import { basename, extname, join } from 'path'

import { Category, PreloadType, SrcType } from '#g/enums'
import type { IFindItem, IItem, IListPreload } from '#g/types'
import main from '#r/scripts/main'
import { Preload } from '#r/services/interprocess'

class _ListsPreload {
  static readonly paths = main.paths
  static readonly config = main.config
  static readonly dlc = this.config.dlc
  static readonly mods = this.config.mods

  static removeDir = (path: string): void => {
    rmSync(path, { recursive: true })
  }

  static findMods = async (): Promise<IFindItem[]> => {
    const pathToUser = userInfo().homedir || homedir() || process.env.HOME || ''
    const out: IFindItem[] = []

    if (!existsSync(pathToUser)) return []

    const pathToMods = join(pathToUser, 'Documents/My Games/SnowRunner/base/Mods/.modio/mods')
    if (!existsSync(pathToMods)) return []

    for (const folder of readdirSync(pathToMods, { withFileTypes: true })) {
      if (folder.isFile()) continue
      const modFolder = join(pathToMods, folder.name)

      for (const file of readdirSync(modFolder, { withFileTypes: true })) {
        if (file.isDirectory()) continue

        const filePath = join(modFolder, file.name)
        const tempModFolder = join(this.paths.modsTemp, file.name)
        if (extname(file.name) === '.pak') {
          await main.unpack(filePath, tempModFolder, true)
          if (existsSync(join(tempModFolder, 'classes'))) {
            const pathToModio = join(modFolder, 'modio.json')
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

  static getModPak = async (): Promise<IFindItem | undefined> => {
    const path = main.getInitial()
    if (!path) return

    const name = basename(path)
    const id = basename(path, '.pak')
    await main.unpack(path, join(this.paths.modsTemp, id), true)
    if (!existsSync(join(this.paths.modsTemp, id, 'classes')))
      return

    return { path, name }
  }

  static getList = (category: Category, from?: SrcType): IItem[] => {
    if (from === SrcType.dlc) {
      const array: IItem[] = []

      this.dlc.forEach(dlcItem => {
        const path = `${dlcItem.path}/classes`
        let items: IFindItem[] = []

        if (category === Category.trucks) {
          items = main.findInDir(join(path, 'trucks'))
        }
        else if (category === Category.trailers) {
          items = main.findInDir(join(path, 'trucks/trailers'))
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
          items = main.findInDir(join(this.paths.modsTemp, modId, 'classes/trucks'), false, '.xml', true)
        }
        else if (category === Category.trailers) {
          items = main.findInDir(join(this.paths.modsTemp, modId, 'classes/trucks'), false, '.xml', true)
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
      return <IItem[]>main.findInDir(join(this.paths.classes, 'trucks'))
    }

    if (category === Category.trailers) {
      return <IItem[]>main.findInDir(join(this.paths.classes, 'trucks/trailers'))
    }

    return []
  }

  static {
    Preload.register<IListPreload>({
      findMods: this.findMods,
      getList: this.getList,
      getModPak: this.getModPak,
      removeDir: this.removeDir
    }, PreloadType.lists)
  }
}
