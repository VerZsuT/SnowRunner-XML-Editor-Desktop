export default class Limit {
  private _min = Number.NEGATIVE_INFINITY
  private _max = Number.POSITIVE_INFINITY
  private _fixed = false

  get minValue() { return this._min }
  get maxValue() { return this._max }

  static Positive = new Limit({ min: 0.0 })
  static Negative = new Limit({ max: 0.0 })
  static Fixed = new Limit({ fixed: true })

  min(value: number) { this._min = value; return this }
  max(value: number) { this._max = value; return this }
  get fixed() { this._fixed = true; return this }

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
