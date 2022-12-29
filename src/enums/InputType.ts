/** Тип поля ввода */
enum InputType {
  /** Значение поля - `текст` */
  text = 'text',
  /** Значение поля - `число` */
  number = 'number',
  select = 'select',
  /** Значение поля - `координата` */
  coordinates = 'coordinates',
  /** Значение поля - `кнопки открытия XML файла(ов)` */
  file = 'file'
}

export default InputType
