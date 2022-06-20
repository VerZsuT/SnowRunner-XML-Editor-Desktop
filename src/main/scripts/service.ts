import { existsSync, lstatSync, mkdirSync, readdirSync, rmSync } from "fs";
import { join } from "path";

import type IFindItem from "types/IFindItem";

import paths from "./paths";

/**
 * Найти в папке все соответствия
 * @param startPath - путь, с которого начинается поиск
 * @param onlyDirs - искать только папки, игнорируя файлы
 * @param ext - расширение, по которому ведётся поиск файлов
 * @param recursive - рекурсивный поиск
 * @returns массив путей
 */
export function findInDir(startPath: string, onlyDirs?: boolean, ext = ".xml", recursive?: boolean): IFindItem[] {
    let array: IFindItem[] = [];

    if (!existsSync(startPath))
        return [];

    const files = readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filePath = join(startPath, files[i]);
        const stat = lstatSync(filePath);

        if (onlyDirs) {
            if (!stat.isDirectory())
                continue;

            array.push({
                name: files[i],
                path: filePath
            });
        }
    
        if (stat.isDirectory() && recursive) {
            array = [...array, ...findInDir(filePath, false, ext, true)];
        }
        else if (files[i].indexOf(ext) >= 0) {
            array.push({
                name: files[i].replace(ext, ""),
                path: filePath
            });
        }
    }
    return array;
}

/** Очистить папку для временных файлов программы */
export function clearTemp() {
    rmSync(paths.backupInitial, { force: true });
    rmSync(paths.mainTemp, { recursive: true, force: true });
    rmSync(paths.modsTemp, { recursive: true, force: true });
    mkdirSync(paths.mainTemp);
    mkdirSync(paths.modsTemp);
}

export class Stack<T> {
    private readonly storage: T[] = [];
    private readonly capacity: number;
  
    constructor(capacity = Infinity) {
        this.capacity = capacity;
    }
  
    push(item: T): void {
        if (this.size() === this.capacity) 
            throw Error("Stack has reached max capacity, you cannot add more items");
      
        this.storage.push(item);
    }
  
    pop(): T | undefined {
        return this.storage.pop();
    }
  
    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }
  
    size(): number {
        return this.storage.length;
    }
}
