import type { IStringAttrDescriptor } from '../../attributes'
import { stringAttr } from '../../attributes'
import { BaseGameData } from '../../base'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'

/** Диск или пара дисков. */
export default class TruckRim extends XMLWithTemplates {
  /** Имя диска. */
  @stringAttr()
  accessor Name: string | undefined
  declare $Name: IStringAttrDescriptor

  /** Информация о взаимодействии диска с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: BaseGameData | undefined
}
