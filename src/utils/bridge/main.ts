/** Класс, имеющий публичные свойства / методы */
export abstract class HasPublic {
  constructor() {
    this.initPublic()
  }

  /** Инициализация публичных объектов/методов */
  protected abstract initPublic(): void
}
