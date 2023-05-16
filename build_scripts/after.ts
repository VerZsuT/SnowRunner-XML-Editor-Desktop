/*
  Стрипт постобработки билда.

  - Переименовывает билд.
  - Устанавливает тип билда на `prod` в `config.json` готового билда.
  - Создаёт карту обновления и копирует файлы для него (sxmle_updater).
  - Архивирует билд с помощью `WinRAR`.
  - Запускает `InnoSetup` и копирует .exe файл для загрузки на `GoogleDrive`
*/

import { execSync } from 'child_process'
import { copyFileSync, existsSync, readdirSync, renameSync, rmSync } from 'fs'
import { join } from 'path'

import { allPaths, checkPath, generateMap, readFile, writeFile } from './helpers'
import Log from './Log'

class AfterBuild {
  paths = allPaths.after
  config: any

  run(): void {
    this.printTitle()

    this.renameBuild()
    this.deleteUnisedLocals()
    this.changeConfig()
    this.achiveBuild()
    this.createFileMap()
    this.buildInstaller()
  }

  printTitle(): void {
    Log.print('Starting post-build script', true)
  }

  @Log.stage
  renameBuild() {
    Log.print('Renaming the build')
    checkPath(this.paths.original)
    renameSync(this.paths.original, this.paths.renamed)
  }

  @Log.stage
  deleteUnisedLocals() {
    const localsPath = join(this.paths.renamed, 'locales')
    Log.print('Deleting unused locals')
    readdirSync(localsPath, { withFileTypes: true }).forEach(item => {
      const fileName = item.name.replace('.pak', '')
      if (!['ru', 'en-US'].includes(fileName)) {
        rmSync(join(localsPath, item.name))
      }
    })
  }

  @Log.stage
  changeConfig() {
    Log.print('Changing config.json')
    this.config = readFile(this.paths.config)
    this.config.buildType = 'prod'
    this.config.settings.showWhatsNew = true
    writeFile(this.paths.config, JSON.stringify(this.config, null, '\t'))
  }

  @Log.stage
  achiveBuild() {
    Log.print('Archiving the build')
    checkPath(this.paths.winrar)
    execSync(`WinRAR a -ibck -ep1 -m5 "${join(this.paths.out, 'SnowRunnerXMLEditor.rar')}" "${this.paths.renamed}"`, { cwd: this.paths.winrar })
  }

  @Log.stage
  createFileMap() {
    Log.print('Creating a file map for auto-updating')
    checkPath(this.paths.sxmleUpdater, () => {
      const appPath = checkPath(join(this.paths.renamed, 'resources/app'))
      const map = generateMap(appPath)
      writeFile(join(this.paths.sxmleUpdater, 'updateMap.json'), JSON.stringify(map))

      Log.print('Adding files for auto-update')
      const updateFilesPath = checkPath(join(this.paths.sxmleUpdater, 'files'))
      rmSync(updateFilesPath, { recursive: true })
      renameSync(appPath, updateFilesPath)
      renameSync(join(this.paths.sxmleUpdater, 'files/.webpack'), join(this.paths.sxmleUpdater, 'files/webpack'))
      rmSync(join(this.paths.renamed), { recursive: true })
    })
  }

  @Log.stage
  buildInstaller() {
    this.createInstallator()
    this.launchInnoSetup()
    this.copyEXEForCloud()
  }

  createInstallator() {
    Log.print('Creating an installation file')
    if (!existsSync(this.paths.renamed)) {
      Log.print('Unpacking files for installation')
      execSync(`WinRAR x -ibck -inul "${join(this.paths.out, 'SnowRunnerXMLEditor.rar')}" "${this.paths.out}\\"`, { cwd: this.paths.winrar })
    }
  }

  launchInnoSetup() {
    Log.print('Launching InnoSetup')
    execSync('installer.config.iss', { cwd: join(__dirname, '../innoSetup') })
  }

  copyEXEForCloud() {
    Log.print('Copying .exe file for Cloud')
    checkPath(join(this.paths.out, 'SnowRunnerXMLEditor.exe'), () => {
      copyFileSync(
        join(this.paths.out, 'SnowRunnerXMLEditor.exe'),
        join(this.paths.out, `SnowRunnerXMLEditor_v${this.config.version}.exe`)
      )
    })
  }
}

new AfterBuild().run()
