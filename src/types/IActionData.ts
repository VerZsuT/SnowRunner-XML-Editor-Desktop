import type IXMLElement from './IXMLElement'

/** Параметры доп. сценария */
interface IActionData {
  /** Название в меню */
  name: string

  /** Уникальный номер */
  id: string | number

  /** Минимальная ширина popup'а */
  minWidth?: number

  /** Минимальная высота popup'а */
  minHeight?: number

  /** Картинка для кнопки в меню */
  imgSRC?: string

  isActive(dom: IXMLElement, fileName: string): boolean
  onPressOk?(): void
  export?(dom: IXMLElement): any
  import?(dom: IXMLElement, data: any): void
}

export default IActionData
