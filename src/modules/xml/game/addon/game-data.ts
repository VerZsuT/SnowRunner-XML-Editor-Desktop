import type { XmlElement } from '../attributes'
import { BaseGameData } from '../base'
import { innerElement } from '../xml-with-templates'
import InstallSocket from './install-socket'

export { default as AddonInstallSocket } from './install-socket'

/** Информация о взаимодействии двигателя с окружающим миром. */
export default class GameData extends BaseGameData {
  /** Сокет установки аддона. */
  @innerElement(InstallSocket)
  readonly InstallSocket: XmlElement<InstallSocket>
}
