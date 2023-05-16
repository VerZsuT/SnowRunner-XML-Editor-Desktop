interface IGroupLabel {
  /**
   * Селектор элемента, у которого будет взято название группы
   *
   * Используется вместе с `nameAttribute`
   *
   * _Только при `nameType`=`NameType.computed` | `NameType.tagName`_
   */
  selector: string | [string, string]
  /**
   * Имя атрибута, который будет взят у элемента названия
   *
   * Используется вместе с `nameSelector` или `resNameSelector`
   *
   * _Только при `nameType`=`NameType.computed`_
   */
  attribute?: string | [string, string]
}

export default IGroupLabel