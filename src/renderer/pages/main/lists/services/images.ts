import type { CheerioAPI } from 'cheerio'
import { Bridge } from 'emr-bridge/renderer'

import { DEBUG_IMAGES } from '#consts'
import { Category } from '#enums'
import { system } from '#services'
import type { IItem, IMPC } from '#types'

class ImagesService {
  private readonly paths = Bridge.as<IMPC>().paths

  getSrc(category: Category, item: IItem, fileDOM: CheerioAPI): string {
    switch (category) {
    case Category.trailers:
      try {
        return require(`#images/trailers/${item.name}.png`)
      }
      catch {
        return require('#images/trailers/default.png')
      }
    case Category.trucks:
      try {
        return require(`#images/trucks/${item.name}.jpg`)
      }
      catch {
        const defaultImage = require('#images/trucks/default.png')
        if (DEBUG_IMAGES) {
          console.warn(`Не найдена картинка ${item.name}`)
        }

        if (item.modId && fileDOM('GameData > UiDesc').length) {
          const imgName = fileDOM('GameData > UiDesc').attr('UiIcon328x458')
          const truckPath = `${this.paths.modsTemp}/${item.modId}/ui/textures/${imgName}.png`

          if (!system.existsSync(truckPath)) return defaultImage
          else return truckPath
        }
        return defaultImage
      }
    }
  }
}

export const images = new ImagesService()
