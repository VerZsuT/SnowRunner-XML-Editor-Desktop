import type { IGameTexts } from './types'

export enum PubKeys {
  gameTexts = 'texts/game-texts'
}

export type PubType = {
  [PubKeys.gameTexts]: IGameTexts
}
