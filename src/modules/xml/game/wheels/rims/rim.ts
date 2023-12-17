import { BaseGameData } from '../../base'
import type { StrUtils } from '../../game-xml'
import { strAttr, strUtils } from '../../game-xml'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'

/** Диск или пара дисков */
export default class TruckRim extends XMLWithTemplates {
  /** Имя диска */
  @strAttr()
  get Name(): string | undefined { return undefined }
  set Name(_) {}
  @strUtils()
  get $Name() { return {} as StrUtils }

  /** Информация о взаимодействии диска с окружающим миром */
  @innerElement(BaseGameData)
  get GameData(): BaseGameData | undefined { return undefined }
}
