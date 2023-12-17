import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import BasePhysicsModel from '../base/physics-model'
import type { StrUtils } from '../game-xml'
import { strAttr, strUtils } from '../game-xml'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'
import GameData from './game-data'
import TruckData from './truck-data'

export * from './game-data'
export { default as TruckGameData } from './game-data'
export * from './truck-data'
export { default as TruckData } from './truck-data'

export default class TruckXML extends XMLWithTemplates {
  static override async fromFile(file: File): Promise<TruckXML | undefined> {
    const rootSelector = 'Truck'
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

  /** Этот атрибут определяет, описывается трак или трейлер (прицеп или полуприцеп) */
  @strAttr<TruckFileType>()
  get Type(): TruckFileType | undefined { return undefined }
  set Type(_) {}
  @strUtils<TruckFileType>()
  get $Type() { return {} as StrUtils }

  /** Описание большинства свойств непосредственно трака */
  @innerElement(TruckData)
  get TruckData(): TruckData | undefined { return undefined }

  /** Информация о взаимодействии трака с окружающим миром */
  @innerElement(GameData)
  get GameData(): GameData | undefined { return undefined }

  /** Физическая модель */
  @innerElement(BasePhysicsModel)
  get PhysicsModel(): BasePhysicsModel | undefined { return undefined }

  @innerElement(BasePhysicsModel)
  get FuelMass(): BasePhysicsModel | undefined { return undefined }
}

export enum TruckFileType {
  trailer = 'Trailer'
}
