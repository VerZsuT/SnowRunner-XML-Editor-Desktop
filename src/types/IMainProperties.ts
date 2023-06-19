import type IConfig from './IConfig'
import type IGameTexts from './IGameTexts'
import type IPaths from './IPaths'

export default interface IMainProperties {
  texts: IGameTexts
  paths: IPaths
  config: IConfig
}
