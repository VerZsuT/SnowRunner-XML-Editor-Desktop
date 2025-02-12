import { Category } from '../../renderer/pages/general/enums'

import { Config, Mods } from '/mods/data/renderer'
import { Dir, File } from '/mods/files/renderer'
import type { TruckXML } from '/mods/xml/renderer'

/** Работа с картинками */
class Images {
  /** Возвращает путь к картинке для данного файла */
  async getSrc(category: Category, file: File, xml: TruckXML): Promise<string> {
    const ext = category === Category.trucks ? '.jpg' : '.png'
    
    const images = new Dir(this.getPath(category))
    const image = images.file(`${file.name}${ext}`)
    const defaultImage = images.file('default.png')

    const modID = Mods.getModID(file)
    if (modID) {
      const modImage = await this.getModImage(category, file, xml)
      return modImage ? modImage.path : defaultImage.path
    }
    
    if (!await this.imageExists(image)) {
      return defaultImage.path
    }

    return image.path
  }

  /** Получить путь к иконке группы */
  getGroupIconSrc(name: string) {
    return this.getPath(`icons/${name}.png`)
  }

  /** Возвращает путь в папке `images` */
  getPath(pathInImagesFolder: string) {
    const base = Config.isDev ? '/src' : '..'
    return `${base}/images/${pathInImagesFolder}`
  }

  /** Получить модовую картинку */
  private async getModImage(category: Category, file: File, xml: TruckXML): Promise<File | undefined> {
    const modName = Mods.getModID(file)
    if (!modName || !xml.GameData?.UiDesc) return

    const images = new Dir(this.getPath(category))
    const defaultImage = images.file('default.png')

    const imgName = xml.GameData?.UiDesc?.UiIcon328x458
    const imgFile = new File(`../../../../../build/modsTemp/${modName}/ui/textures/${imgName}.png`)

    return await this.imageExists(imgFile) ? imgFile : defaultImage
  }

  /** Существует ли картика */
  private imageExists(file: File): Promise<boolean> {
    const image = new Image()
    image.src = file.path

    return new Promise(resolve => {
      image.onload = () => resolve(true)
      image.onerror = () => resolve(false)
    })
  }
}

export default new Images()
