import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'
import GameData from './game-data'
import TruckData from './truck-data'

export * from './game-data'
export { default as AddonGameData } from './game-data'
export { default as AddonTruckData } from './truck-data'

/** Рутовый тег файла класса двигателей */
export default class TruckAddon extends XMLWithTemplates {
  static override async fromFile(file: File): Promise<TruckAddon | undefined> {
    const rootSelector = 'TruckAddon'
    const root = await XMLElement.fromFile(file)
    const element = root?.select(rootSelector)
    if (!root || !element) return

    return new this(
      element,
      await XMLTemplates.fromXML(root),
      rootSelector,
      root
    )
  }

  /** Свойства непосредственно аддона */
  @innerElement(TruckData)
  get TruckData(): TruckData | undefined { return undefined }

  @innerElement(GameData)
  get GameData(): GameData | undefined { return undefined }
}
