import type { IFile } from '@modules/files/renderer'
import { XMLElement } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { IStringAttrDescriptor, XmlElement, XmlValue } from '../attributes'
import { stringAttr } from '../attributes'
import { BasePhysicsModel } from '../base/physics-model'
import { XMLWithTemplates, innerElement } from '../xml-with-templates'
import { TruckGameData } from './game-data'
import { TruckData } from './truck-data'

export * from './game-data'
export * from './truck-data'

/** XML автомобиля/прицепа. */
export class TruckXML extends XMLWithTemplates {
  static override async from(str: string): Promise<TruckXML | undefined>
  static override async from(file: IFile): Promise<TruckXML | undefined>
  static override async from(source: string | IFile): Promise<TruckXML | undefined> {
    const rootSelector = 'Truck'
    const root = await XMLElement.from(source as IFile)
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
  accessor Type: XmlValue<TruckFileType>
  declare $Type: IStringAttrDescriptor<TruckFileType>

  /** Описание большинства свойств непосредственно трака. */
  @innerElement(TruckData)
  readonly TruckData: XmlElement<TruckData>

  /** Информация о взаимодействии трака с окружающим миром. */
  @innerElement(TruckGameData)
  readonly GameData: XmlElement<TruckGameData>

  /** Физическая модель. */
  @innerElement(BasePhysicsModel)
  readonly PhysicsModel: XmlElement<BasePhysicsModel>

  @innerElement(BasePhysicsModel)
  readonly FuelMass: XmlElement<BasePhysicsModel>

  @innerElement(BasePhysicsModel)
  readonly WaterMass: XmlElement<BasePhysicsModel>
}

export enum TruckFileType {
  trailer = 'Trailer'
}
