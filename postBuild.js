const {execSync} = require('child_process');
const {createHash} = require('crypto');
const {join} = require('path');
const {
    renameSync,
    readdirSync,
    statSync,
    readFileSync,
    writeFileSync,
    existsSync,
    rmSync
} = require('fs');

const paths = {
    out: join(__dirname, 'out'),
    original: join(__dirname, 'out', 'SnowRunner XML Editor-win32-ia32'),
    renamed: join(__dirname, 'out', 'SnowRunnerXMLEditor'),
    config: join(__dirname, 'out', 'SnowRunnerXMLEditor', 'resources', 'app', 'src', 'app', 'config.json'),
    winrar: join(__dirname, 'src', 'scripts', 'winrar'),
    sxmle_updater: join(__dirname, '..', 'sxmle_updater'),
    vue: join(__dirname, 'out', 'SnowRunnerXMLEditor', 'resources', 'app', 'src', 'scripts', 'vue')
};

console.log('[POST_BUILD][LOG]: Processing post build...');

console.log('[POST_BUILD][STAGE_1]: Renaming build...');
renameSync(paths.original, paths.renamed);
console.log('[POST_BUILD][STAGE_1]: Success.');
console.log('[POST_BUILD][LOG]................');

const config = JSON.parse(readFileSync(paths.config));
config.lang = 'EN';
config.buildType = 'prod';
config.settings.resetButton = false;
writeFileSync(paths.config, JSON.stringify(config));
rmSync(join(paths.vue, 'vue.esm-browser.js'));
renameSync(join(paths.vue, 'vue.esm-browser.prod.js'), join(paths.vue, 'vue.esm-browser.js'));

console.log('[POST_BUILD][STAGE_2]: Archiving build...');
execSync(`WinRAR a -ibck -ep1 -m5 "${join(paths.out, 'SnowRunnerXMLEditor.rar')}" "${paths.renamed}"`, {cwd: paths.winrar});
console.log('[POST_BUILD][STAGE_2]: Success.');
console.log('[POST_BUILD][LOG]................');

if (existsSync(paths.sxmle_updater)) {
    console.log('[POST_BUILD][STAGE_3]: Generating files map for auto update...');
    writeFileSync(join(paths.sxmle_updater, 'updateMap.json'), JSON.stringify(generateMap(join(paths.renamed, 'resources', 'app'))));
    console.log('[POST_BUILD][STAGE_3]: Success.');

    console.log('[POST_BUILD][STAGE_3]: Adding files for auto update...');
    rmSync(join(paths.sxmle_updater, 'files'), {recursive: true});
    renameSync(join(paths.renamed, 'resources', 'app'), join(paths.sxmle_updater, 'files'));
    rmSync(join(paths.renamed), {recursive: true});
    console.log('[POST_BUILD][STAGE_3]: Success.');
}

console.log('[POST_BUILD][LOG]: Success.');

function generateMap(rootPath) {
    let map = {};
    const items = readdirSync(rootPath);
    for (const item of items) {
        const path = join(rootPath, item);
        const stats = statSync(path);

        if (!stats.isFile()) {
            map = Object.assign(map, generateMap(path));
        } else {
            const shaHash = createHash('sha1');
            shaHash.update(readFileSync(path));
            map[path.replace(join(paths.renamed, 'resources', 'app', '/'), '')] = shaHash.digest('hex');
        }
    }
    return map;
}
