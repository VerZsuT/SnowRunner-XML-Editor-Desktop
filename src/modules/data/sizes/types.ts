/** Размеры. */
export interface IFileSizes {
  /** Размер `initial.pak`. */
  initial: number

  /** Размеры модификаций. */
  mods: {
    [fileName: string]: number
  }
}
