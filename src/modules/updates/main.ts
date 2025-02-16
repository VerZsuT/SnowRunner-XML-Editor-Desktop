import { app, shell } from 'electron'
import { open } from 'node:fs/promises'
import { get } from 'node:https'
import { Loading } from '../main'
import TextsLoader from './texts'
import { Dirs } from '/mods/files/main'
import Helpers from '/mods/helpers/main'
import Paths from '/mods/paths/main'
import { providePublic, publicMethod } from '/utils/bridge/main'

const texts = await TextsLoader.loadMain()

/**
 * Работа с обновлениями программы.  
 * _main process_
 */
@providePublic()
class Updates {
  /**
   * Загрузить файл из сети.
   * @param url URL файла.
   * @param path Путь в файловой системе.
   * @param inMemory Сохранять в памяти.
   * @returns Содержимое файла (при `inMemory=true`).
   */
  download(url: string, path?: string, inMemory = false): Promise<string | void> {
    const { promise, resolve, reject } = Promise.withResolvers<string | void>()

    get(url, async response => {
      if (inMemory) {
        let chunks = ''

        response.on('data', chunk => chunks += chunk)
        response.on('error', reject)
        response.on('end', () => resolve(chunks))
      } else if (path) {
        const file = await open(path, 'w')
        const writeStream = file.createWriteStream()
        const length = Number.parseInt(response.headers['content-length']!, 10)
        let current = 0

        Loading.setStagesCount(100)
        response.pipe(writeStream)
        response.on('data', chunk => {
          current += chunk.length
          Loading.setCompletedCount(Math.floor(100 * (current / length)))
        })
        response.on('error', reject)
        response.on('end', () => {
          Loading.completeStage()
          writeStream.close(() => resolve())
        })
      }
    })
    
    return promise
  }

  /** Запустить процесс обновления программы. */
  @publicMethod()
  async updateApp(portable = false) {
    Loading.init(texts.downloading)

    await Helpers.clearTemp()
    await Dirs.updateTemp.make()

    const postfix = portable
      ? 'portable.rar'
      : 'update.exe'
    const url = `${Paths.update}/SnowRunnerXMLEditor_${postfix}`
    const file = Dirs.updateTemp.file(`SnowRunnerXMLEditor_${postfix}`)
    
    await this.download(url, file.path)

    if (portable) {
      shell.showItemInFolder(file.path)
    } else if (await shell.openPath(file.path)) {
      shell.showItemInFolder(file.path)
    }

    app.quit()
  }
}

/**
 * Работа с обновлениями программы.  
 * _main process_
 */
export default new Updates()
