import { createContext } from "react";

import type { Cheerio, CheerioAPI } from "cheerio";
import type FileType from "enums/FileType";
import type IIEParam from "types/IIEParam";
import type ITemplateParams from "types/ITemplateParams";

export interface IMainContext {
    addToSave(mod: string, dlc: string, dom: CheerioAPI, path: string, fileType: FileType): void;
    fileDOM: CheerioAPI;
    filePath: string;
    addParam(param: IIEParam): void;
    removeParam(id: string): void;
    currentDLC: string;
    currentMod: string;
    templates: Cheerio<"_templates">;
    globalTemplates: CheerioAPI;
    tableItems: ITemplateParams;
    defaults: {
        [selector: string]: {
            [attr: string]: string | number;
        };
    };
}

export default createContext<IMainContext>(null);
