import type Checks from './main'

export enum Keys {
  checkUpdate = 'checks.check-update'
}

export interface IPublic {
  [Keys.checkUpdate]: typeof Checks.checkUpdate
}
