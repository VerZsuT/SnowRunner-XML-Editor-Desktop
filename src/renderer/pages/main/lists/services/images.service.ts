import { DEBUG_IMAGES } from '#g/consts'
import { Category } from '#g/enums'
import type { IItem, IXMLElement } from '#g/types'
import bridge from '#r/scripts/bridge'
import { system } from '#r/services'

const paths = bridge.paths

class ImagesService {
  getSrc(category: Category, item: IItem, fileDOM: IXMLElement): string {
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
            const truckPath = `${paths.modsTemp}/${item.modId}/ui/textures/${imgName}.png`

            if (!system.existsSync(truckPath)) {
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

const images = new ImagesService()

export default images
