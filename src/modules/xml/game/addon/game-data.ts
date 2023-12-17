import { BaseGameData } from '../base'
import { innerElement } from '../xml-with-templates'
import InstallSocket from './install-socket'

export { default as AddonInstallSocket } from './install-socket'

export default class GameData extends BaseGameData {
  @innerElement(InstallSocket)
  get InstallSocket(): InstallSocket | undefined { return undefined }
}
