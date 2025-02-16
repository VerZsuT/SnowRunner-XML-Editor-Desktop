/** Аргументы конструктора `Limit`. */
export type LimitArgs = {
  /** Минимальное значение. */
  min?: number

  /** Максимально значение. */
  max?: number
  
  /** Целочисленное значение. */
  fixed?: boolean
}

/** Лимит числового значения. */
export default class Limit {
  /** Минимальное значение. */
  get minValue() {
    return this._min
  }

  /** Максимальное значение. */
  get maxValue() {
    return this._max
  }

  /** Только положительные значения (включая 0). */
  static get Positive() {
    return new Limit({ min: 0.0 })
  }

  /** Только отрицательные значения (включая 0). */
  static get Negative() {
    return new Limit({ max: 0.0 })
  }

  /** Только целочисленные значения. */
  static get Fixed() {
    return new Limit({ fixed: true })
  }

  /** Установить минимальное значение. */
  min(value: number) {
    this._min = value
    
    return this
  }

  /** Установить максимальное значение. */
  max(value: number) {
    this._max = value
    
    return this
  }

  /** Округлять значение до целого. */
  fixed() {
    this._fixed = true
    
    return this
  }

  /** Минимум. */
  private _min = Number.NEGATIVE_INFINITY

  /** Максимум. */
  private _max = Number.POSITIVE_INFINITY

  /** Округлять до целочисленного. */
  private _fixed = false

  constructor({ min, max, fixed }: LimitArgs = {}) {
    if (min !== undefined) {
      this._min = min
    }

    if (max !== undefined) {
      this._max = max
    }

    if (fixed !== undefined) {
      this._fixed = fixed
    }
  }

  /** Лимитировать значение. */
  lim(value: number) {
    return this.limMax(this.limMin(this.round(value)))
  }

  /** Лимитировать по минимальному значению. */
  limMin(value: number) {
    return this._min === Number.NEGATIVE_INFINITY
      ? value
      : Math.max(this._min, value)
  }

  /** Лимитировать по максимальному значению. */
  limMax(value: number) {
    return this._max === Number.POSITIVE_INFINITY
      ? value
      : Math.min(this._max, value)
  }

  /** Округлить до целого если требуется. */
  round(value: number) {
    return this._fixed
      ? Math.round(value)
      : value
  }
}
