import type { homedir, userInfo } from 'node:os'
import type { join } from 'node:path'

import type Helpers from './main'

export enum PubKeys {
  findInDir = 'helpers/find-in-dir',
  join = 'helpers/join',
  homedir = 'helpers/homedir',
  userInfo = 'helpers/user-info',
  openLink = 'helpers/open-link',
  openFile = 'helpers/open-file',
  openPath = 'helpers/open-path',
  reloadApp = 'helpers/reload-app',
  quitApp = 'helpers/quit-app',
  devtools = 'helpers/dev-tools'
}

export type PubType = {
  [PubKeys.findInDir]: typeof Helpers.findInDir
  [PubKeys.join]: typeof join
  [PubKeys.homedir]: typeof homedir
  [PubKeys.userInfo]: typeof userInfo
  [PubKeys.openLink](url: string): Promise<void>
  [PubKeys.openFile](path: string): Promise<void>
  [PubKeys.openPath](path: string): Promise<string>
  [PubKeys.reloadApp](): void
  [PubKeys.quitApp](): void
  [PubKeys.devtools](): void
}
