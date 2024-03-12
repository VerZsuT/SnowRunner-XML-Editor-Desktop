import type Updates from './main'

export enum PubKeys {
  updateApp = 'updates/update-app'
}

export type PubType = {
  [PubKeys.updateApp]: typeof Updates.update
}
