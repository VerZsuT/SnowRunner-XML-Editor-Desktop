/*
    Скрипт преобработки билда.

    - Очищает выходную папку out.
    - Изменяет package.json, package-lock.json.
    -- Меняет версию на указанную в config.json.
    - Изменяет public.json(sxmle_updater).
    -- Меняет версию на указанную в config.json.
*/

const {
    rmSync,
    mkdirSync,
} = require('fs')
const Log = require('./Log.js')
const { preBuildPaths, checkPath, readFileToVar, checkVar, writeFile } = require('./funcs.js')

Log.mainGroup()
Log.print('Запуск скрипта преобработки', true)
Log.stageGroup()

Log.print('Очистка папки out')
checkPath(preBuildPaths.out, () => {
    rmSync(preBuildPaths.out, {recursive: true})
})
mkdirSync(preBuildPaths.out)

Log.separator()

Log.print('Считывание config.json')
readFileToVar('config', preBuildPaths.config)
Log.print('Считывание package.json')
readFileToVar('package', preBuildPaths.package)
Log.print('Считывание package-lock.json')
readFileToVar('packageLock', preBuildPaths.packageLock)
Log.print('Cчитывание public.json')
readFileToVar('public', preBuildPaths.public)

Log.separator()

Log.print('Установка значения в переменную package')
checkVar(global.package, () => package.version = config.version)
Log.print('Установка значения в переменную packageLock')
checkVar(global.packageLock, () => packageLock.version = config.version)
Log.print('Установка значения в переменную public')
checkVar(global.public, () => public.latestVersion = config.version)

Log.separator()

Log.print('Изменение package.json')
writeFile(preBuildPaths.package, global.package, () => JSON.stringify(global.package, null, '\t'))
Log.print('Изменение package-lock.json')
writeFile(preBuildPaths.packageLock, global.packageLock, () => JSON.stringify(global.packageLock, null, '\t'))
Log.print('Изменение public.json')
writeFile(preBuildPaths.public, global.public, () => JSON.stringify(global.public, null, '\t'))

Log.groupEnd()
Log.print('Завершено', true)
