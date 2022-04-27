import { execFileSync, execFile } from "child_process";
import { existsSync, mkdirSync, rmSync } from "fs";
import { join, basename } from "path";

import { paths } from "../service";
import { settings } from "./Settings";
import { config } from "./Config";
import hasher from "./Hasher";
import texts from "./Texts";
import windows from "./Windows";
import { linkWithRenderAs } from "../renderChannel";
import HasLinked from "../types/HasLinked";

/** Предоставляет методы для работы с архивами. */
class Archiver extends HasLinked {
    private mainUnpackList = "@unpack-list.lst";
    private modsUnpackList = "@unpack-mod-list.lst";

    private get flags() { return settings.showWinRAR? [] : ["-ibck", "-inul"] }

    /**
     * Обновить файлы в архиве.
     * @param source - путь до папки с файлами.
     * @param direction - путь до архива.
     */
    public update(source: string, direction: string, isMod?: boolean) {
        this.WinRAR(["f", ...this.flags, direction, source+"\\", "-r", "-ep1"]);
        this.saveHash(direction, isMod);
    }

    /**
     * Распаковать файлы из архива в папку.
     * @param source - путь до ахрива.
     * @param direction - путь до папки.
     */
    public async unpack(source: string, direction: string, fromMod?: boolean, isAsync=true) {
        const list = fromMod ? this.modsUnpackList : this.mainUnpackList;

        this.rmDir(direction);
        await this.WinRAR(["x", ...this.flags, source, list, direction+"\\"], isAsync);
    }

    /**
     * Синхронная версия `unpack`.
     * 
     * Распаковать файлы из архива в папку.
     * @param source - путь до ахрива.
     * @param direction - путь до папки.
     */
    @linkWithRenderAs("unpack")
    public unpackSync(source: string, direction: string, fromMod?: boolean) {
        try {
            this.unpack(source, direction, fromMod, false);
        }
        catch {}
    }

    /** Распаковать основные XML файлы (+DLC) из `initial.pak`. */
    @linkWithRenderAs("unpackFiles")
    public async unpackMain() {
        windows.loading.show();
        windows.loading.setText(texts.get("UNPACKING"));

        this.clearDir(paths.mainTemp);
        this.rmFile(paths.texts);

        await this.unpack(config.initial, paths.mainTemp);
        this.saveHash(config.initial);
        windows.loading.hide();
    }

    /**
     * Распаковать XML файлы модификации из архива.
     * @param pathToFile путь к архиву модификации.
     */
    public async unpackMod(pathToFile: string) {
        const modId = basename(pathToFile, ".pak");
        const pathToDir = join(paths.modsTemp, modId);

        this.mkDir(paths.modsTemp);
        this.clearDir(pathToDir);
        this.saveHash(pathToFile, true);
        await this.unpack(pathToFile, pathToDir, true);
    }

    /**
     * Сохранить размер файлов для фиксации изменений извне.
     * 
     * `getSize` использовать более производительно чем вычислять хэш.
     * @param path путь к файлу.
     */
    private saveHash(path: string, isMod?: boolean) {
        const fileName = basename(path, ".pak");

        if (!isMod)
            config.sizes.initial = hasher.getSize(path);
        else
            config.sizes.mods[fileName] = hasher.getSize(path);
    }

    /**
     * Удалить папку с её содержимым.
     * @param path путь к папке.
     */
    private rmDir(path: string) {
        rmSync(path, { recursive: true, force: true });
    }

    /**
     * Удалить файл.
     * @param path путь к файлу.
     */
    private rmFile(path: string) {
        rmSync(path, { force: true });
    }

    /**
     * Создать папку (при её отсутствии).
     * @param path путь создания.
     */
    private mkDir(path: string) {
        if (!existsSync(path))
            mkdirSync(path);
    }

    /**
     * Очистить содержимое папки (удаляет её и создаёт вновь).
     * @param path путь к папке.
     */
    private clearDir(path: string) {
        this.rmDir(path);
        this.mkDir(path);
    }

    /**
     * Запустить WinRAR.
     * @param attributes параметры вызова.
     * @param async зпустить процесс асинхронно.
     */
    private WinRAR(attributes: string[], async?: boolean): Promise<void> | undefined {
        if (async) {
            return new Promise<void>(resolve => {
                execFile("WinRAR.exe", attributes, { cwd: paths.winrar_x32 }).once("close", resolve);
            });
        }
        execFileSync("WinRAR.exe", attributes, { cwd: paths.winrar_x32 });
    }
}

export default new Archiver();
