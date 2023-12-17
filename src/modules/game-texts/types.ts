export interface IGameTexts {
  mods: {
    [modID: string]: ITranslation
  }
  main: ITranslation
}

export interface ITranslation {
  [key: string]: string
}
