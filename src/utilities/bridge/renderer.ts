import type { EventUnsubscribe } from 'emr-bridge/renderer'
import { Bridge } from 'emr-bridge/renderer'
import { reactive, toRaw, watch } from 'vue'
import { getPublicName } from './helpers'

const bridge = Bridge.as<object>()

/** Название свойства с main методами. */
const MAIN_METHODS_PROPERTY = Symbol('main methods')

/** Название свойства с main полями. */
const MAIN_FIELDS_PROPERTY = Symbol('main fields')

/** Название обработчика изменения. */
const CHANGE_HANDLER = Symbol('on change')

/** Название свойства с перечислением обновляемых из main процесса. */
const UPDATE_FROM_MAIN = Symbol('update from main')

export const INIT_METHOD = Symbol('init method')

/** Публичные методы. */
interface IMainMethod {
	/** Название метода. */
	name: string
}

/** Публичные поля. */
interface IMainField {
	/** Название поля. */
	name: string
}

/** Обновляемые из main процесса. */
type UpdateFromMain = Set<string>

/**
 * Свойство с публичными методами.
 * @param name Название поля.
 * @param value Значение поля.
 */
type ChangeHandler = (name: string, value: any) => void

/** Инициализировать main методы и поля класса. */
export function initMain() {
	return function<Class extends new (...args: any) => any>(
		target: Class,
		context: ClassDecoratorContext<Class>
	) {
		const className = context.name ?? ''

		return class extends target {
			constructor(...args: any[]) {
				super(...args)
				getChangeHandler(this, className)

				for (const { name } of getMainMethods(this)) {
					const publicName = getPublicName(className, name)

					this[name] = (...args: any[]) => bridge[publicName](...args)
				}

				for (const {name} of getMainFields(this)) {
					const publicName = getPublicName(className, name)

					withUpdateFromMain(this, name, () => this[name] = bridge[publicName])
					onMainChangeEvent(publicName, value => {
						withUpdateFromMain(this, name, () => this[name] = value)
					})
				}
				// @ts-expect-error
				this[INIT_METHOD]?.()
			}
		}
	}
}

/** Добавить main метод класса. */
export function mainMethod() {
	return function<This, Value>(
		_target: Value,
		context: ClassFieldDecoratorContext<This>
	) {
		context.addInitializer(function(this: This) {
			getMainMethods(this).push({
				name: context.name.toString()
			})
		})
	}
}

/** Добавить main object поле класса. */
export function mainObjectField() {
	return function<This, Value extends object>(
		_target: unknown,
		context: ClassFieldDecoratorContext<This, Value>
	) {
		context.addInitializer(getMainObjectFieldInitializer(context.name.toString()))
	}
}

/** Добавить main array поле класса. */
export function mainArrayAccessor() {
	return function<This, Value extends Array<unknown>>(
		target: ClassAccessorDecoratorTarget<This, Value>,
		context: ClassAccessorDecoratorContext<This, Value>
	): ClassAccessorDecoratorResult<This, Value> {
		context.addInitializer(getMainArrayFieldInitializer(context.name.toString()))

		return target
	}
}

/**
 * Получить инициализатор object поля.
 * @param name Название object поля.
 * @returns Инициализатор object поля.
 */
function getMainObjectFieldInitializer(name: string) {
	return function<This, Value extends object>(this: This) {
		const secretKey = Symbol(`_${name}`)

		getMainFields(this).push({ name })
		Object.defineProperty(this, name, {
			get(this: This) {
				return this[secretKey]
			},
			set(this: This, value: Value) {
				this[secretKey] ??= initReactive({...value}, newValue => {
					if (!getUpdateFromMain(this).has(name)) {
						getChangeHandler(this)(name, newValue)
					}
				})

				Object.assign(this[secretKey], value)
			},
			enumerable: true
		})
	}
}

/**
 * Получить инициализатор array поля.
 * @param name Название array поля.
 * @returns Инициализатор array поля.
 */
function getMainArrayFieldInitializer(name: string) {
	return function<This, Value extends Array<unknown>>(this: This) {
		const secretKey = Symbol(`_${name}`)

		getMainFields(this).push({ name })
		Object.defineProperty(this, name, {
			get(this: This) {
				return this[secretKey]
			},
			set(this: This, value: Value) {
				this[secretKey] ??= initReactive([...value] as Value, newValue => {
					if (!getUpdateFromMain(this).has(name)) {
						getChangeHandler(this)(name, newValue)
					}
				})

				this[secretKey].length = 0
				this[secretKey].push(...value)
			},
			enumerable: true
		})
	}
}

/**
 * Инициализировать реактивное значение.
 * @param value Нереактивное значение.
 * @param onChange Обработчик изменения значения.
 * @returns Реактивное значение.
 */
function initReactive<Value extends object>(value: Value, onChange: (newValue: Value) => void) {
	const reactiveValue = reactive(value)

	watch(reactiveValue, value => onChange(toRaw(value) as Value), { flush: 'sync' })

	return reactiveValue
}

/**
 * Выполнить действие с учётом что поле было изменено в main процессе.
 * @param target Экземпляр класса.
 * @param name Название поля.
 * @param func Действие.
 */
function withUpdateFromMain(target: any, name: string, func: () => void): void {
	getUpdateFromMain(target).add(name)
	func()
	getUpdateFromMain(target).delete(name)
}

/**
 * Получить список обновляемых из main процесса.
 * @param target Экземпляр класса.
 * @returns Список обновляемых из main процесса.
 */
function getUpdateFromMain(target: any): UpdateFromMain {
	return target[UPDATE_FROM_MAIN] ??= new Set<string>()
}

/**
 * Получить обработчик изменения.
 * @param target Экземпляр класса.
 * @param className Название класса.
 * @returns Обработчик изменения.
 */
function getChangeHandler(target: any, className?: string): ChangeHandler {
	return target[CHANGE_HANDLER] ??= ((name: string, value: any) => {
		emitRendererChangeEvent(getPublicName(className!, name), value)
	})
}

/**
 * Вызвать событие изменения поля.
 * @param name Название поля.
 * @param value Значение поля.
 */
function emitRendererChangeEvent(name: string, value: any): void {
	bridge.emit(`${name}/renderer-change-event`, value)
}

/**
 * Обработать изменение поля из main процесса.
 * @param name Название поля.
 * @param handler Обработчик.
 * @returns Функция отписки.
 */
function onMainChangeEvent(name: string, handler: (value: any) => void): EventUnsubscribe {
	return bridge.on(`${name}/main-change-event`, handler)
}

/**
 * Получить main поля.
 * @param target Экземпляр класса.
 * @returns Main поля.
 */
function getMainFields(target: any): IMainField[] {
	return target[MAIN_FIELDS_PROPERTY] ??= []
}

/**
 * Получить main методы.
 * @param target Экземпляр класса.
 * @returns Main методы.
 */
function getMainMethods(target: any): IMainMethod[] {
	return target[MAIN_METHODS_PROPERTY] ??= []
}
