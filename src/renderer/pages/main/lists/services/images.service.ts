import { DEBUG_IMAGES } from '#g/consts'
import { Category } from '#g/enums'
import type { IItem, IXMLElement } from '#g/types'
import Bridge from '#r/scripts/bridge'
import { System } from '#r/services'

export default class ImagesService {
  private static readonly paths = Bridge.paths

  static getSrc(category: Category, item: IItem, fileDOM: IXMLElement): string {
    switch (category) {
      case Category.trailers:
        try {
          return require(`#g/images/trailers/${item.name}.png`)
        }
        catch {
          return require('#g/images/trailers/default.png')
        }
      case Category.trucks:
        try {
          return require(`#g/images/trucks/${item.name}.jpg`)
        }
        catch {
          const defaultImage = require('#g/images/trucks/default.png')
          if (DEBUG_IMAGES) {
            console.warn(`Не найдена картинка ${item.name}`)
          }

          if (item.modId && fileDOM.has('GameData > UiDesc')) {
            const imgName = fileDOM.select('GameData > UiDesc').getAttr('UiIcon328x458')
            const truckPath = `${this.paths.modsTemp}/${item.modId}/ui/textures/${imgName}.png`

            if (!System.existsSync(truckPath)) {
              return defaultImage
            }
            else {
              return truckPath
            }
          }
          return defaultImage
        }
    }
  }
}
