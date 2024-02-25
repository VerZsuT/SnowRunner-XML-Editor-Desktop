export default class Limit {
  private readonly NEG_INF = Number.NEGATIVE_INFINITY
  private readonly POS_INF = Number.POSITIVE_INFINITY

  private _min = this.NEG_INF
  private _max = this.POS_INF
  private _fixed = false

  get minValue() { return this._min }
  get maxValue() { return this._max }

  static get Positive() { return new Limit({ min: 0.0 }) }
  static get Negative() { return new Limit({ max: 0.0 }) }
  static get Fixed() { return new Limit({ fixed: true }) }

  min(value: number) { this._min = value; return this }
  max(value: number) { this._max = value; return this }
  fixed() { this._fixed = true; return this }

  constructor({ min, max, fixed }: { min?: number; max?: number; fixed?: boolean } = {}) {
    if (min !== undefined) this._min = min
    if (max !== undefined) this._max = max
    if (fixed !== undefined) this._fixed = fixed
  }

  lim(value: number) {
    if (this._fixed) value = Math.round(value)
    return Math.max(Math.min(value, this._max), this._min)
  }
}
