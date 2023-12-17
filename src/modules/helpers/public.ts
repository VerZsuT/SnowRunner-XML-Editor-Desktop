import type { homedir, userInfo } from 'node:os'
import type { join } from 'node:path'

import type Helpers from './main'

export enum Keys {
  findInDir = 'helpers.find-in-dir',
  join = 'helpers.join',
  homedir = 'helpers.homedir',
  userInfo = 'helpers.user-info',
  openLink = 'helpers.open-link',
  openPath = 'helpers.open-path',
  reloadApp = 'helpers.reload-app',
  quitApp = 'helpers.quit-app',
  devtools = 'helpers.dev-tools'
}

export interface IPublic {
  [Keys.findInDir]: typeof Helpers.findInDir
  [Keys.join]: typeof join
  [Keys.homedir]: typeof homedir
  [Keys.userInfo]: typeof userInfo
  [Keys.openLink](url: string): Promise<void>
  [Keys.openPath](path: string): Promise<string>
  [Keys.reloadApp](): void
  [Keys.quitApp](): void
  [Keys.devtools](): void
}
