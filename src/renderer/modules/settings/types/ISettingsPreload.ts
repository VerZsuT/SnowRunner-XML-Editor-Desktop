import type IFolder from './IFolder'

interface ISettingsPreload {
    getGameFolder(): IFolder
    getInitial(): IFolder
}

export default ISettingsPreload
