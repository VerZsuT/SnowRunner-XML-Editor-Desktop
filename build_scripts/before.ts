/*
  Скрипт преобработки билда.

  - Очищает выходную папку out.
  - Изменяет package.json, installer.config.iss.
    - Меняет версию на указанную в config.json.
  - Изменяет public.json(sxmle_updater).
    - Меняет версию на указанную в config.json.
*/

import { mkdirSync, rmSync } from 'fs'

import { allPaths, readFile, writeFile } from './helpers'
import Log from './Log'

class _BeforeBuild {
  static readonly paths = allPaths.before

  static config: any
  static packageFile: any
  static packageLockFile: any
  static publicFile: any
  static issConfig: string

  static printTitle(): void {
    Log.print('Starting pre-build script', true)
  }

  @Log.stage
  static clearOutFolder(): void {
    Log.print('Clearing out folder')
    rmSync(this.paths.out, { recursive: true, force: true })
    mkdirSync(this.paths.out)
  }

  @Log.stage
  static readFiles(): void {
    this.readFile('Reading config.json', 'config', this.paths.config)
    this.readFile('Reading package.json', 'packageFile', this.paths.package)
    this.readFile('Reading public.json', 'publicFile', this.paths.public)
    this.readFile('Reading installer.config.iss', 'issConfig', this.paths.issConfig, false)
  }

  @Log.stage
  static changeFiles(): void {
    this.changeFile('Changing package version', this.packageFile)
    this.changeFile('Changing public version', this.publicFile, 'latestVersion')
    this.changeFile(
      'Changing ISS config file',
      this,
      'issConfig',
      this.issConfig.replace(
        this.issConfig.split('MyAppVersion ')[1].split('\n')[0],
        `"${this.config.version}"`
      )
    )
  }

  @Log.stage
  static writeFiles(): void {
    this.writeFile('Writing package.json', this.paths.package, this.packageFile)
    this.writeFile('Writing public.json', this.paths.public, this.publicFile)
    this.writeFile('Writing installer.config.iss', this.paths.issConfig, this.issConfig, false)
  }

  static readFile(message: string, key: string, path: string, fromJSON = true): void {
    Log.print(message)
    this[key] = readFile(path, fromJSON)
  }

  static changeFile(message: string, variable: any, key = 'version', value = this.config.version): void {
    Log.print(message)
    variable[key] = value
  }

  static writeFile(message: string, path: string, variable: any, stringify = true): void {
    Log.print(message)
    writeFile(path, stringify ? JSON.stringify(variable, null, '\t') : variable)
  }

  static {
    this.printTitle()
    this.clearOutFolder()
    this.readFiles()
    this.changeFiles()
    this.writeFiles()
  }
}
