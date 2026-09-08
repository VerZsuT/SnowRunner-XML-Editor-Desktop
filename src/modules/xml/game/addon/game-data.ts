import type { XmlElement } from '../attributes'
import { BaseGameData } from '../base/game-data'
import { innerElement } from '../xml-with-templates'
import { AddonInstallSocket } from './install-socket'

export * from './install-socket'

/** Информация о взаимодействии двигателя с окружающим миром. */
export class AddonGameData extends BaseGameData {
	/** Сокет установки аддона. */
	@innerElement(AddonInstallSocket)
	readonly InstallSocket: XmlElement<AddonInstallSocket>
}
