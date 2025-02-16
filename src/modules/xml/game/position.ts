import type Limit from './limit'

/** Позиция (набор координат). */
export default class Position {
  /**
   * Получить позицию с X координатой.
   * @param value X координата.
   */
  static x(value: number) {
    return new Position(value, 0, 0)
  }

  /**
   * Получить позицию с Y координатой.
   * @param value Y координата.
   */
  static y(value: number) {
    return new Position(0, value, 0)
  }

  /**
   * Получить позицию с Z координатой.
   * @param value Z координата.
   */
  static z(value: number) {
    return new Position(0, 0, value)
  }

  /**
   * Создать из строки.
   * @param str Строка.
   * @param limits Ограничения.
   * @returns Позиция.
   */
  static from(str: string, limits?: PosLimits): Position {
    const [
      x = '0.0', y = '0.0', z = '0.0'
    ] = str.replaceAll(/[()]/g, '').split(/[,;]/gi)

    return new Position(
      Number.parseFloat(x),
      Number.parseFloat(y),
      Number.parseFloat(z),
      limits
    )
  }

  /**
   * Получить позицию с ограничением.
   * @param pos Позиция.
   * @param limits Ограничение.
   * @returns Позиция с ограничением.
   */
  static limitPos(pos: Position, limits: PosLimits): Position {
    return new Position(pos.x, pos.y, pos.z, limits)
  }

  /** X координата. */
  get x() {
    return this._x
  }

  set x(value: number) {
    this._x = this.limitCoordinate(value, this.limits.x)
  }

  /** Y координата. */
  get y() {
    return this._y
  }

  set y(value: number) {
    this._y = this.limitCoordinate(value, this.limits.y)
  }

  /** Z координата. */
  get z() {
    return this._z
  }

  set z(value: number) {
    this._z = this.limitCoordinate(value, this.limits.z)
  }

  /** X координата. */
  private _x = 0

  /** Y координата. */
  private _y = 0

  /** Z координата. */
  private _z = 0

  /** Лимиты координат. */
  private limits: PosLimits = {}

  constructor(x = 0, y = 0, z = 0, limits?: PosLimits) {
    this.limits = limits || {}
    this.x = x
    this.y = y
    this.z = z
  }

  /**
   * Объединить координаты.
   * @param other Другие координаты.
   * @returns Объединённые координаты.
   */
  toCompared(other: Partial<Position>) {
    return new Position(
      other.x ?? this._x,
      other.y ?? this._y,
      other.z ?? this._z
    )
  }
  
  /**
   * Равны ли координаты.
   * @param other Другие координаты.
   * @returns Равны ли координаты.
   */
  equals(other: Position) {
    return (
      this._x === other.x
      && this._y === other.y
      && this._z === other.z
    )
  }

  /**
   * Получить строку.
   * @returns Строка.
   */
  toString() {
    return `(${this._x}; ${this._y}; ${this._z})`
  }

  /**
   * Ограничить значение координаты.
   * @param limit Ограничение координаты.
   * @param value Значение координаты.
   * @returns Ограниченное значение координаты.
   */
  private limitCoordinate(value: number, limit?: Limit) {
    return limit
      ? limit.lim(value)
      : value
  }
}

/** Ограничение позиции. */
export type PosLimits = {
  /** Лимит координаты X. */
  x?: Limit

  /** Лимит координаты Y. */
  y?: Limit

  /** Лимит координаты Z. */
  z?: Limit
}
