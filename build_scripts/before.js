/*
    Скрипт преобработки билда.

    - Очищает выходную папку out.
    - Изменяет package.json, package-lock.json, installer.config.iss.
      - Меняет версию на указанную в config.json.
    - Изменяет public.json(sxmle_updater).
      - Меняет версию на указанную в config.json.
*/

const { rmSync, mkdirSync } = require('fs')

const { allPaths, checkPath, readFile, writeFile } = require('./helpers.js')
const { print, stage } = require('./log.js')

const paths = allPaths.before

let config
let packageFile
let packageLockFile
let publicFile
let issConfig

print('Starting pre-build script', true)

stage(() => {
    print('Cleaning out folder')
    checkPath(paths.out)
    rmSync(paths.out, { recursive: true })
    mkdirSync(paths.out)
})

stage(() => {
    print('Reading config.json')
    config = readFile(paths.config)

    print('Reading package.json')
    packageFile = readFile(paths.package)

    print('Reading package-lock.json')
    packageLockFile = readFile(paths.packageLock)

    print('Reading public.json')
    publicFile = readFile(paths.public)

    print('Reading installer.config.iss')
    issConfig = readFile(paths.issConfig, false)
})

stage(() => {
    print('Changing package version')
    packageFile.version = config.version

    print('Changing packageLock version')
    packageLockFile.version = config.version

    print('Changing public version')
    publicFile.latestVersion = config.version

    print('Changing ISS config file')
    const partBefore = issConfig.split('MyAppVersion ')[1].split('\n')[0]
    issConfig = issConfig.replace(partBefore, `"${config.version}"`)
})

stage(() => {
    print('Writing package.json')
    writeFile(paths.package, JSON.stringify(packageFile, null, '\t'))

    print('Writing package-lock.json')
    writeFile(paths.packageLock, JSON.stringify(packageLockFile, null, '\t'))

    print('Writing public.json')
    writeFile(paths.public, JSON.stringify(publicFile, null, '\t'))

    print('Writing installer.config.iss')
    writeFile(paths.issConfig, issConfig)
})
