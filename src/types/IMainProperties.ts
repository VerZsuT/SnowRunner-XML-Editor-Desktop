import type { IConfig } from './IConfig'
import type { IGameTexts } from './IGameTexts'
import type { IPaths } from './IPaths'

export interface IMainProperties {
  texts: IGameTexts
  paths: IPaths
  config: IConfig
}
