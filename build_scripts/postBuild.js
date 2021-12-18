/*
    Стрипт постобработки билда.
    
    - Переименовывает билд.
    - Устанавливает тип билда на prod в config.json готового билда.
    - Создаёт карту обновления и копирует файлы для него (sxmle_updater).
    - Архивирует билд с помощью WinRAR.
    - Запускает InnoSetup и копирует .exe файл для загрузки на GoogleDrive
*/

const { execSync } = require('child_process')
const { join } = require('path')
const { renameSync, rmSync, existsSync, copyFileSync } = require('fs')
const { argv } = require('process')

const { checkPath, readFileToVar, checkVar, writeFile, generateMap, postBuildPaths: paths } = require('./funcs.js')
const Log = require('./Log.js')
const writeChanges = require('./writeChanges.js')

const winrarPath = paths.winrar_x32
const originalPath = argv[2] === 'x32'? paths.original_x32 : paths.original_x64

Log.mainGroup()
Log.print('Starting post-build script', true)
Log.stageGroup()

Log.print('Renaming the build')
checkPath(originalPath, () => {
    renameSync(originalPath, paths.renamed)
}, true)

Log.separator()

Log.print('Changing config.json')
readFileToVar('config', paths.config)
checkVar(config, () => {
    config.lang = 'EN'
    config.buildType = 'prod'
    config.settings.resetButton = false
    config.settings.showWhatsNew = true
    writeFile(paths.config, config, () => JSON.stringify(config))
})

Log.separator()

Log.print('Archiving the build')
checkPath(winrarPath, () => {
    execSync(`WinRAR a -ibck -ep1 -m5 "${join(paths.out, 'SnowRunnerXMLEditor.rar')}" "${paths.renamed}"`, {cwd: winrarPath})
})

Log.separator()

Log.print('Creating a file map for auto-updating')
checkPath(paths.sxmle_updater, () => {
    const appPath = join(paths.renamed, 'resources', 'app')
    checkPath(appPath, () => {
        const map = generateMap(appPath)
        writeFile(join(paths.sxmle_updater, 'updateMap.json'), map, () => JSON.stringify(map))
    })

    Log.print('Adding files for auto-update')
    const updateFilesPath = join(paths.sxmle_updater, 'files')
    checkPath(updateFilesPath, () => {
        rmSync(join(paths.sxmle_updater, 'files'), {recursive: true})
        checkPath(appPath, () => {
            renameSync(appPath, join(paths.sxmle_updater, 'files'))
            renameSync(join(paths.sxmle_updater, 'files', '.webpack'), join(paths.sxmle_updater, 'files', 'webpack'))
        })
    })

    rmSync(join(paths.renamed), {recursive: true})
})

Log.separator()

Log.print('Creating an installation file')
if (!existsSync(paths.renamed)) {
    Log.print('Unpacking files for installation')
    execSync(`WinRAR x -ibck -inul "${join(paths.out, 'SnowRunnerXMLEditor.rar')}" "${paths.out}\\"`, {cwd: winrarPath})
}
Log.print('Launching InnoSetup')
execSync('installer.config.iss', {cwd: join(__dirname, '..', 'innoSetup')})
Log.print('Copying .exe file for Google Drive')
if (existsSync(join(paths.out, 'SnowRunnerXMLEditor.exe'))) {
    copyFileSync(join(paths.out, 'SnowRunnerXMLEditor.exe'), join(paths.out, `SnowRunnerXMLEditor_v${config.version}.exe`))
} else {
    Log.error('"SnowRunnerXMLEditor.exe" not found.')
}

Log.separator()

Log.print('Creating files with a list of changes')
writeChanges().then(() => {
    Log.groupEnd()
    Log.print('Success', true)
})
