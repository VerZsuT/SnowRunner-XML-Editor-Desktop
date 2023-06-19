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

import { allPaths, checkPaths, generateMap, hasPaths, readFile, writeFile } from './helpers'
import Log from './Log'

class _AfterBuild {
  static readonly paths = allPaths.after
  static readonly isWin7 = process.argv.at(2) === 'win7'
  static config: any

  static printTitle(): void {
    Log.print('Starting post-build script', true)
  }

  @Log.stage
  static renameBuild(): void | never {
    Log.print('Renaming the build')
    checkPaths(this.paths.original)
    renameSync(this.paths.original, this.paths.renamed)
  }

  @Log.stage
  static deleteUnusedLocals(): void | never {
    Log.print('Deleting unused locals')
    checkPaths(this.paths.renamed)
    const localsPath = join(this.paths.renamed, 'locales')
    hasPaths(localsPath, () => {
      for (const item of readdirSync(localsPath, { withFileTypes: true })) {
        const fileName = item.name.replace('.pak', '')
        if (!['ru', 'en-US'].includes(fileName)) {
          rmSync(join(localsPath, item.name))
        }
      }
    })
  }

  @Log.stage
  static changeConfig(): void | never {
    Log.print('Changing config.json')
    checkPaths(this.paths.config)
    this.config = readFile(this.paths.config)
    this.config.buildType = 'prod'
    this.config.settings.showWhatsNew = true
    writeFile(this.paths.config, JSON.stringify(this.config, null, '\t'))
  }

  @Log.stage
  static achiveBuild(): boolean {
    Log.print('Archiving the build')
    return Boolean(hasPaths(this.paths.winrar, () => {
      checkPaths(this.paths.winrar)
      execSync(`WinRAR a -ibck -ep1 -m5 "${join(this.paths.out, 'SnowRunnerXMLEditor.rar')}" "${this.paths.renamed}"`, { cwd: this.paths.winrar })
    }))
  }

  @Log.stage
  static createFileMap(): void {
    Log.print('Creating a file map for auto-updating')
    const appPath = join(this.paths.renamed, 'resources/app')
    const filesFolder = this.isWin7 ? 'win7_files' : 'files'
    const updateFilesPath = join(this.paths.sxmleUpdater, filesFolder)
    hasPaths([this.paths.sxmleUpdater, appPath], () => {
      const map = generateMap(appPath)
      writeFile(join(this.paths.sxmleUpdater, 'updateMap.json'), JSON.stringify(map))
      Log.print('Adding files for auto-update')
      rmSync(updateFilesPath, { recursive: true, force: true })
      renameSync(appPath, updateFilesPath)
      renameSync(join(this.paths.sxmleUpdater, `${filesFolder}/.webpack`), join(this.paths.sxmleUpdater, `${filesFolder}/webpack`))
      rmSync(this.paths.renamed, { recursive: true })
    })
  }

  @Log.stage
  static buildInstaller(): void {
    this.unpackFiles()
    this.launchInnoSetup()
    this.copyEXEForCloud()
  }

  static unpackFiles(): void {
    Log.print('Creating an installation file')
    if (!existsSync(this.paths.renamed)) {
      Log.print('Unpacking files for installation')
      execSync(`WinRAR x -ibck -inul "${join(this.paths.out, 'SnowRunnerXMLEditor.rar')}" "${this.paths.out}\\"`, { cwd: this.paths.winrar })
    }
  }

  static launchInnoSetup(): void {
    Log.print('Launching InnoSetup')
    execSync('installer.config.iss', { cwd: join(__dirname, '../innoSetup') })
  }

  static copyEXEForCloud(): void {
    Log.print('Copying .exe file for Cloud')
    const exePath = join(this.paths.out, 'SnowRunnerXMLEditor.exe')
    let renamedPath = exePath
    hasPaths(exePath, () => {
      if (this.isWin7) {
        renamedPath = join(this.paths.out, 'SnowRunnerXMLEditor_win7.exe')
        renameSync(exePath, renamedPath)
      }
      copyFileSync(
        join(renamedPath),
        join(this.paths.out, `SnowRunnerXMLEditor_v${this.config.version}${this.isWin7 ? '_win7' : ''}.exe`)
      )
    })
  }

  static {
    this.printTitle()
    this.renameBuild()
    this.deleteUnusedLocals()
    this.changeConfig()
    if (this.achiveBuild()) {
      this.createFileMap()
      this.buildInstaller()
    }
    Log.print('Done', true)
  }
}
