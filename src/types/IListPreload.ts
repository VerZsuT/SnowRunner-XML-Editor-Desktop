import type Category from "enums/Category";
import type SrcType from "enums/SrcType";

import type IItem from "./IItem";

interface IListPreload {
    removeDir(path: string): void;
    getModPak(): {
        id: string;
        path: string;
        name: string;
    };
    findMods(): Promise<{
        name: string;
        path: string;
    }[]>;
    getList(listType: Category, from?: SrcType): IItem[];
}

export default IListPreload;
