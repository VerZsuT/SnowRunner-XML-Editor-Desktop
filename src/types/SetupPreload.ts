import type {Folder} from './Folder'

export interface SetupPreload {
    getGameFolder(): Folder
    getInitialPak(): Folder
}
