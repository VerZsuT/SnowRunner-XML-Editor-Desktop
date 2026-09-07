import { emitEvent, on, publishFunction, publishVariable, type EventUnsubscribe } from 'emr-bridge/main'
import { getPublicName } from '../helpers'

/**
 * Обработчик изменения.
 * @param name Название поля.
 * @param value Значение поля.
 */
type ChangeHandler = (name: string, value: any) => void

export function publishInstanceFunction<
	const Method extends string
>(className: string, methodName: Method, instanceGetter: () => Record<Method, (...args: any) => any>){
	publishFunction(getPublicName(className, methodName), (...args) => instanceGetter()[methodName](...args))
}

export function publishInstanceVariable<
	const Field extends string
>(className: string, fieldName: Field, instanceGetter: () => Record<Field, any>){
	publishVariable(getPublicName(className, fieldName), {
		get: () => instanceGetter()[fieldName],
		set: value => instanceGetter()[fieldName] = value
	})
}

export function makeReactive<
	const Field extends string,
	Target extends Record<Field, any>
>(target: Target, className: string, fieldName: Field) {
	const secretField = Symbol(`_${fieldName}`)

	target[secretField] = target[fieldName]
	onRendererChangeEvent(className, fieldName, value => target[secretField] = value)
	Object.defineProperty(target, fieldName, {
		get(this: Target) {
			return this[secretField]
		},
		set(this: Target, value) {
			this[secretField] = value
			getChangeHandler(className)(fieldName, value)
		}
	})
}

/**
 * Получить обработчик изменения.
 * @param className Название класса.
 * @returns Обработчик изменения.
 */
function getChangeHandler(className: string): ChangeHandler {
  return ((name: string, value: any) => {
    emitMainChangeEvent(getPublicName(className, name), value)
  }) satisfies ChangeHandler
}

/**
 * ВЫзвать событие изменения сущности из main процесса.
 * @param name Название сущности.
 * @param value Значение.
 */
function emitMainChangeEvent(name: string, value: any): void {
  emitEvent(`${name}/main-change-event`, value)
}

/**
 * Обработать изменение поля из main процесса.
 * @param name Название поля.
 * @param handler Обработчик.
 * @returns Функция отписки.
 */
function onRendererChangeEvent(className: string, name: string, handler: (value: any) => void): EventUnsubscribe {
	return on(`${getPublicName(className, name)}/renderer-change-event`, handler)
}
