import type { WatchEventType } from 'node:fs'

import type { MainEvent } from 'emr-bridge'

import type { Dir, FSEntry, File } from './main'

export enum PubKeys {
  exists = 'fsentry/exists',
  canRead = 'fsentry/can-read',
  canWrite = 'fsentry/can-write',
  basename = 'fsentry/basename',
  dirname = 'fsentry/dirname',
  isDir = 'fsentry/is-dir',
  isFile = 'fsentry/is-file',
  remove = 'fsentry/remove',
  move = 'fsentry/move',
  rename = 'fsentry/rename',
  readDir = 'dir/read',
  makeDir = 'dir/make',
  getFileSize = 'file/get-size',
  makeFile = 'file/make',
  extname = 'file/extname',
  readFile = 'file/read',
  writeFile = 'file/write',
  copyFileTo = 'file/copy-to',
  watchFile = 'file/watch',
  exec = 'file/exec',
  changeFileEvent = '-file/change-event',
  onChangeFile = `on${PubKeys.changeFileEvent}`
}

export type PubType = {
  [PubKeys.exists](path: string): ReturnType<FSEntry['exists']>
  [PubKeys.canRead](path: string): ReturnType<FSEntry['canWrite']>
  [PubKeys.canWrite](path: string): ReturnType<FSEntry['canWrite']>
  [PubKeys.basename](path: string, extname?: string): ReturnType<FSEntry['basename']>
  [PubKeys.dirname](path: string): FSEntry['dirname']
  [PubKeys.isDir](path: string): ReturnType<FSEntry['isDir']>
  [PubKeys.isFile](path: string): ReturnType<FSEntry['isFile']>
  [PubKeys.makeFile](path: string): ReturnType<File['make']>
  [PubKeys.makeDir](path: string): ReturnType<Dir['make']>
  [PubKeys.remove](path: string): ReturnType<FSEntry['remove']>
  [PubKeys.move](from: string, to: string): ReturnType<FSEntry['move']>
  [PubKeys.rename](from: string, to: string): ReturnType<FSEntry['rename']>
  [PubKeys.readDir](path: string): Promise<string[]>
  [PubKeys.extname](path: string): File['extname']
  [PubKeys.getFileSize](path: string): ReturnType<File['getSize']>
  [PubKeys.readFile](path: string, encoding?: BufferEncoding): ReturnType<File['read']>
  [PubKeys.writeFile](path: string, data: string, encoding?: BufferEncoding): ReturnType<File['write']>
  [PubKeys.copyFileTo](from: string, to: string): ReturnType<File['copyTo']>
  [PubKeys.watchFile](path: string): number
  [PubKeys.exec](path: string): Promise<void>
  [PubKeys.onChangeFile]: MainEvent<{ event: WatchEventType, id: number }>
}
