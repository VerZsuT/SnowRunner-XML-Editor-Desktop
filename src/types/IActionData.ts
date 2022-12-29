import type { CheerioAPI } from 'cheerio'

/** Параметры доп. сценария. */
interface IActionData {
  /** Название в меню. */
  name: string
  /** Уникальный номер. */
  id: string | number
  /** Минимальная ширина popup'а. */
  minWidth?: number
  /** Минимальная высота popup'а. */
  minHeight?: number
  /** Картинка для кнопки в меню. */
  imgSRC?: string

  isActive(dom: CheerioAPI, fileName: string): boolean
  onPressOk?(): void
  export?(dom: CheerioAPI): any
  import?(dom: CheerioAPI, data: any): void
}

export default IActionData
