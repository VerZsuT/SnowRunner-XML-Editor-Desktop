/*
    Стрипт постобработки билда.
    
    - Переименовывает билд.
    - Устанавливает тип билда на prod в config.json готового билда.
    - Создаёт карту обновления и копирует файлы для него (sxmle_updater).
    - Архивирует билд с помощью WinRAR.
    - Запускает InnoSetup и копирует .exe файл для загрузки на GoogleDrive
*/

const {execSync} = require('child_process')
const {renameSync, rmSync, existsSync, copyFileSync, readdirSync} = require('fs')
const {join} = require('path')

const {checkPath, readFile, writeFile, generateMap, allPaths} = require('./helpers.js')
const {print, stage} = require('./log.js')

const paths = allPaths.after

let config

print('Starting post-build script', true)

stage(() => {
    print('Renaming the build')
    checkPath(paths.original)
    renameSync(paths.original, paths.renamed)
})

stage(() => {
    const localsPath = join(paths.renamed, 'locales')
    print('Deleting unused locals')
    readdirSync(localsPath, { withFileTypes: true }).forEach(item => {
        const fileName = item.name.replace('.pak', '')
        if (!['ru', 'en-US'].includes(fileName))
            rmSync(join(localsPath, item.name))
    })
})

stage(() => {
    print('Changing config.json')
    config = readFile(paths.config)
    config.buildType = 'prod'
    config.settings.showWhatsNew = true
    writeFile(paths.config, JSON.stringify(config))
})

stage(() => {
    print('Archiving the build')
    checkPath(paths.winrar)
    execSync(`WinRAR a -ibck -ep1 -m5 "${join(paths.out, 'SnowRunnerXMLEditor.rar')}" "${paths.renamed}"`, { cwd: paths.winrar })
})

stage(() => {
    print('Creating a file map for auto-updating')
    checkPath(paths.sxmleUpdater, () => {
        const appPath = join(paths.renamed, 'resources/app')
        checkPath(appPath)
        const map = generateMap(appPath)
        writeFile(join(paths.sxmleUpdater, 'updateMap.json'), JSON.stringify(map))
    
        print('Adding files for auto-update')
        const updateFilesPath = join(paths.sxmleUpdater, 'files')
        checkPath(updateFilesPath)
        rmSync(join(paths.sxmleUpdater, 'files'), { recursive: true })
        renameSync(appPath, join(paths.sxmleUpdater, 'files'))
        renameSync(join(paths.sxmleUpdater, 'files/.webpack'), join(paths.sxmleUpdater, 'files/webpack'))
        
        rmSync(join(paths.renamed), { recursive: true })
    })
})

stage(() => {
    print('Creating an installation file')
    if (!existsSync(paths.renamed)) {
        print('Unpacking files for installation')
        execSync(`WinRAR x -ibck -inul "${join(paths.out, 'SnowRunnerXMLEditor.rar')}" "${paths.out}\\"`, { cwd: paths.winrar })
    }

    print('Launching InnoSetup')
    execSync('installer.config.iss', { cwd: join(__dirname, '../innoSetup') })

    print('Copying .exe file for Cloud')
    checkPath(join(paths.out, 'SnowRunnerXMLEditor.exe'), () => {
        copyFileSync(
            join(paths.out, 'SnowRunnerXMLEditor.exe'),
            join(paths.out, `SnowRunnerXMLEditor_v${config.version}.exe`)
        )
    })
})
