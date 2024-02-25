import { onMounted, onUnmounted } from 'vue'

import { isString } from '/utils/renderer'

export type KeyEventName = 'keypress' | 'keyup' | 'keydown'

export interface IHotKeysParams {
  key: string
  eventName?: KeyEventName
  ctrlKey?: boolean
  shiftKey?: boolean
  prevent?: boolean
}

/**
 * Устанавливает обработчик события нажатия кнопки
 * 
 * @param params - параметры
 * @param handler - обработчик события
 */
export default function useKey(params: IHotKeysParams | IHotKeysParams['key'], handler: (event: KeyboardEvent) => void) {
  const {
    key,
    ctrlKey = false,
    prevent = false,
    shiftKey = false
  }: IHotKeysParams = isString(params) ? { key: params } : params

  const eventName = key === 'Escape' ? 'keydown' : 'keypress'

  function eventHandler(event: KeyboardEvent) {
    const keyIsValid = event.code === key
    const ctrlIsValid = ctrlKey && event.ctrlKey
    const shiftIsValid = shiftKey && event.shiftKey

    if (keyIsValid && ctrlIsValid && shiftIsValid) {
      if (prevent) event.preventDefault()
      handler(event)
    }
  }

  onMounted(() => document.addEventListener(eventName, eventHandler))
  onUnmounted(() => document.removeEventListener(eventName, eventHandler))
}
