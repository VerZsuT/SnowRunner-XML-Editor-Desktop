export default interface IXMLElement {
  /** Существует ли выбранный элемент */
  exists: boolean

  /** Проверяет наличие элементов по селектору */
  has(selector: string): boolean

  /** Возвращает первый элемент по селектору */
  select(selector: string): IXMLElement

  /** Возвращает массив всех элементов по селектору */
  selectAll(selector: string): IXMLElement[]

  /** Возвращает DOM в виде HTML строки */
  toHTML(): string | null

  /** Возвращает родителя текущего элемента */
  parent(): IXMLElement

  /** Возвращает значение атрибута */
  getAttr(name: string): string | undefined

  /** Устанавливает значение атрибута */
  setAttr(name: string, value: string | undefined): IXMLElement

  /** Удаляет атрибут по имени */
  removeAttr(name: string): IXMLElement

  /** Имеются ли атрибуты у элемента */
  hasAttrs(): boolean

  /** Удаляет элемент из DOM */
  remove(): void

  /** Вставляет элемент с тегом в текущий элемент */
  appendTag(tagName: string): IXMLElement

  /** Вставляет строку в текущий элемент */
  append(xmlString: string): IXMLElement

  /** Вставляет элемент после текущего элемента */
  after(child: string | IXMLElement): IXMLElement

  /** Возвращает копию элемента */
  clone(): IXMLElement
}
