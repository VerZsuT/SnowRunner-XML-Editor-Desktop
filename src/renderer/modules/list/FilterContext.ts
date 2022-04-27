import { createContext } from "react";

export interface IListContext {
    filter: string
    toggleFavorite: (name: string) => void
};

export const ListContext = createContext<IListContext>(null);
