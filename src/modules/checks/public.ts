import type Checks from './main'

export enum PubKeys {
  checkUpdate = 'checks/check-update'
}

export type PubType = {
  [PubKeys.checkUpdate]: typeof Checks.checkUpdate
}
