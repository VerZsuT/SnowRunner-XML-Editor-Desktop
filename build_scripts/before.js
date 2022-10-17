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
const log = require('./log.js')

class BeforeBuild {
  paths = allPaths.before

  config = undefined
  packageFile = undefined
  packageLockFile = undefined
  publicFile = undefined
  issConfig = undefined

  run() {
    this.printTitle()
    log.stage(this.clearOutFolder)
    log.stage(this.readFiles)
    log.stage(this.changeFiles)
    log.stage(this.writeFiles)
  }

  printTitle = () => {
    log.print('Starting pre-build script', true)
  }

  clearOutFolder = () => {
    log.print('Clearing out folder')
    checkPath(this.paths.out)
    rmSync(this.paths.out, { recursive: true })
    mkdirSync(this.paths.out)
  }

  readFiles = () => {
    this.readFile('Reading config.json', 'config', this.paths.config)
    this.readFile('Reading package.json', 'packageFile', this.paths.package)
    this.readFile('Reading package-lock.json', 'packageLockFile', this.paths.packageLock)
    this.readFile('Reading public.json', 'publicFile', this.paths.public)
    this.readFile('Reading installer.config.iss', 'issConfig', this.paths.issConfig, false)
  }

  changeFiles = () => {
    this.changeFile('Changing package version', this.packageFile)
    this.changeFile('Changing packageLock version', this.packageLockFile)
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

  writeFiles = () => {
    this.writeFile('Writing package.json', this.paths.package, this.packageFile)
    this.writeFile('Writing package-lock.json', this.paths.packageLock, this.packageLockFile)
    this.writeFile('Writing public.json', this.paths.public, this.publicFile)
    this.writeFile('Writing installer.config.iss', this.paths.issConfig, this.issConfig, false)
  }

  readFile(message, key, path, fromJSON = true) {
    log.print(message)
    this[key] = readFile(path, fromJSON)
  }

  changeFile(message, variable, key = 'version', value = this.config.version) {
    log.print(message)
    variable[key] = value
  }

  writeFile(message, path, variable, stringify = true) {
    log.print(message)
    writeFile(path, stringify ? JSON.stringify(variable, null, '\t') : variable)
  }
}

new BeforeBuild().run()
