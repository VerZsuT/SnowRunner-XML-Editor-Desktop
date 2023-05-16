import { useOnDestroy } from 'react-afc'

/** Добавляет обработчик события элементу */
function addEventListener<
  ElemType extends Element | Document | Window,
  KeyType extends keyof MapType,
  MapType = ElemType extends Element
  ? ElementEventMap
  : ElemType extends Document
  ? DocumentEventMap
  : WindowEventMap
>(
  element: ElemType,
  type: KeyType,
  listener: (event: MapType[KeyType]) => void) {
  element.addEventListener(type.toString(), listener as EventListener)
  useOnDestroy(() => element.removeEventListener(type.toString(), listener as EventListener))
}

export default addEventListener
