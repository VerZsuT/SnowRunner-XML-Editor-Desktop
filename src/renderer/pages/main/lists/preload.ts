import { existsSync, readdirSync, readFileSync, rmSync } from 'fs'
import { homedir, userInfo } from 'os'
import { basename, extname, join } from 'path'

import { Main } from 'emr-bridge/preload'

import { Category, PreloadType, SrcType } from '#enums'
import preload from '#services/preload'
import type { IFindItem, IItem, IListPreload, MPC } from '#types'

const main = Main.as<MPC>()
const { paths, config } = main
const { dlc, mods } = config

class ListsPreload {
  constructor() {
    preload.register<IListPreload>({
      findMods: this.findMods,
      getList: this.getList,
      getModPak: this.getModPak,
      removeDir: this.removeDir
    }, PreloadType.lists)
  }

  private removeDir = (path: string): void => {
    rmSync(path, { recursive: true })
  }

  private findMods = async (): Promise<IFindItem[]> => {
    const pathToUser = userInfo().homedir || homedir() || process.env.HOME || ''
    const out: IFindItem[] = []

    if (!existsSync(pathToUser)) return []

    const pathToMods = join(pathToUser, 'Documents/My Games/SnowRunner/base/Mods/.modio/mods')
    if (!existsSync(pathToMods)) return []

    readdirSync(pathToMods, { withFileTypes: true }).forEach(folder => {
      if (folder.isFile()) return
      const modFolder = join(pathToMods, folder.name)

      readdirSync(modFolder, { withFileTypes: true }).forEach(file => {
        if (file.isDirectory()) return

        const filePath = join(modFolder, file.name)
        const tempModFolder = join(paths.modsTemp, file.name)
        if (extname(file.name) === '.pak') {
          main.unpack(filePath, tempModFolder, true)
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
      })
    })

    for (const enabledModName in mods.items) {
      const enabledModPath = mods.items[enabledModName].path
      let isExists = false

      for (const foundedModName in out) {
        if (out[foundedModName].path === enabledModPath) {
          isExists = true
        }
      }

      if (!isExists) out.push(mods.items[enabledModName])
    }

    return out
  }

  private getModPak = (): IFindItem | undefined => {
    const path = main.getInitial()
    if (!path) return

    const name = basename(path)
    const id = basename(path, '.pak')
    main.unpack(path, join(paths.modsTemp, id), true)
    if (!existsSync(join(paths.modsTemp, id, 'classes'))) {
      return
    }

    return { path, name }
  }

  private getList = (category: Category, from?: SrcType): IItem[] => {
    if (from === SrcType.dlc) {
      const array: IItem[] = []

      dlc.forEach(dlcItem => {
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

      for (const modId in mods.items) {
        const item = mods.items[modId]
        let items: IFindItem[] = []

        if (category === Category.trucks) {
          items = main.findInDir(join(paths.modsTemp, modId, 'classes/trucks'), false, '.xml', true)
        }
        else if (category === Category.trailers) {
          items = main.findInDir(join(paths.modsTemp, modId, 'classes/trucks'), false, '.xml', true)
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
      return <IItem[]> main.findInDir(join(paths.classes, 'trucks'))
    }

    if (category === Category.trailers) {
      return <IItem[]> main.findInDir(join(paths.classes, 'trucks/trailers'))
    }

    return []
  }
}

new ListsPreload()
