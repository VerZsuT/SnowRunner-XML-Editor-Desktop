import type IFindItem from "./IFindItem";

interface IItem {
    dlcName?: string
    modId?: string
    id?: string
    name?: string
    path?: string
    items?: IFindItem[]
}

export default IItem;
