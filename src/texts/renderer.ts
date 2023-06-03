import comparator from './comparator'
import Localized from './Localized'
import globalTexts from './texts'

import type { TextsToLocalize } from '#g/types'
import Config from '#r/services/config.service'

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

/**
 * Обновляет все поля объекта при изменении языка
 * @param texts - объект с локализированными вариантами
 */
export function localize<Value extends { [key: string]: any }>(texts: TextsToLocalize<Value>): Value {
  return new Localized(texts, () => Config.lang, handleLangChange).get()
}

/**
 * Обновляет поле `val` объекта при изменении языка
 * @param texts - объект с локализированными вариантами
 */
export function localizeVal<Value>(texts: TextsToLocalize<Value>): { val: Value } {
  const temp = { ...texts }

  for (const key in temp) {
    temp[key] = { val: temp[key] }
  }

  return localize(temp as TextsToLocalize<{ val: Value }>)
}

/**
 * Обновляет поле `val` объекта при изменении языка (вызывает геттер)
 * @param texts - геттер локализируемой сущности
 */
export function updateOnLangChange<Value>(getter: () => Value): { val: Value, cast: <T>() => T } {
  const value = {
    val: getter(),
    cast: <T>() => value as T
  }
  handleLangChange(() => value.val = getter())
  return value
}

/** Объединить локальный перевод с глобальным */
export const compareWithGlobal = comparator(globalTexts, localize)
