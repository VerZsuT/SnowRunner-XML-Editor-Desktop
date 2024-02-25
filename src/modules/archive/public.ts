import type Archive from './main'

export enum Keys {
  unpack = 'archive.unpack',
  unpackMain = 'archive.unpack-main',
  updateFiles = 'archive.update-files'
}

export interface IPublic {
  [Keys.unpack](archivePath: string, dirPath: string): ReturnType<typeof Archive.unpack>
  [Keys.unpackMain]: typeof Archive.unpackMain
  [Keys.updateFiles](modName?: string): Promise<void> | void
}
