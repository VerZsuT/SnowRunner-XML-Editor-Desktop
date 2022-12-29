import { useOnDestroy, useOnMount } from 'react-afc/compatible'

import type { ISetHotKeyParams } from '#types'

/**
 * Устанавливает обработчик события нажатия кнопки
 * @param config - параметры
 * @param handler - обработчик события
 */
function useKey(config: ISetHotKeyParams | ISetHotKeyParams['key'], handler: (event: KeyboardEvent) => void): void {
  let ctrlKey: boolean | undefined
  let shiftKey: boolean | undefined
  let prevent: boolean | undefined
  let key: ISetHotKeyParams['key']

  if (typeof config === 'string') {
    key = config
  }
  else {
    key = config.key
    ctrlKey = config.ctrlKey
    shiftKey = config.shiftKey
    prevent = config.prevent
  }

  ctrlKey ??= false
  shiftKey ??= false
  prevent ??= false

  const eventName = (key === 'Escape') ? 'keydown' : 'keypress'

  function eventHandler(event: KeyboardEvent) {
    const keyIsValid = event.code === key
    const ctrlIsValid = !ctrlKey || (ctrlKey && event.ctrlKey)
    const shiftIsValid = !shiftKey || (shiftKey && event.shiftKey)

    if (keyIsValid && ctrlIsValid && shiftIsValid) {
      if (prevent) event.preventDefault()
      handler(event)
    }
  }

  useOnMount(() => document.addEventListener(eventName, eventHandler))
  useOnDestroy(() => document.removeEventListener(eventName, eventHandler))
}

export default useKey
