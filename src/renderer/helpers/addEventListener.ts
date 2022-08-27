import {afterUnmount} from 'react-afc'

export function addEventListener<K extends keyof DocumentEventMap>(
    element: Element | Document | Window,
    type: K,
    listener: (ev: DocumentEventMap[K]) => any) {
    element.addEventListener(type, listener)
    afterUnmount(() => element.removeEventListener(type, listener))
}
