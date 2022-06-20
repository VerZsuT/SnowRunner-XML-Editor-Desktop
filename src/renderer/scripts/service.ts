import { existsSync, readFileSync, writeFileSync, readdirSync, lstatSync } from "fs";
import { join, basename } from "path";

import type IService from "types/IService";

const service: IService = {
    readFileSync: (path: string) => readFileSync(path).toString(),
    isDirectory: (path: string) => lstatSync(path).isDirectory(),
    writeFileSync,
    readdirSync,
    existsSync,
    basename,
    join
};

if (global)
    global.service = service;

if (window)
    window.service = service;

export default service;
