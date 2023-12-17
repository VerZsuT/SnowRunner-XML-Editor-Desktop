import type Updates from './main'

export enum Keys {
  updateApp = 'updates.update-app'
}

export interface IPublic {
  [Keys.updateApp]: typeof Updates.update
}
