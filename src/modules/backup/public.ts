import type Backup from './main'

export enum PubKeys {
  save = 'backup/save',
  recoverFromIt = 'backup/recover-from-it'
}

export type PubType = {
  [PubKeys.save]: typeof Backup.save
  [PubKeys.recoverFromIt]: typeof Backup.recoverFromIt
}
