import { ProgramError } from '@modules/errors/main'
import { emitEvent, on, publishFunction, publishVariable, type EventUnsubscribe } from 'emr-bridge/main'
import { getClassName, getPublicName } from '../helpers'
import type { IPubNamed } from '../types'

/**
 * Обработчик изменения.
 * @param name Название поля.
 * @param value Значение поля.
 */
type ChangeHandler = (name: string, value: any) => void

export function publishInstanceFunction<
	const Method extends string
>(target: IPubNamed, methodName: Method, instanceGetter: () => Record<Method, (...args: any) => any>){
	const publicName = getPublicName(getClassName(target), methodName)

	publishFunction(publicName, (...args: any[]) => {
		try {
			const result = instanceGetter()[methodName](...args)

			return isThenable(result)
				? result.catch((error: unknown) => {
					throw toBridgeError(publicName, error)
				})
				: result
		} catch (error: unknown) {
			throw toBridgeError(publicName, error)
		}
	})
}

export function publishInstanceVariable<
	const Field extends string
>(target: IPubNamed, fieldName: Field, instanceGetter: () => Record<Field, any>){
	const publicName = getPublicName(getClassName(target), fieldName)

	publishVariable(publicName, {
		get: () => instanceGetter()[fieldName],
		set: value => instanceGetter()[fieldName] = value
	})
}

export function makeReactive<
	const Field extends string,
	Target extends Record<Field, any>
>(target: Target, fieldName: Field, onChange?: () => void) {
	const secretField = Symbol(`_${fieldName}`)
	const className = getClassName(target.constructor as unknown as IPubNamed)

	target[secretField] = target[fieldName]
	onRendererChangeEvent(className, fieldName, value => target[secretField] = value)
	Object.defineProperty(target, fieldName, {
		get(this: Target) {
			return this[secretField]
		},
		set(this: Target, value) {
			this[secretField] = value
			getChangeHandler(className)(fieldName, value)
			onChange?.()
		}
	})
}

/**
 * Проверить, является ли значение промисом.
 * @param value Значение.
 * @returns Является ли значение промисом.
 */
function isThenable(value: unknown): value is Promise<unknown> {
	return !!value && typeof (value as Promise<unknown>).then === 'function'
}

/**
 * Залогировать ошибку опубликованной функции и вернуть её как ошибку программы.
 * @param publicName Публичное имя функции.
 * @param error Ошибка.
 * @returns Ошибка программы.
 */
function toBridgeError(publicName: string, error: unknown): ProgramError {
	const normalized = error instanceof Error ? error : new Error(String(error))

	console.error(`[bridge] ${publicName}`, normalized)

	return error instanceof ProgramError
		? error
		: new ProgramError('bridge', normalized.message, normalized)
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
