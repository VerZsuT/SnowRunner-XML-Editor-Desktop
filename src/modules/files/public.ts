import type { WatchEventType } from 'node:fs'

import type { MainEvent } from 'emr-bridge'

import type { Dir, FSEntry, File } from './main'

export enum Keys {
  exists = 'fsentry.exists',
  canRead = 'fsentry.can-read',
  canWrite = 'fsentry.can-write',
  basename = 'fsentry.basename',
  dirname = 'fsentry.dirname',
  isDir = 'fsentry.is-dir',
  isFile = 'fsentry.is-file',
  remove = 'fsentry.remove',
  move = 'fsentry.move',
  rename = 'fsentry.rename',
  readDir = 'dir.read',
  makeDir = 'dir.make',
  getFileSize = 'file.get-size',
  makeFile = 'file.make',
  extname = 'file.extname',
  readFile = 'file.read',
  writeFile = 'file.write',
  copyFileTo = 'file.copy-to',
  watchFile = 'file.watch',
  exec = 'file.exec',
  onChangeFile = 'onFile.change-event',
  changeFileEvent = 'file.change-event'
}

export interface IPublic {
  [Keys.exists](path: string): ReturnType<FSEntry['exists']>
  [Keys.canRead](path: string): ReturnType<FSEntry['canWrite']>
  [Keys.canWrite](path: string): ReturnType<FSEntry['canWrite']>
  [Keys.basename](path: string, extname?: string): ReturnType<FSEntry['basename']>
  [Keys.dirname](path: string): FSEntry['dirname']
  [Keys.isDir](path: string): ReturnType<FSEntry['isDir']>
  [Keys.isFile](path: string): ReturnType<FSEntry['isFile']>
  [Keys.makeFile](path: string): ReturnType<File['make']>
  [Keys.makeDir](path: string): ReturnType<Dir['make']>
  [Keys.remove](path: string): ReturnType<FSEntry['remove']>
  [Keys.move](from: string, to: string): ReturnType<FSEntry['move']>
  [Keys.rename](from: string, to: string): ReturnType<FSEntry['rename']>
  [Keys.readDir](path: string): Promise<string[]>
  [Keys.extname](path: string): File['extname']
  [Keys.getFileSize](path: string): ReturnType<File['getSize']>
  [Keys.readFile](path: string, encoding?: BufferEncoding): ReturnType<File['read']>
  [Keys.writeFile](path: string, data: string, encoding?: BufferEncoding): ReturnType<File['write']>
  [Keys.copyFileTo](from: string, to: string): ReturnType<File['copyTo']>
  [Keys.watchFile](path: string): number
  [Keys.exec](path: string): Promise<void>
  [Keys.onChangeFile]: MainEvent<{ event: WatchEventType, id: number }>
}
