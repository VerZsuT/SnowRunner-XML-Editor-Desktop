import type { XmlElement } from '../../attributes'
import { BaseGameData } from '../../base/game-data'
import { innerElement } from '../../xml-with-templates'
import { GearboxParams } from './gearbox-params'

export * from './gearbox-params'

/** Информация о взаимодействии коробки передач с окружающим миром. */
export class GearboxGameData extends BaseGameData {
	/** Наличие передач в коробке. */
	@innerElement(GearboxParams)
	readonly GearboxParams: XmlElement<GearboxParams>
}
