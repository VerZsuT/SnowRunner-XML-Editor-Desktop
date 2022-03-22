import { execFileSync, execFile } from 'child_process'
import { existsSync, mkdirSync, rmSync } from 'fs'
import { join, basename } from 'path'

import { paths } from '../service'
import Settings from './Settings'
import Config from './Config'
import Hasher from './Hasher'
import Texts from './Texts'
import Windows from './Windows'

/** Предоставляет методы для работы с архивами. */
export default class Archiver {
    // MARK: сообщения WinRAR
    private static config = Config.obj
    private static get prodFlags() {return Settings.obj.showWinRAR? [] : ['-ibck', '-inul']}
    private static mainUnpackList = '@unpack-list.lst'
    private static modsUnpackList = '@unpack-mod-list.lst'

    /**
     * Обновить файлы в архиве.
     * @param source - путь до папки с файлами.
     * @param direction - путь до архива.
     */
    public static update = (source: string, direction: string) => {
        this.WinRAR(['f', ...this.prodFlags, direction, source+'\\', '-r', '-ep1'])
        this.saveHash(direction, basename(direction) === 'initial.pak')
    }

    /**
     * Распаковать файлы из архива в папку.
     * @param source - путь до ахрива.
     * @param direction - путь до папки.
     */
    public static unpack = async (source: string, direction: string, fromMod?: boolean) => {
        const list = fromMod ? this.modsUnpackList : this.mainUnpackList

        this.rmDir(direction)
        await this.WinRAR(['x', ...this.prodFlags, source, list, direction+'\\'], true)
    }

    /**
     * Синхронная версия `unpack`.
     * 
     * Распаковать файлы из архива в папку.
     * @param source - путь до ахрива.
     * @param direction - путь до папки.
     */
    public static unpackSync = (source: string, direction: string, fromMod?: boolean) => {
        const list = fromMod ? this.modsUnpackList : this.mainUnpackList

        this.rmDir(direction)
        try {
            this.WinRAR(['x', ...this.prodFlags, source, list, direction+'\\'])
        } catch {}
    }

    /** Распаковать основные XML файлы (+DLC) из `initial.pak`. */
    public static unpackMain = async () => {
        Windows.loading.show()
        Windows.loading.setText(Texts.get('UNPACKING'))

        this.clearDir(paths.mainTemp)
        this.rmFile(paths.texts)

        await this.unpack(this.config.initial, paths.mainTemp)
        this.saveHash(this.config.initial)
        Windows.loading.hide()
    }

    /**
     * Распаковать XML файлы модификации из архива.
     * @param pathToFile путь к архиву модификации.
     */
    public static unpackMod = async (pathToFile: string) => {
        const modId = basename(pathToFile, '.pak')
        const pathToDir = join(paths.modsTemp, modId)

        this.mkDir(paths.modsTemp)
        this.clearDir(pathToDir)
        this.saveHash(pathToFile, true)
        await this.unpack(pathToFile, pathToDir, true)
    }

    /**
     * Сохранить размер файлов для фиксации изменений извне.
     * 
     * `getSize` использовать более производительно чем вычислять хэш.
     * @param path путь к файлу.
     */
    private static saveHash(path: string, isMod?: boolean) {
        const fileName = basename(path, '.pak')

        if (!isMod)
            this.config.sizes.initial = Hasher.getSize(path)
        else
            this.config.sizes.mods[fileName] = Hasher.getSize(path)
    }

    /**
     * Удалить папку с её содержимым.
     * @param path путь к папке.
     */
    private static rmDir(path: string) {
        rmSync(path, { recursive: true, force: true })
    }

    /**
     * Удалить файл.
     * @param path путь к файлу.
     */
    private static rmFile(path: string) {
        rmSync(path, { force: true })
    }

    /**
     * Создать папку (при её отсутствии).
     * @param path путь создания.
     */
    private static mkDir(path: string) {
        if (!existsSync(path))
            mkdirSync(path)
    }

    /**
     * Очистить содержимое папки (удаляет её и создаёт вновь).
     * @param path путь к папке.
     */
    private static clearDir(path: string) {
        this.rmDir(path)
        this.mkDir(path)
    }

    /**
     * Запустить WinRAR.
     * @param attributes параметры вызова.
     * @param async зпустить процесс асинхронно.
     */
    private static WinRAR(attributes: string[], async?: boolean) {
        if (async) {
            return new Promise<void>(resolve =>
                execFile('WinRAR.exe', attributes, { cwd: paths.winrar_x32 }).once('close', resolve)
            )
        }
        execFileSync('WinRAR.exe', attributes, { cwd: paths.winrar_x32 })
    }
}
