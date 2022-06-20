import type IFolder from "types/IFolder";

interface ISetupPreload {
    getGameFolder(): IFolder;
    getInitial(): IFolder;
}

export default ISetupPreload;
