import { providePublic, publicMethod } from '@bridge/main'
import { loadLocalization } from '@localization/main'
import App from '@modules/app/main'
import { ProgramError } from '@modules/errors/main'
import { Dirs } from '@modules/files/main'
import Paths from '@modules/paths/main'
import { app, shell } from 'electron'
import { open } from 'node:fs/promises'
import { get } from 'node:https'
import { Loading } from '../main'
import localization from './localization'

const texts = loadLocalization(localization)

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
  download(url: string, path: string): Promise<string | void> {
    const { promise, resolve, reject } = Promise.withResolvers<string | void>()

    get(url, async response => {
			const location = response.headers.location

			if (!location) {
				return reject(`The file on GitHub is not available for download. URL: '${url}'`)
			}

			get(location, async response => {
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
			})
    })

    return promise
  }

  /** Запустить процесс обновления программы. */
  @publicMethod()
  async updateApp(version: string, portable = false) {
    Loading.init(texts.downloading)

		try {
			await App.clearTemp()
			await Dirs.updateTemp.make()

			const postfix = portable
				? '.rar'
				: '.exe'
			const url = `${Paths.update}/v${version}/SnowRunnerXMLEditor${postfix}`
			const file = Dirs.updateTemp.file(`SnowRunnerXMLEditor${postfix}`)

			await this.download(url, file.path)

			if (portable) {
				shell.showItemInFolder(file.path)
			} else if (await shell.openPath(file.path)) {
				shell.showItemInFolder(file.path)
			}

			app.quit()
		} catch (error: any) {
			setTimeout(() => {
				app.relaunch()
				app.quit()
			}, 2000)

			throw new ProgramError(error)
		}
  }
}

/**
 * Работа с обновлениями программы.
 * _main process_
 */
export default new Updates()
