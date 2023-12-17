import { BaseGameData } from '../../base'
import { innerElement } from '../../xml-with-templates'
import GearboxParams from './gearbox-params'

export { default as GearboxParams } from './gearbox-params'

/** Информация о взаимодействии коробки передач с окружающим миром */
export default class GameData extends BaseGameData {
  /** Наличие передач в коробке */
  @innerElement(GearboxParams)
  get GearboxParams(): GearboxParams | undefined { return undefined }
}
