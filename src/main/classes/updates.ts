import { app } from 'electron'
import { copyFileSync, createWriteStream, existsSync, lstatSync, mkdirSync } from 'fs'
import { get } from 'https'
import { basename, dirname, join } from 'path'

import { providePublic, publicMethod } from 'emr-bridge'

import config from './config'
import exitParams from './exitParams'
import hash from './hash'
import helpers from './helpers'
import paths from './paths'
import windows from './windows'

import type { IDownloadParams, UpdateMap } from '#types'

class Updates {
  /** Загрузить файл(ы) из сети */
  download(params: IDownloadParams, callback: (data?: any) => any): void {
    const { array, isRoot, inMemory, loadingPage, path, url, fromJSON } = params

    if (array) {
      const { url, path } = array[0]

      if (isRoot) {
        loadingPage?.setCount(array.length)
      }

      loadingPage?.setText(basename(path))

      this.download({ url, path, loadingPage }, () => {
        callback()
        if (array.length > 1) {
          this.download({
            array: array.slice(1),
            loadingPage
          }, callback)
        }
      })
      return
    }

    get(url!, response => {
      if (inMemory) {
        let chunks = ''

        response.on('data', chunk => chunks += chunk)
        response.on('end', () => {
          if (fromJSON) {
            callback(JSON.parse(chunks))
          }
          else {
            callback(chunks)
          }
        })
      }
      else {
        const file = createWriteStream(path!)
        if (loadingPage) {
          const len = parseInt(response.headers['content-length']!, 10)
          let cur = 0

          response.on('data', chunk => {
            cur += chunk.length
            loadingPage.setPercent((100.0 * (cur / len)).toFixed(2))
          })
        }

        response.pipe(file)
        response.on('end', () => {
          loadingPage?.success()
          file.on('close', callback)
          file.close()
        })
      }
    })
  }

  /** Запустить процесс обновления программы */
  @publicMethod('updateApp')
  update(): void {
    const page = windows.loading
    let flagToReload = false

    page?.download()
    page?.show()
    helpers.clearTemp()

    this.download({
      url: paths.updateMap,
      fromJSON: true,
      inMemory: true
    }, updateMap => {
      const checked = this.processMap(updateMap)
      const toCopy = checked[0]
      let forCreateOrChange = checked[1]

      mkdirSync(paths.updateRoot)
      toCopy.forEach(relPath => {
        const mainAbsPath = join(paths.root, relPath)
        const updateAbsPath = join(paths.updateRoot, relPath)

        if (!existsSync(dirname(updateAbsPath))) {
          mkdirSync(dirname(updateAbsPath), { recursive: true })
        }

        copyFileSync(mainAbsPath, updateAbsPath)
      })

      if (forCreateOrChange.length === 0) {
        exitParams.saveConfig = false
        config.export()
        exitParams.quit = true
        app.relaunch()
        app.quit()
      }
      const toDownload: { url: string, path: string }[] = []
      forCreateOrChange.forEach(relativePath => {
        const path = join(paths.updateRoot, relativePath)
        const webPath = relativePath.replaceAll('\\', '/').replace('.webpack', 'webpack')
        const url = `${paths.updateFiles}/${webPath}`

        if (!existsSync(dirname(path))) {
          mkdirSync(dirname(path), { recursive: true })
        }

        toDownload.push({ url, path })
      })

      this.download({
        array: toDownload,
        loadingPage: page,
        isRoot: true
      }, () => {
        forCreateOrChange = forCreateOrChange.slice(1)
        if (forCreateOrChange.length === 0 && !flagToReload) {
          exitParams.saveConfig = false
          exitParams.quit = true
          flagToReload = true

          config.export()
          app.relaunch()
          app.quit()
        }
      })
    })
  }

  /**
   * Обработать карту обновления
   * @param map - карта обновления
   * @returns `[пути_для_удаления, для_обновления]`
   */
  private processMap(map: UpdateMap): [string[], string[]] {
    const toCreateOrChange: string[] = []
    const toCopy: string[] = []

    for (const relativePath in map) {
      const absolutePath = join(paths.root, relativePath)

      if (!existsSync(absolutePath)) {
        toCreateOrChange.push(relativePath)
      }
      else {
        if (lstatSync(absolutePath).isDirectory()) continue

        if (hash.calc(absolutePath) !== map[relativePath]) {
          toCreateOrChange.push(relativePath)
        }
        else {
          toCopy.push(relativePath)
        }
      }
    }

    return [toCopy, toCreateOrChange]
  }
}

export default providePublic(new Updates())
