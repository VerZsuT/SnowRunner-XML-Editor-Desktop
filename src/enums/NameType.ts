/** Тип названия группы */
enum NameType {
  /** Статическое */
  static   = 'static',
  /** Значение атрибута по селектору */
  computed = 'computed',
  /** Название элемента по селектору */
  tagName  = 'tagName'
}

export default NameType
