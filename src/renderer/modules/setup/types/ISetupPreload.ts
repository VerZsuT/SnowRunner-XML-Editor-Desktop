import type IFolder from "modules/settings/types/IFolder";

interface ISetupPreload {
    getGameFolder(): IFolder
    getInitial(): IFolder
}

export default ISetupPreload;
