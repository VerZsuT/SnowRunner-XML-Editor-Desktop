
import { existsSync, readdirSync, watchFile as watch } from "fs";
import { join } from "path";

import "scripts/rootPreload";
import main from "scripts/main";
import type IEditorPreload from "types/IEditorPreload";

const { paths } = main;

function findFromDLC(fileName: string, type: string) {
    for (const dlcFolder of readdirSync(paths.dlc)) {
        const path = join(paths.dlc, dlcFolder, "classes", type, `${fileName}.xml`);
        if (existsSync(path))
            return path;
    }
}

function watchFile(path: string, callback: ()=>void) {
    return watch(path, { persistent: false }, callback);
}

window["editorPreload"] = <IEditorPreload> {
    findFromDLC,
    watchFile
};
