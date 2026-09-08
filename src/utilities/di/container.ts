import type { InjectionToken } from './token'

/** Конструктор. */
export type ConstructorOf<T> = { new(): T }

/** Базовый тип для конструкторов (включая абстрактные). */
export type AnyConstructor = abstract new (...args: any[]) => any

export class DIContainer {
	/** Кэш уже созданных инстансов (синглтонов). */
	private dependencies = new Map<symbol, any>()

	/** Фабрики для ленивых синглтонов (выполняются один раз и кэшируются). */
	private lazyFactories = new Map<symbol,() => any>()

	/** Фабрики для transient-зависимостей (каждый раз создают новый объект). */
	private factories = new Map<symbol,(...params: any[]) => any>()

	/**
	 * Зарегистрировать готовый синглтон.
	 * @param token Токен.
	 * @param instance Экземпляр синглтона.
	 */
	register<T extends AnyConstructor>(
		token: InjectionToken<T>,
		instance: InstanceType<T>
	): void {
		this.dependencies.set(token.key, instance)
	}

	/**
	 * Зарегистрировать ленивый синглтон.
	 * @param token Токен.
	 * @param factory Фабрика без параметров.
	 */
	registerLazy<T extends AnyConstructor>(
		token: InjectionToken<T>,
		factory: () => InstanceType<T>
	): void {
		this.lazyFactories.set(token.key, factory)
	}

	/**
	 * Зарегистрировать обычную фабрику (transient).
	 * @param token Токен.
	 * @param factory Фабрика.
	 */
	registerFactory<T extends AnyConstructor>(
		token: InjectionToken<T>,
		factory: (...params: ConstructorParameters<T>) => InstanceType<T>
	): void {
		this.factories.set(token.key, factory)
	}

	/**
	 * Получить зависимость.
	 * @param token Токен.
	 * @param params Параметры конструктора.
	 * @returns Зависимость.
	 */
	resolve<T extends AnyConstructor>(
		token: InjectionToken<T>,
		...params: ConstructorParameters<T>
	): InstanceType<T> {
		if (this.dependencies.has(token.key)) {
			return this.dependencies.get(token.key)
		}

		if (this.lazyFactories.has(token.key)) {
			const factory = this.lazyFactories.get(token.key)!
			const instance = factory()

			this.dependencies.set(token.key, instance)
			this.lazyFactories.delete(token.key)

			return instance
		}

		if (this.factories.has(token.key)) {
			return this.factories.get(token.key)!(...params)
		}

		throw new Error(`[DI Error]: Dependency for token "${token.key.toString()}" is not registered.`)
	}

	/** Очистить контейнер. */
	clear(): void {
		this.dependencies.clear()
		this.lazyFactories.clear()
		this.factories.clear()
	}
}

/** DI контейнер. */
export const di = new DIContainer()

/**
 * Получить зависимость.
 * @param token Токен.
 * @returns Декоратор для получения зависимости.
 */
export function inject<
	T extends AnyConstructor
>(
	token: ConstructorParameters<T> extends [] | [undefined] ? InjectionToken<T> : never
) {
	return function <This, Value extends InstanceType<T>>(
		_target: undefined | ClassAccessorDecoratorTarget<This, Value>,
		context: ClassFieldDecoratorContext<This, Value> | ClassAccessorDecoratorContext<This, Value>
	) {
		const name = context.name.toString()

		context.addInitializer(function (this: any) {
			Object.defineProperty(this, name, {
				get() {
					return di.resolve(token as any)
				},
				enumerable: true,
				configurable: true
			})
		})
	}
}
