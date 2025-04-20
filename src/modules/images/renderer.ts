import type { Category } from '../../renderer/pages/general/enums'
import { Config, Mods } from '/mods/data/renderer'
import type { IFile } from '/mods/files/renderer'
import { Dir, File } from '/mods/files/renderer'
import type { TruckXML } from '/mods/xml/renderer'

/**
 * Работа с картинками.
 * _renderer process_
 */
class Images {
  /**
   * Получить путь к картинке для данного файла автомобиля/прицепа.
   * @param category Категория файла.
   * @param file Файл.
   * @param xml XML файла.
   * @returns Путь к картинке для данного файла автомобиля/прицепа.
   */
  async getSrc(category: Category, file: IFile, xml: TruckXML): Promise<string> {
    const images = new Dir(this.getImagePath(category))
    const image = images.file(`${file.name}.webp`)
    const defaultImage = images.file('default.webp')

    const modID = Mods.getModID(file)

    if (modID) {
      const modImage = await this.getModImage(category, file, xml)

      return modImage
        ? modImage.path
        : defaultImage.path
    }
    
    return await this.imageExists(image)
      ? image.path
      : defaultImage.path
  }

  /**
   * Получить путь к картинке по умолчанию.
   * @param category Категория.
   * @returns Путь к картинке по умолчанию.
   */
  getDefault(category: Category): string {
    return new Dir(this.getImagePath(category)).file('default.webp').path
  }

  /**
   * Получить путь к иконке группы.
   * @param name Название группы.
   * @returns Путь к иконке группы.
   */
  getGroupIconSrc(name: string): string {
    return this.getImagePath(`icons/${name}.webp`)
  }

  /**
   * Получить путь в папке `images`.
   * @param pathInImagesFolder Название подпапки картинок в папке `images`.
   * @returns Путь в папке `images`.
   */
  getImagePath(pathInImagesFolder: string) {
    const base = Config.isDev
      ? '/src'
      : '..'

    return `${base}/images/${pathInImagesFolder}`
  }

  /**
   * Получить модовую картинку.
   * @param category Категория.
   * @param file Файл.
   * @param xml XML файла.
   * @returns Модовая картинка.
   */
  private async getModImage(category: Category, file: IFile, xml: TruckXML): Promise<IFile | undefined> {
    const modName = Mods.getModID(file)

    if (!modName || !xml.GameData?.UiDesc) {
      return
    }

    const images = new Dir(this.getImagePath(category))
    const defaultImage = images.file('default.webp')

    const imgName = xml.GameData?.UiDesc?.UiIcon328x458
    const imgFile = new File(`${'../'.repeat(5)}build/modsTemp/${modName}/ui/textures/${imgName}.png`)

    return await this.imageExists(imgFile)
      ? imgFile
      : defaultImage
  }

  /**
   * Существует ли картинка.
   * @param file Файл картинки.
   * @returns Существует ли картинка.
   */
  private imageExists(file: IFile): Promise<boolean> {
    const image = new Image()
    
    return new Promise(resolve => {
      image.onload = () => resolve(true)
      image.onerror = () => resolve(false)
      image.src = file.path
    })
  }
}

/**
 * Работа с картинками.
 * _renderer process_
 */
export default new Images()
