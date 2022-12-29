import type IFolder from './IFolder'

interface ISetupPreload {
  getGameFolder(): IFolder | undefined
  getInitialPak(): IFolder | undefined
}

export default ISetupPreload
