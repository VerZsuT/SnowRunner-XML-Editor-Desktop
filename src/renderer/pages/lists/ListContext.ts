import { createContext } from "react";

export interface IListContext {
    filter: string;
    toggleFavorite: (name: string) => void;
}

export default createContext<IListContext>(null);
