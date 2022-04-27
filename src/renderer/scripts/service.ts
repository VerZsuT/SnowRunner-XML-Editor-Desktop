import { contextBridge } from "electron";
import { join, basename } from "path";
import { existsSync, readFileSync, writeFileSync, readdirSync, lstatSync } from "fs";
import type IService from "./types/IService";

const service: IService = {
    join,
    basename,
    existsSync,
    readFileSync: path => readFileSync(path).toString(),
    writeFileSync,
    isDirectory: (path: string) => lstatSync(path).isDirectory(),
    readdirSync
};

contextBridge.exposeInMainWorld("service", service);
global["service"] = service;

export default service;
