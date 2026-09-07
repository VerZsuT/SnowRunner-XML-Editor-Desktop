/**
 * Класс токена, несущий в себе информацию о типе внедряемой зависимости.
 * Дженерик T используется только на этапе компиляции.
 */
export class InjectionToken<_> {
  // Уникальный ключ для рантайма
  readonly key: symbol

  constructor(description: string) {
    this.key = Symbol(description)
  }
}
