import type IConfig from './IConfig'
import type IGameTexts from './IGameTexts'
import type IPaths from './IPaths'

interface IMainProperties {
  texts: IGameTexts
  paths: IPaths
  config: IConfig
}

export default IMainProperties
