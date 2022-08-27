import type {Category, SrcType} from 'enums'

import type {Item} from './Item'

export interface ListPreload {
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
    getList(listType: Category, from?: SrcType): Item[];
}
