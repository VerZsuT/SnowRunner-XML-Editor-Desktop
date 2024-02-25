import type Backup from './main'

export enum Keys {
  save = 'backup.save',
  recoverFromIt = 'backup.recover-from-it'
}

export interface IPublic {
  [Keys.save]: typeof Backup.save
  [Keys.recoverFromIt]: typeof Backup.recoverFromIt
}
