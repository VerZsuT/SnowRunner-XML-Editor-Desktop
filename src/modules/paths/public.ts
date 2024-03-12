import type { IPaths } from './types'

export enum PubKeys {
  object = 'paths/object'
}

export type PubType = {
  [PubKeys.object]: IPaths
}
