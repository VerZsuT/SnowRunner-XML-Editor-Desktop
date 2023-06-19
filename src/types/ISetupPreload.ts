import type IFolder from './IFolder'

export default interface ISetupPreload {
  getGameFolder(): IFolder | undefined
  getInitialPak(): IFolder | undefined
}
