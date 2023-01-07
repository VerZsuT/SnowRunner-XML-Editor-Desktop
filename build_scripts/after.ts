/*
  Стрипт постобработки билда.

  - Переименовывает билд.
  - Устанавливает тип билда на prod в config.json готового билда.
  - Создаёт карту обновления и копирует файлы для него (sxmle_updater).
  - Архивирует билд с помощью WinRAR.
  - Запускает InnoSetup и копирует .exe файл для загрузки на GoogleDrive
*/

import { execSync } from 'child_process'
import { copyFileSync, existsSync, readdirSync, renameSync, rmSync } from 'fs'
import { join } from 'path'

import { allPaths, checkPath, generateMap, readFile, writeFile } from './helpers'
import log from './Log'

class AfterBuild {
  paths = allPaths.after
  config: any

  run(): void {
    this.printTitle()
    log.stage(this.renameBuild)
    log.stage(this.deleteUnisedLocals)
    log.stage(this.changeConfig)
    log.stage(this.achiveBuild)
    log.stage(this.createFileMap)
    log.stage(() => {
      this.createInstallator()
      this.launchInnoSetup()
      this.copyEXEForCloud()
    })
  }

  printTitle(): void {
    log.print('Starting post-build script', true)
  }

  renameBuild = () => {
    log.print('Renaming the build')
    checkPath(this.paths.original)
    renameSync(this.paths.original, this.paths.renamed)
  }

  deleteUnisedLocals = () => {
    const localsPath = join(this.paths.renamed, 'locales')
    log.print('Deleting unused locals')
    readdirSync(localsPath, { withFileTypes: true }).forEach(item => {
      const fileName = item.name.replace('.pak', '')
      if (!['ru', 'en-US'].includes(fileName)) {
        rmSync(join(localsPath, item.name))
      }
    })
  }

  changeConfig = () => {
    log.print('Changing config.json')
    this.config = readFile(this.paths.config)
    this.config.buildType = 'prod'
    this.config.settings.showWhatsNew = true
    writeFile(this.paths.config, JSON.stringify(this.config, null, '\t'))
  }

  achiveBuild = () => {
    log.print('Archiving the build')
    checkPath(this.paths.winrar)
    execSync(`WinRAR a -ibck -ep1 -m5 "${join(this.paths.out, 'SnowRunnerXMLEditor.rar')}" "${this.paths.renamed}"`, { cwd: this.paths.winrar })
  }

  createFileMap = () => {
    log.print('Creating a file map for auto-updating')
    checkPath(this.paths.sxmleUpdater, () => {
      const appPath = checkPath(join(this.paths.renamed, 'resources/app'))
      const map = generateMap(appPath)
      writeFile(join(this.paths.sxmleUpdater, 'updateMap.json'), JSON.stringify(map))
  
      log.print('Adding files for auto-update')
      const updateFilesPath = checkPath(join(this.paths.sxmleUpdater, 'files'))
      rmSync(updateFilesPath, { recursive: true })
      renameSync(appPath, updateFilesPath)
      renameSync(join(this.paths.sxmleUpdater, 'files/.webpack'), join(this.paths.sxmleUpdater, 'files/webpack'))
      rmSync(join(this.paths.renamed), { recursive: true })
    })
  }

  createInstallator = () => {
    log.print('Creating an installation file')
    if (!existsSync(this.paths.renamed)) {
      log.print('Unpacking files for installation')
      execSync(`WinRAR x -ibck -inul "${join(this.paths.out, 'SnowRunnerXMLEditor.rar')}" "${this.paths.out}\\"`, { cwd: this.paths.winrar })
    }
  }

  launchInnoSetup = () => {
    log.print('Launching InnoSetup')
    execSync('installer.config.iss', { cwd: join(__dirname, '../innoSetup') })
  }

  copyEXEForCloud = () => {
    log.print('Copying .exe file for Cloud')
    checkPath(join(this.paths.out, 'SnowRunnerXMLEditor.exe'), () => {
      copyFileSync(
        join(this.paths.out, 'SnowRunnerXMLEditor.exe'),
        join(this.paths.out, `SnowRunnerXMLEditor_v${this.config.version}.exe`)
      )
    })
  }
}

new AfterBuild().run()
