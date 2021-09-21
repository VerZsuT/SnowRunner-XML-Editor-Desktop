const {execSync, exec} = require('child_process');
const { paths } = require('./service');

class Archiver {
    update(source, direction) {
        execSync(`WinRAR f -ibck -inul "${direction}" "${source}\\" -r -ep1`, {cwd: paths.winrar});
    }

    unpack(source, direction) {
        return new Promise(resolve => {
            exec(`WinRAR x -ibck -inul "${source}" @unpack-list.lst "${direction}\\"`, {cwd: paths.winrar}).once('close', () => {
                resolve();
            });
        });
    }
}

module.exports = new Archiver();
