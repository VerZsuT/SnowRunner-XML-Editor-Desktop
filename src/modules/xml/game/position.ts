import type Limit from './limit'

/** Позиция (набор координат) */
export default class Position {
  /** Позиция с X координатой */
  static x(value: number) { return new Position(value, 0, 0) }
  /** Позиция с Y координатой */
  static y(value: number) { return new Position(0, value, 0) }
  /** Позиция с Z координатой */
  static z(value: number) { return new Position(0, 0, value) }

  /** Создать из строки */
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

  /** Позиция с лимитом  */
  static limitPos(pos: Position, limits: PosLimits): Position {
    return new Position(pos.x, pos.y, pos.z, limits)
  }

  /** X координата */
  get x() { return this._x }
  set x(value: number) {
    this._x = this.limit(value, this.limits.x)
  }

  /** Y координата */
  get y() { return this._y }
  set y(value: number) {
    this._y = this.limit(value, this.limits.y)
  }

  /** Z координата */
  get z() { return this._z }
  set z(value: number) {
    this._z = this.limit(value, this.limits.z)
  }

  /** X координата */
  private _x = 0
  /** Y координата */
  private _y = 0
  /** Z координата */
  private _z = 0

  /** Лимиты координат */
  private limits: PosLimits = {}

  /** Объединить координаты */
  toCompared(other: Partial<Position>) {
    const newPos = new Position(
      other.x ?? this._x,
      other.y ?? this._y,
      other.z ?? this._z
    )
    return newPos
  }
  
  /** Равны ли координаты */
  equals(other: Position) {
    return (
      this._x === other.x &&
      this._y === other.y &&
      this._z === other.z
    )
  }

  /** Преобразование в строку */
  toString() {
    return `(${String(this._x)}; ${String(this._y)}; ${String(this._z)})`
  }

  constructor(x = 0, y = 0, z = 0, limits?: PosLimits) {
    this.limits = limits || {}
    this.x = x; this.y = y; this.z = z
  }

  /** Лимитировать значение */
  private limit(value: number, limit?: Limit) {
    return limit ? limit.lim(value) : value
  }
}

/** Лимит позиции */
export type PosLimits = {
  /** Лимит координаты X */
  x?: Limit
  /** Лимит координаты Y */
  y?: Limit
  /** Лимит координаты Z */
  z?: Limit
}
