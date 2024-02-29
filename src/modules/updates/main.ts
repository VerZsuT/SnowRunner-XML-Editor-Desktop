import { app, shell } from 'electron'
import { open } from 'node:fs/promises'
import { get } from 'node:https'

import { publicFunction } from 'emr-bridge'

import type { IPublic } from './public'
import { Keys } from './public'

import { Dirs } from '/mods/files/main'
import Helpers from '/mods/helpers/main'
import Paths from '/mods/paths/main'
import Windows from '/mods/windows/main'

export type * from './types'

/**
 * Работа с обновлениями программы  
 * _main process_
 */
class Updates {
  constructor() { this.initPublic() }

  /** Загрузить файл из сети */
  download(url: string, path?: string, inMemory = false): Promise<string | void> {
    return new Promise((resolve, reject) => {
      get(url, async response => {
        if (inMemory) {
          let chunks = ''
  
          response.on('data', chunk => chunks += chunk)
          response.on('error', reject)
          response.on('end', () => resolve(chunks))
        }
        else if (path) {
          const file = await open(path, 'w')
          const writeStream = file.createWriteStream()

          if (Windows.loadingWindow) {
            const length = Number.parseInt(response.headers['content-length']!, 10)
            let current = 0
  
            response.on('data', chunk => {
              current += chunk.length
              Windows.loadingWindow?.setPercent((100 * (current / length)).toFixed(2))
            })
            response.on('end', () => Windows.loadingWindow?.success())
          }
          
          response.pipe(writeStream)
          response.on('error', reject)
          response.on('end', () => writeStream.close(() => resolve()))
        }
      })
    })
  }

  /** Запустить процесс обновления программы */
  async update(portable = false) {
    const page = Windows.loadingWindow
    page?.download()
    page?.show()

    await Helpers.clearTemp()
    await Dirs.updateTemp.make()

    const postfix = portable ? 'portable.rar' : 'update.exe'
    const url = `${Paths.update}/SnowRunnerXMLEditor_${postfix}`
    const file = Dirs.updateTemp.file(`SnowRunnerXMLEditor_${postfix}`)
    await this.download(url, file.path)

    if (portable) {
      shell.showItemInFolder(file.path)
    }
    else {
      const err = await shell.openPath(file.path)
      if (err) shell.showItemInFolder(file.path)
    }
    app.quit()
  }

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicFunction<IPublic[Keys.updateApp]>(Keys.updateApp, this.update.bind(this))
  }
}

export default new Updates()
