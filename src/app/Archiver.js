const {execSync, exec} = require('child_process');
const { paths } = require('./service.js');

/**
 * Предоставляет методы для работы с архивами.
 */
class Archiver {
    /**
     * Обновляет файлы в архиве.
     * @param {string} source - путь до папки с файлами.
     * @param {string} direction - путь до архива.
     */
    update(source, direction) {
        execSync(`WinRAR f -ibck -inul "${direction}" "${source}\\" -r -ep1`, {cwd: paths.winrar});
    }

    /**
     * Распаковывает файлы в папку.
     * @param {string} source - путь до ахрива.
     * @param {string} direction - путь до папки.
     */
    unpack(source, direction, fromMod=false) {
        return new Promise(resolve => {
            exec(`WinRAR x -ibck -inul "${source}" @${fromMod?'unpack-mod-list.lst':'unpack-list.lst'} "${direction}\\"`, {cwd: paths.winrar}).once('close', () => {
                resolve();
            });
        });
    }
}

module.exports = new Archiver();
