import { Category } from '/rend/pages/main/enums'

import { Config, Mods } from '/mods/data/renderer'
import { Dir, File } from '/mods/files/renderer'
import { TruckXML } from '/mods/xml/renderer'

class Images {
  /** Возвращает путь к картинке для данного файла */
  async getSrc(category: Category, file: File, xml: TruckXML): Promise<string> {
    const base = Config.isDev ? '/src' : '..'
    const images = new Dir(base, '/images', category)  // {project}/src/images || {app}/renderer/src/renderer/pages
    const defaultImage = images.file('default.png')
    const ext = category === Category.trucks ? '.jpg' : '.png'

    const modID = Mods.getModID(file)
    if (modID) {
      const modImage = await this.getModImage(file, xml)
      return modImage ? modImage.path : defaultImage.path
    }
    
    const image = images.file(`${file.name}${ext}`)
    if (!await this.imageExists(image)) {
      return defaultImage.path
    }

    return image.path
  }

  getGroupIconSrc(name: string) {
    const base = Config.isDev ? '/src' : '..'
    return `${base}/images/icons/${name}.png`
  }

  private async getModImage(file: File, xml: TruckXML): Promise<File | undefined> {
    const modName = Mods.getModID(file)
    if (!modName || !xml.GameData?.UiDesc) return undefined

    const base = Config.isDev ? '/src' : '..'
    const images = new Dir(base, '/images/trucks') // {project}/src/images || {app}/renderer/src/renderer/pages
    const defaultImage = images.file('default.png')

    const imgName = xml.GameData?.UiDesc?.UiIcon328x458
    const imgFile = new File(`../../../../../build/modsTemp/${modName}/ui/textures/${imgName}.png`)

    return await this.imageExists(imgFile) ? imgFile : defaultImage
  }

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
