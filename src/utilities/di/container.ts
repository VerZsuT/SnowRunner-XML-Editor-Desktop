import type { InjectionToken } from './token'

/** Базовый тип для любых конструкторов (включая абстрактные). */
export type AnyConstructor = abstract new (...args: any[]) => any;

class DIContainer {
  // Кэш уже созданных инстансов (синглтонов)
  private dependencies = new Map<symbol, any>()

  // Фабрики для ленивых синглтонов (выполняются один раз и кэшируются)
  private lazyFactories = new Map<symbol,() => any>()

  // Фабрики для transient-зависимостей (каждый раз создают новый объект)
  private factories = new Map<symbol,(...params: any[]) => any>()

  /**
   * Зарегистрировать готовый синглтон.
   */
  register<T extends AnyConstructor>(
    token: InjectionToken<T>,
    instance: InstanceType<T>
  ): void {
    this.dependencies.set(token.key, instance)
  }

  /**
   * Зарегистрировать ленивый синглтон.
   * Функция-фабрика не должна требовать рантайм-параметров, так как она вызывается автоматически.
   */
  registerLazy<T extends AnyConstructor>(
    token: InjectionToken<T>,
    factory: () => InstanceType<T>
  ): void {
    this.lazyFactories.set(token.key, factory)
  }

  /**
   * Зарегистрировать обычную фабрику (transient).
   * Каждый раз при запросе будет создаваться новый инстанс с переданными параметрами.
   */
  registerFactory<T extends AnyConstructor>(
    token: InjectionToken<T>,
    factory: (...params: ConstructorParameters<T>) => InstanceType<T>
  ): void {
    this.factories.set(token.key, factory)
  }

  /**
   * Разрешить зависимость. TypeScript автоматически выведет тип возвращаемого значения.
   */
  resolve<T extends AnyConstructor>(
    token: InjectionToken<T>,
    ...params: ConstructorParameters<T>
  ): InstanceType<T> {
    // 1. Проверяем, есть ли уже созданный инстанс в кэше синглтонов
    if (this.dependencies.has(token.key)) {
      return this.dependencies.get(token.key)
    }

    // 2. Если инстанса нет, но есть ленивая фабрика — инициализируем синглтон
    if (this.lazyFactories.has(token.key)) {
      const factory = this.lazyFactories.get(token.key)!
      const instance = factory()

      this.dependencies.set(token.key, instance) // Кэшируем результат
      this.lazyFactories.delete(token.key)       // Удаляем фабрику

      return instance
    }

    // 3. Проверяем transient-фабрики (передаем динамические параметры)
    if (this.factories.has(token.key)) {
      return this.factories.get(token.key)!(...params)
    }

    throw new Error(`[DI Error]: Dependency for token "${token.key.toString()}" is not registered.`)
  }

  /**
   * Очистить контейнер.
   */
  clear(): void {
    this.dependencies.clear()
    this.lazyFactories.clear()
    this.factories.clear()
  }
}

export const di = new DIContainer()

/**
 * Декоратор свойства/аксессора для автоматического внедрения (TS5 стандарт).
 * Позволяет инжектить только те классы, конструктор которых не требует обязательных параметров,
 * либо параметры которых равны undefined / опциональны.
 */
export function inject<
  T extends abstract new (...args: any[]) => any
>(
  // Условие на уровне типов: декоратор разрешено вешать только на те зависимости,
  // которые можно вызвать без передачи аргументов в resolve().
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
          // Безопасно вызываем без параметров, так как тип токена гарантирует их отсутствие
          return di.resolve(token as any)
        },
        enumerable: true,
        configurable: true
      })
    })
  }
}
