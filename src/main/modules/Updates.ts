import { app } from 'electron'
import { copyFileSync, createWriteStream, existsSync, lstatSync, mkdirSync } from 'fs'
import { get } from 'https'
import { basename, dirname, join } from 'path'

import { publicMethod } from 'emr-bridge'

import Config from './Config'
import ExitParams from './ExitParams'
import Hash from './Hash'
import Helpers from './Helpers'
import Paths from './Paths'
import Windows from './Windows'

import type { IDownloadParams, UpdateMap } from '#g/types'
import { hasItems } from '#g/utils'

class UpdatesClass {
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
    const page = Windows.loading
    let flagToReload = false

    page?.download()
    page?.show()
    Helpers.clearTemp()

    this.download({
      url: Paths.updateMap,
      fromJSON: true,
      inMemory: true
    }, updateMap => {
      const checked = this.processMap(updateMap)
      const toCopy = checked[0]
      let forCreateOrChange = checked[1]

      mkdirSync(Paths.updateRoot)
      toCopy.forEach(relPath => {
        const mainAbsPath = join(Paths.root, relPath)
        const updateAbsPath = join(Paths.updateRoot, relPath)

        if (!existsSync(dirname(updateAbsPath))) {
          mkdirSync(dirname(updateAbsPath), { recursive: true })
        }

        copyFileSync(mainAbsPath, updateAbsPath)
      })

      if (!hasItems(forCreateOrChange)) {
        ExitParams.saveConfig = false
        Config.export()
        ExitParams.quit = true
        app.relaunch()
        app.quit()
      }
      const toDownload: { url: string, path: string }[] = []
      forCreateOrChange.forEach(relativePath => {
        const path = join(Paths.updateRoot, relativePath)
        const webPath = relativePath.replaceAll('\\', '/').replace('.webpack', 'webpack')
        const url = `${Paths.updateFiles}/${webPath}`

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
        if (!hasItems(forCreateOrChange) && !flagToReload) {
          ExitParams.saveConfig = false
          ExitParams.quit = true
          flagToReload = true

          Config.export()
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
      const absolutePath = join(Paths.root, relativePath)

      if (!existsSync(absolutePath)) {
        toCreateOrChange.push(relativePath)
      }
      else {
        if (lstatSync(absolutePath).isDirectory()) continue

        if (Hash.calc(absolutePath) !== map[relativePath]) {
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

const Updates = new UpdatesClass()

export default Updates
