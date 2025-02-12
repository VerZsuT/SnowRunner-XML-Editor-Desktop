import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import type { IStringAttrDescriptor } from '../attributes'
import { stringAttr } from '../attributes'
import BasePhysicsModel from '../base/physics-model'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'
import GameData from './game-data'
import TruckData from './truck-data'

export * from './game-data'
export { default as TruckGameData } from './game-data'
export * from './truck-data'
export { default as TruckData } from './truck-data'

/** XML автомобиля/прицепа. */
export default class TruckXML extends XMLWithTemplates {
  static override async from(str: string): Promise<TruckXML | undefined>
  static override async from(file: File): Promise<TruckXML | undefined>
  static override async from(source: string | File): Promise<TruckXML | undefined> {
    const rootSelector = 'Truck'
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

  /** Этот атрибут определяет, описывается трак или трейлер (прицеп или полуприцеп). */
  @stringAttr<TruckFileType>()
  accessor Type: TruckFileType | undefined
  declare $Type: IStringAttrDescriptor<TruckFileType>

  /** Описание большинства свойств непосредственно трака. */
  @innerElement(TruckData)
  readonly TruckData: TruckData | undefined

  /** Информация о взаимодействии трака с окружающим миром. */
  @innerElement(GameData)
  readonly GameData: GameData | undefined

  /** Физическая модель. */
  @innerElement(BasePhysicsModel)
  readonly PhysicsModel: BasePhysicsModel | undefined

  @innerElement(BasePhysicsModel)
  readonly FuelMass: BasePhysicsModel | undefined

  @innerElement(BasePhysicsModel)
  readonly WaterMass: BasePhysicsModel | undefined
}

export enum TruckFileType {
  trailer = 'Trailer'
}
