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

console.log('[PRE_BUILD][STAGE_1]: Reading config.json...')
const config = JSON.parse(fs.readFileSync(paths.config).toString())
console.log('[PRE_BUILD][STAGE_1]: Success.')
console.log('[PRE_BUILD][STAGE_1]: Reading package.json...')
const package = JSON.parse(fs.readFileSync(paths.package).toString())
console.log('[PRE_BUILD][STAGE_1]: Success.')
console.log('[PRE_BUILD][STAGE_1]: Reading package-lock.json...')
const packageLock = JSON.parse(fs.readFileSync(paths.packageLock).toString())
console.log('[PRE_BUILD][STAGE_1]: Success.')
console.log('[PRE_BUILD][STAGE_1]: Reading public.json...')
const public = JSON.parse(fs.readFileSync(paths.public).toString())
console.log('[PRE_BUILD][STAGE_1]: Success.')

console.log('[PRE_BUILD][LOG]................')

console.log('[PRE_BUILD][STAGE_2]: Setting properties...')
package.version = config.version
packageLock.version = config.version
public.latestVersion = config.version
console.log('[PRE_BUILD][STAGE_2]: Success.')

console.log('[PRE_BUILD][LOG]................')

console.log('[PRE_BUILD][STAGE_3]: Changing package.json...')
fs.writeFileSync(paths.package, JSON.stringify(package))
console.log('[PRE_BUILD][STAGE_3]: Success.')
console.log('[PRE_BUILD][STAGE_3]: Changing package-lock.json...')
fs.writeFileSync(paths.packageLock, JSON.stringify(packageLock))
console.log('[PRE_BUILD][STAGE_3]: Success.')
console.log('[PRE_BUILD][STAGE_3]: Changing public.json...')
fs.writeFileSync(paths.public, JSON.stringify(public))
console.log('[PRE_BUILD][STAGE_3]: Success.')

console.log('[PRE_BUILD][LOG]: Success.')
