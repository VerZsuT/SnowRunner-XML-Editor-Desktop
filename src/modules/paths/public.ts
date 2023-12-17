import type { IPaths } from './types'

export enum Keys {
  object = 'paths.object'
}

export interface IPublic {
  [Keys.object]: IPaths
}
