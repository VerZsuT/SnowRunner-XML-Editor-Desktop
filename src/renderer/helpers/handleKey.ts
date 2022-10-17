import { onDestroy, onMount } from 'react-afc/compatible'

import type { ISetHotKeyParams } from '#types'

/**
 * Устанавливает обработчик события нажатия кнопки
 * @param config - параметры
 * @param handler - обработчик события
 */
export function handleKey(config: ISetHotKeyParams, handler: (event: KeyboardEvent) => void): void {
  const {
    key,
    ctrlKey = false,
    shiftKey = false,
    prevent = false,
    eventName = (key === 'Escape') ? 'keydown' : 'keypress'
  } = config

  function eventHandler(event: KeyboardEvent) {
    const keyIsValid = event.code === key
    const ctrlIsValid = !ctrlKey || (ctrlKey && event.ctrlKey)
    const shiftIsValid = !shiftKey || (shiftKey && event.shiftKey)

    if (keyIsValid && ctrlIsValid && shiftIsValid) {
      if (prevent) event.preventDefault()
      handler(event)
    }
  }

  onMount(() => document.addEventListener(eventName, eventHandler))
  onDestroy(() => document.removeEventListener(eventName, eventHandler))
}
