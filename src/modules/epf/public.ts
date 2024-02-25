import type EPF from './main'

export enum Keys {
  join = 'epf.join',
  see = 'epf.see',
}

export interface IPublic {
  [Keys.join]: typeof EPF.join
  [Keys.see]: typeof EPF.see
}
