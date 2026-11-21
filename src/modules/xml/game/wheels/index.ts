import type { IGameContext } from '../game-xml'
import { XMLElement, parseXML } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { INumberAttrDescriptor, XmlElement, XmlValue } from '../attributes'
import { floatAttr, integerAttr, properties } from '../attributes'
import { Limit } from '../limit'
import { XMLWithTemplates, innerElement } from '../xml-with-templates'
import { TruckRims } from './rims'
import { TruckTires } from './tires'

export * from './rims'
export * from './tires'

/** Рутовый тег файла класса типа колес (набор взаимозаменяемых шин и дисков). */
export class Wheels extends XMLWithTemplates {
	static override async from(source: string | XMLElement, context?: IGameContext): Promise<Wheels | undefined> {
		const rootSelector = 'TruckWheels'
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

	/** Размер допустимого ущерба. */
	@properties({
		limit: new Limit({ min: 0, max: 64_000, fixed: true })
	})
	@integerAttr()
	accessor DamageCapacity: XmlValue<number>
	declare $DamageCapacity: INumberAttrDescriptor

	/** Радиус колеса. */
	@properties({
		limit: Limit.Positive,
		default: 1.0
	})
	@floatAttr()
	accessor Radius: XmlValue<number>
	declare $Radius: INumberAttrDescriptor

	/** Ширина колеса. */
	@properties({
		limit: Limit.Positive,
		default: 1.0
	})
	@floatAttr()
	accessor Width: XmlValue<number>
	declare $Width: INumberAttrDescriptor

	/** Радиус заднего колеса. */
	@properties({
		limit: Limit.Positive,
		default: 1.0
	})
	@floatAttr()
	accessor RadiusRear: XmlValue<number>
	declare $RadiusRear: INumberAttrDescriptor

	/** Ширина заднего колеса. */
	@properties({
		limit: Limit.Positive,
		default: 1.0
	})
	@floatAttr()
	accessor WidthRear: XmlValue<number>
	declare $WidthRear: INumberAttrDescriptor

	/** Секция описания шин. */
	@innerElement(TruckTires)
	readonly TruckTires: XmlElement<TruckTires>

	/** Секция описания дисков. */
	@innerElement(TruckRims)
	readonly TruckRims: XmlElement<TruckRims>
}
