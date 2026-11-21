import type { IGameContext } from '../game-xml'
import { XMLElement, parseXML } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { INumberAttrDescriptor, XmlElement, XmlValue } from '../attributes'
import { floatAttr, integerAttr, properties } from '../attributes'
import { BaseWheelFriction } from '../base/wheel-friction'
import { Limit } from '../limit'
import { XMLWithTemplates, innerElement } from '../xml-with-templates'

/** Рутовый тег файла класса коробки передач. */
export class Wheel extends XMLWithTemplates {
	static override async from(source: string | XMLElement, context?: IGameContext): Promise<Wheel | undefined> {
		const rootSelector = 'TruckWheel'
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

	/** Масса колеса. */
	@properties({
		limit: Limit.Positive.fixed()
	})
	@integerAttr()
	accessor Mass: XmlValue<number>
	declare $Mass: INumberAttrDescriptor

	/** Радиус колеса. */
	@properties({
		limit: Limit.Positive
	})
	@floatAttr()
	accessor Radius: XmlValue<number>
	declare $Radius: INumberAttrDescriptor

	/** Ширина. */
	@properties({
		limit: Limit.Positive
	})
	@floatAttr()
	accessor Width: XmlValue<number>
	declare $Width: INumberAttrDescriptor

	/** Размер допустимого ущерба. */
	@properties({
		limit: new Limit({ min: 0, max: 64_000, fixed: true })
	})
	@integerAttr()
	accessor DamageCapacity: XmlValue<number>
	declare $DamageCapacity: INumberAttrDescriptor

	/** Трение колеса. */
	@innerElement(BaseWheelFriction, 'WheelFriction', true)
	readonly WheelFriction: XmlElement<BaseWheelFriction>
}
