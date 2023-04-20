import type { Lang } from '#g/enums'
import type { TextsToLocalize } from '#g/types'

/**
 * Локализированный объект текстов
 * 
 * Имеет функционал обработки изменений
 */
class Localized<T extends object> {
  private readonly localized: T

  constructor(
    private texts: TextsToLocalize<T>,
    private getLang: () => Lang,
    changeLangDetector?: (handler: () => void) => void
  ) {
    this.localized = { ...texts[getLang()] }

    if (changeLangDetector) {
      changeLangDetector(this.onChangeLang)
    }
  }

  get = () => this.localized

  private onChangeLang = () => {
    Object.assign(this.localized, this.texts[this.getLang()])
  }
}

export default Localized
