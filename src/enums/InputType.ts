/** Тип поля ввода */
enum InputType {
  /** Поле ввода текста */
  text = 'text',
  /** Поле ввода числа */
  number = 'number',
  /** Поле ввода с выбором */
  select = 'select',
  /** Поле ввода координат` */
  coordinates = 'coordinates',
  /**
   * Дополнительный файл
   * @deprecated
   */
  file = 'file'
}

export default InputType
