/*
    Стрипт постобработки билда.
    
    - Переименовывает билд.
    - Устанавливает тип билда на prod в config.json готового билда.
    - Создаёт карту обновления и копирует файлы для него (sxmle_updater).
    - Архивирует билд с помощью WinRAR.
*/

const { execSync } = require('child_process')
const { join } = require('path')
const {
    renameSync,
    rmSync
} = require('fs')
const Log = require('./Log.js')
const { checkPath, readFileToVar, checkVar, writeFile, generateMap, postBuildPaths } = require('./funcs.js')

Log.mainGroup()
Log.print('Запуск срипта постобработки', true)
Log.stageGroup()

Log.print('Переименование билда')
checkPath(postBuildPaths.original, () => {
    renameSync(postBuildPaths.original, postBuildPaths.renamed)
}, true)

Log.separator()

Log.print('Изменение config.json')
readFileToVar('config', postBuildPaths.config)
checkVar(global.config, () => {
    global.config.lang = 'EN'
    global.config.buildType = 'prod'
    global.config.setting.resetButton = false
    writeFile(postBuildPaths.config, global.config, () => JSON.stringify(global.config))
})

Log.separator()

Log.print('Архивация билда')
checkPath(postBuildPaths.winrar, () => {
    execSync(`WinRAR a -ibck -ep1 -m5 "${join(postBuildPaths.out, 'SnowRunnerXMLEditor.rar')}" "${postBuildPaths.renamed}"`, {cwd: postBuildPaths.winrar})
})

Log.separator()

Log.print('Создание карты файлов для автообновления')
checkPath(postBuildPaths.sxmle_updater, () => {
    const appPath = join(postBuildPaths.renamed, 'resources', 'app')
    checkPath(appPath, () => {
        const map = generateMap(appPath)
        writeFile(join(postBuildPaths.sxmle_updater, 'updateMap.json'), map, () => JSON.stringify(map))
    })

    Log.print('Добавление файлов для автообновления')
    const updateFilesPath = join(postBuildPaths.sxmle_updater, 'files')
    checkPath(updateFilesPath, () => {
        rmSync(join(postBuildPaths.sxmle_updater, 'files'), {recursive: true})
        checkPath(appPath, () => {
            renameSync(appPath, join(postBuildPaths.sxmle_updater, 'files'))
        })
    })

    rmSync(join(postBuildPaths.renamed), {recursive: true})
})

Log.groupEnd()
Log.print('Завершено', true)
