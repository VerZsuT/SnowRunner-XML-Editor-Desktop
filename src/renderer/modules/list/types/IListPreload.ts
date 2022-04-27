import type ListType from "../enums/ListType";
import type SrcType from "../enums/SrcType";
import type IItem from "./IItem";

interface IListPreload {
    removeDir(path: string): void
    getModPak(): {
        id: string
        path: string
        name: string
    }
    findMods(): Promise<{
        name: string
        path: string
    }[]>
    getList(listType: ListType, from?: SrcType): IItem[]
}

export default IListPreload;
