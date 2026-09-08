import { loadLocalization } from '@localization/main'
import { ProgramError } from '@modules/errors/main'
import type { IMainLoading } from '@modules/loading/types'
import { di, inject } from '@utilities/di/container'
import { APP_TOKEN, DIRS_TOKEN, LOADING_TOKEN, PATHS_TOKEN } from '@utilities/di/main/tokens'
import { app, shell } from 'electron'
import { open } from 'node:fs/promises'
import { get } from 'node:https'
import { UPDATES_LOCALIZATION } from '../localization'
import type { IMainUpdates } from '../types'

/** Работа с обновлениями программы. [main] */
export class Updates implements IMainUpdates {
	/** Локализация. */
	private readonly texts = loadLocalization(UPDATES_LOCALIZATION)

	/** Работа с загрузкой.. */
	@inject(LOADING_TOKEN)
	private readonly loading!: IMainLoading

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

				this.loading.setStagesCount(100)
				response.pipe(writeStream)
				response.on('data', chunk => {
					current += chunk.length
					this.loading.setCompletedCount(Math.floor(100 * (current / length)))
				})
				response.on('error', reject)
				response.on('end', () => {
					this.loading.completeStage()
					writeStream.close(() => resolve())
				})
			})
		})

		return promise
	}

	async updateApp(version: string, portable = false) {
		this.loading.init(this.texts.downloading)

		try {
			const app = di.resolve(APP_TOKEN)
			const dirs = di.resolve(DIRS_TOKEN)
			const paths = di.resolve(PATHS_TOKEN)

			await app.clearTemp()
			await dirs.updateTemp.make()

			const postfix = portable
				? '.rar'
				: '.exe'
			const url = `${paths.update}/v${version}/SnowRunnerXMLEditor${postfix}`
			const file = dirs.updateTemp.file(`SnowRunnerXMLEditor${postfix}`)

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
