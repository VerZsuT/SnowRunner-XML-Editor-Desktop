import type { MainEvent } from 'emr-bridge'

import type Config from './main'
import type { IConfig } from './types'

export enum Keys {
  object = 'config.obj',
  reset = 'config.reset',
  save = 'config.save',
  changeEvent = 'config.change-event',
  onChange = 'onConfig.change-event'
}

export interface IPublic {
  [Keys.object]: IConfig
  [Keys.reset]: typeof Config.reset
  [Keys.save]: typeof Config.save
  [Keys.onChange]: MainEvent<IConfig>
}
