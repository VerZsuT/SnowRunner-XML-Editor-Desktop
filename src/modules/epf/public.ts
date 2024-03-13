import type EPF from './main'

export enum PubKeys {
  join = 'epf/join',
  see = 'epf/see',
}

export type PubType = {
  [PubKeys.join]: typeof EPF.join
  [PubKeys.see]: typeof EPF.see
}
