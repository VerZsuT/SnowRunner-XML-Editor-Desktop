import { contextBridge } from "electron";
import { existsSync, readdirSync, watchFile } from "fs";
import { join } from "path";
import type IEditorPreload from "./types/IEditorPreload";
import "scripts/mainPreload";
import main from "scripts/main";
const { paths } = main

const editorPreload: IEditorPreload = {
    findFromDLC: (fileName: string, type: string) => {
        for (const dlcFolder of readdirSync(paths.dlc)) {
            const path = join(paths.dlc, dlcFolder, "classes", type, `${fileName}.xml`);
            if (existsSync(path))
                return path;
        }
    },
    watchFile: (path: string, callback: ()=>void) => watchFile(path, { persistent: false }, callback)
};

contextBridge.exposeInMainWorld("editorPreload", editorPreload);
