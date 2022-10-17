import type { NameType } from '#enums'

export interface IGroupLabel {
  /**
   * Тип названия группы.
   *
   * @default NameType.static
   */
  type?: NameType
  /**
   * Селектор элемента, у которого будет взято название группы
   *
   * Используется вместе с `nameAttribute`
   *
   * _Только при `nameType`=`NameType.computed` | `NameType.tagName`_
   */
  selector?: string | [string, string]
  /**
   * Имя атрибута, который будет взят у элемента названия
   *
   * Используется вместе с `nameSelector` или `resNameSelector`
   *
   * _Только при `nameType`=`NameType.computed`_
   */
  attribute?: string | [string, string]
}
