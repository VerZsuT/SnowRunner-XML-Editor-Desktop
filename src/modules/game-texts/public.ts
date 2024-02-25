import type { IGameTexts } from './types'

export enum Keys {
  gameTexts = 'texts.game-texts'
}

export interface IPublic {
  [Keys.gameTexts]: IGameTexts
}
