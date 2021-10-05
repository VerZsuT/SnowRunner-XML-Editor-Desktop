const {
    rmSync,
    mkdirSync,
    readFileSync,
    existsSync,
    writeFileSync
} = require('fs');
const {join} = require('path');

const paths = {
    out: join(__dirname, 'out'),
    config: join(__dirname, 'src', 'app', 'config.json'),
    package: join(__dirname, 'package.json'),
    packageLock: join(__dirname, 'package-lock.json'),
    public: join(__dirname, '..', 'sxmle_updater', 'public.json')
};

rmSync(paths.out, {recursive: true});
mkdirSync(paths.out);

console.log('[PRE_BUILD][LOG]: Processing pre build...');

console.log('[PRE_BUILD][STAGE_1]: Reading config.json...');
const config = JSON.parse(readFileSync(paths.config).toString());
console.log('[PRE_BUILD][STAGE_1]: Success.');
console.log('[PRE_BUILD][STAGE_1]: Reading package.json...');
const package = JSON.parse(readFileSync(paths.package).toString());
console.log('[PRE_BUILD][STAGE_1]: Success.');
console.log('[PRE_BUILD][STAGE_1]: Reading package-lock.json...');
const packageLock = JSON.parse(readFileSync(paths.packageLock).toString());
console.log('[PRE_BUILD][STAGE_1]: Success.');
console.log('[PRE_BUILD][STAGE_1]: Reading public.json...');
let public = {
    latestVersion: '',
    canAutoUpdate: true
};
if (existsSync(paths.public)) {
    public = JSON.parse(readFileSync(paths.public).toString());
}
console.log('[PRE_BUILD][STAGE_1]: Success.');

console.log('[PRE_BUILD][LOG]................');

console.log('[PRE_BUILD][STAGE_2]: Setting properties...');
package.version = config.version;
packageLock.version = config.version;
public.latestVersion = config.version;
console.log('[PRE_BUILD][STAGE_2]: Success.');

console.log('[PRE_BUILD][LOG]................');

console.log('[PRE_BUILD][STAGE_3]: Changing package.json...');
writeFileSync(paths.package, JSON.stringify(package, null, '\t'));
console.log('[PRE_BUILD][STAGE_3]: Success.');
console.log('[PRE_BUILD][STAGE_3]: Changing package-lock.json...');
writeFileSync(paths.packageLock, JSON.stringify(packageLock));
console.log('[PRE_BUILD][STAGE_3]: Success.');
console.log('[PRE_BUILD][STAGE_3]: Changing public.json...');
writeFileSync(paths.public, JSON.stringify(public, null, '\t'));
console.log('[PRE_BUILD][STAGE_3]: Success.');
console.log('[PRE_BUILD][LOG]: Success.');
