import type { IFolder } from './IFolder'

export interface ISetupPreload {
  getGameFolder(): IFolder | undefined

  getInitialPak(): IFolder | undefined
}
