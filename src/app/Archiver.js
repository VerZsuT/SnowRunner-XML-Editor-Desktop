import { execSync, exec } from 'child_process';
import { paths } from './service.js';

/**
 * Предоставляет методы для работы с архивами.
 */
class Archiver {
    /**
     * Обновляет файлы в архиве.
     * @param source - путь до папки с файлами.
     * @param direction - путь до архива.
     */
    update(source, direction) {
        execSync(`WinRAR f -ibck -inul "${direction}" "${source}\\" -r -ep1`, {cwd: paths.winrar});
    }

    /**
     * Распаковывает файлы в папку.
     * @param source - путь до ахрива.
     * @param direction - путь до папки.
     */
    unpack(source, direction, fromMod=false) {
        return new Promise(resolve => {
            exec(`WinRAR x -ibck -inul "${source}" @${fromMod?'unpack-mod-list.lst':'unpack-list.lst'} "${direction}\\"`, {cwd: paths.winrar}).once('close', () => {
                resolve(undefined);
            });
        });
    }
}

export default new Archiver();
