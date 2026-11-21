import { XMLElement, parseXML } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { IGameContext } from '../game-xml'
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
  static override async from(source: string | XMLElement, context?: IGameContext): Promise<TruckXML | undefined> {
    const rootSelector = 'Truck'
    const root = XMLElement.isXMLElement(source) ? source : parseXML(source)
    const element = root?.select(rootSelector)

    if (root && element) {
      return new this(
        element,
        await XMLTemplates.from(root, context),
        rootSelector,
        root,
        context
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
