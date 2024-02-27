import type Limit from './limit'

export default class Position {
  static x(value: number) { return new Position(value, 0, 0) }
  static y(value: number) { return new Position(0, value, 0) }
  static z(value: number) { return new Position(0, 0, value) }

  static fromStr(str: string, limits?: PosLimits): Position {
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

  static limitPos(pos: Position, limiters: PosLimits): Position {
    return new Position(pos.x, pos.y, pos.z, limiters)
  }

  private _x = 0
  get x() { return this._x }
  set x(v: number) { this._x = this.limit(v, this.limits.x) }

  private _y = 0
  get y() { return this._y }
  set y(v: number) { this._y = this.limit(v, this.limits.y) }

  private _z = 0
  get z() { return this._z }
  set z(v: number) { this._z = this.limit(v, this.limits.z) }

  private limits: PosLimits = {}

  compare(other: Partial<Position>) {
    const newPos = new Position(
      other.x ?? this._x,
      other.y ?? this._y,
      other.z ?? this._z
    )
    return newPos
  }
  
  equals(other: Position) {
    return (
      this._x === other.x &&
      this._y === other.y &&
      this._z === other.z
    )
  }

  toString() {
    return `(${String(this._x)}; ${String(this._y)}; ${String(this._z)})`
  }

  constructor(x = 0, y = 0, z = 0, limits?: PosLimits) {
    this.limits = limits || {}
    this.x = x; this.y = y; this.z = z
  }

  private limit(v: number, limit?: Limit) { return limit ? limit.lim(v) : v }
}

export type PosLimits = {
  x?: Limit
  y?: Limit
  z?: Limit
}
