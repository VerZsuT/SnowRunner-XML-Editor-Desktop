import type { MainEvent } from 'emr-bridge'

import type Config from './main'
import type { IConfig } from './types'

export enum PubKeys {
  object = 'config/obj',
  reset = 'config/reset',
  save = 'config/save',
  changeEvent = '-config/change-event',
  onChange = `on${PubKeys.changeEvent}`
}

export type PubType = {
  [PubKeys.object]: IConfig
  [PubKeys.reset]: typeof Config.reset
  [PubKeys.save]: typeof Config.save
  [PubKeys.onChange]: MainEvent<IConfig>
}
