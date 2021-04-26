const fs = require('fs')
const { join } = require('path')

const paths = {
    out: join(__dirname, 'out'),
    config: join(__dirname, 'src', 'config.json'),
    package: join(__dirname, 'package.json'),
    packageLock: join(__dirname, 'package-lock.json'),
    public: join(__dirname, 'docs', 'public.json')
}

fs.rmdirSync(paths.out, {recursive: true})
fs.mkdirSync(paths.out)

console.log('[PRE_BUILD][LOG]: Processing pre build...')

console.log('[PRE_BUILD][STAGE_1]: Reading files...')
const config = JSON.parse(fs.readFileSync(paths.config).toString())
console.log('[PRE_BUILD][STAGE_1]: config.json readed.')
const package = JSON.parse(fs.readFileSync(paths.package).toString())
console.log('[PRE_BUILD][STAGE_1]: package.json readed.')
const packageLock = JSON.parse(fs.readFileSync(paths.packageLock).toString())
console.log('[PRE_BUILD][STAGE_1]: package-lock.json readed.')
const public = JSON.parse(fs.readFileSync(paths.public).toString())
console.log('[PRE_BUILD][STAGE_1]: public.json readed.')

console.log('[PRE_BUILD][STAGE_2]: Setting properties...')
package.version = config.version
packageLock.version = config.version
public.latestVersion = config.version
console.log('[PRE_BUILD][STAGE_2]: Properties setted.')

console.log('[PRE_BUILD][STAGE_3]: Changing files...')
fs.writeFileSync(paths.package, JSON.stringify(package))
console.log('[PRE_BUILD][STAGE_3]: package.json changed.')
fs.writeFileSync(paths.packageLock, JSON.stringify(packageLock))
console.log('[PRE_BUILD][STAGE_3]: package-lock.json changed.')
fs.writeFileSync(paths.public, JSON.stringify(public))
console.log('[PRE_BUILD][STAGE_3]: public.json changed.')

console.log('[PRE_BUILD][LOG]: Success.')
