import comparator from './comparator'
import Localized from './Localized'
import globalTexts from './texts'

import type { TextsToLocalize } from '#g/types'
import Config from '#m/modules/Config'

/**
 * Обновляет все поля объекта при изменении языка
 * @param texts - объект с локализированными вариантами
 */
export function localize<T extends object>(texts: TextsToLocalize<T>): T {
  return new Localized(texts, () => Config.lang, handler => Config.addChangeHandler(handler)).get()
}

export default localize(globalTexts)

/**
 * Вызывает `handler` когда язык программы был изменён
 * @returns функция удаления обработчика
 */
export function handleLangChange(handler: () => void): () => void {
  let prevLang = Config.lang

  function changeHandler() {
    if (Config.lang !== prevLang) {
      prevLang = Config.lang
      handler()
    }
  }

  Config.addChangeHandler(changeHandler)
  return () => Config.removeChangeHandler(changeHandler)
}

/** Объединить локальный перевод с глобальным */
export const compareWithGlobal = comparator(globalTexts, localize)
