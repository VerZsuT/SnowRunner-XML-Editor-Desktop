import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'
import GameData from './game-data'
import TruckData from './truck-data'

export * from './game-data'
export { default as AddonGameData } from './game-data'
export { default as AddonTruckData } from './truck-data'

/** Рутовый тег файла класса двигателей. */
export default class TruckAddon extends XMLWithTemplates {
  static override async from(str: string): Promise<TruckAddon | undefined>
  static override async from(file: File): Promise<TruckAddon | undefined>
  static override async from(source: string | File): Promise<TruckAddon | undefined> {
    const rootSelector = 'TruckAddon'
    const root = await XMLElement.from(source as File)
    const element = root?.select(rootSelector)

    if (root && element) {
      return new this(
        element,
        await XMLTemplates.from(root),
        rootSelector,
        root
      )
    }
  }

  /** Свойства непосредственно аддона. */
  @innerElement(TruckData)
  readonly TruckData: TruckData | undefined

  /** Информация о взаимодействии двигателя с окружающим миром. */
  @innerElement(GameData)
  readonly GameData: GameData | undefined
}
