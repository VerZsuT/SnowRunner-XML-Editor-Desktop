import { createRoot } from 'react-dom/client'

import { handleLangChange } from '#g/texts/renderer'
import Bridge from '#r/scripts/bridge'

export default class Helpers {
  private static texts = Bridge.texts
  private static readonly ROOT = document.getElementById('main')

  /** Заменяет `_` на пробелы и делает первую букву большой. */
  static prettyString(str: string): string {
    const text = str.replaceAll('_', ' ')
    const firstChar = text[0].toUpperCase()

    return `${firstChar}${text.slice(1)}`
  }

  /** Рендерит компонент в `root` контейнер страницы */
  static renderComponent(element: JSX.Element): void | never {
    if (!this.ROOT) throw new Error('Missing root element')
    createRoot(this.ROOT).render(element)
  }

  /**
   * Возвращает игровой перевод по ключу.
   * @param key
   * @param modId - id модификации.
   */
  static getGameText(key: string | undefined, modId?: string): string | undefined {
    let value: string | undefined
    const modsTexts = this.texts.mods
    const gameTexts = this.texts.main

    if (!key) return

    if (modId && modsTexts[modId] && modsTexts[modId][key]) {
      value = modsTexts[modId][key]
    }
    else if (gameTexts[key]) {
      value = gameTexts[key]
    }

    return value
  }

  static {
    handleLangChange(() => this.texts = Bridge.texts)
  }
}
