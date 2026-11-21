import { isString } from '@utilities/checks/renderer'
import { useEffect, useRef } from 'react'

/** Название события клавиши. */
export type KeyEventName = 'keypress' | 'keyup' | 'keydown'

/** Параметры горячей клавиши. */
export interface IHotKeysParams {
	/** Клавиша. */
	key: string

	/** Название события. */
	eventName?: KeyEventName

	/** Требуется ли нажатия `CTRL`. */
	ctrlKey?: boolean

	/** Требуется ли нажатие `SHIFT`. */
	shiftKey?: boolean

	/** Убрать поведение по умолчанию. */
	prevent?: boolean
}

/**
 * Устанавливает обработчик события нажатия кнопки.
 * @param params Параметры.
 * @param handler Обработчик события.
 */
export function useKey(params: IHotKeysParams | IHotKeysParams['key'], handler: (event: KeyboardEvent) => void) {
	const {
		key,
		ctrlKey = false,
		prevent = false,
		shiftKey = false
	}: IHotKeysParams = isString(params)
		? { key: params }
		: params

	const eventName = key === 'Escape'
		? 'keydown'
		: 'keypress'
	const handlerRef = useRef(handler)

	handlerRef.current = handler

	useEffect(() => {
		function eventHandler(event: KeyboardEvent) {
			const keyIsValid = event.code === key
			const ctrlIsValid = ctrlKey === event.ctrlKey
			const shiftIsValid = shiftKey === event.shiftKey

			if (keyIsValid && ctrlIsValid && shiftIsValid) {
				if (prevent) {
					event.preventDefault()
				}

				handlerRef.current(event)
			}
		}

		document.addEventListener(eventName, eventHandler)

		return () => document.removeEventListener(eventName, eventHandler)
	}, [key, ctrlKey, prevent, shiftKey, eventName])
}
