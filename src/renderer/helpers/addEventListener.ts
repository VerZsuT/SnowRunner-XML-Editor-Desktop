import { onDestroy } from 'react-afc/compatible'

export function addEventListener<K extends keyof DocumentEventMap>(
  element: Element | Document | Window,
  type: K,
  listener: (this: Element, ev: DocumentEventMap[K]) => any) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  element.addEventListener(type, listener)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  onDestroy(() => element.removeEventListener(type, listener))
}
