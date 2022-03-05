import main from './main'
import config from './config'
import type { ITexts } from 'texts'

export default main.texts[config.lang] as unknown as ITexts
