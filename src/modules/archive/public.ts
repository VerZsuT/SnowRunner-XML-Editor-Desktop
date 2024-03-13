import type Archive from './main'

export enum PubKeys {
  unpack = 'archive/unpack',
  unpackMain = 'archive/unpack-main',
  updateFiles = 'archive/update-files'
}

export type PubType = {
  [PubKeys.unpack](archivePath: string, dirPath: string): ReturnType<typeof Archive.unpack>
  [PubKeys.unpackMain]: typeof Archive.unpackMain
  [PubKeys.updateFiles](modName?: string): Promise<void> | void
}
