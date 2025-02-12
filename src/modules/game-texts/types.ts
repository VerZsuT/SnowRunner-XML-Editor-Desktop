/** Игровые тексты. */
export interface IGameTexts {
  /** Тексты самой игры. */
  main: ITranslation

  /** Тексты модификаций. */
  mods: {
    [modID: string]: ITranslation
  }
}

/** Перевод. */
export interface ITranslation {
  [key: string]: string
}
