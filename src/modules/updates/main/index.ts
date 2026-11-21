import { loadLocalization } from '@localization/main'
import { ProgramError } from '@modules/errors/main'
import type { IMainLoading } from '@modules/loading/types'
import { di, inject } from '@utilities/di/container'
import { APP_TOKEN, DIRS_TOKEN, LOADING_TOKEN, PATHS_TOKEN } from '@utilities/di/main/tokens'
import { app, shell } from 'electron'
import { createWriteStream } from 'node:fs'
import { rm } from 'node:fs/promises'
import type { IncomingMessage } from 'node:http'
import { get } from 'node:https'
import { pipeline } from 'node:stream/promises'
import { UPDATES_LOCALIZATION } from '../localization'
import type { IMainUpdates } from '../types'

/** Работа с обновлениями программы. [main] */
export class Updates implements IMainUpdates {
	/** Локализация. */
	private readonly texts = loadLocalization(UPDATES_LOCALIZATION)

	/** Работа с загрузкой.. */
	@inject(LOADING_TOKEN)
	private readonly loading!: IMainLoading

	async download(url: string, path: string): Promise<void> {
		const response = await this.request(url)
		const contentLength = Number.parseInt(response.headers['content-length'] ?? '', 10)
		const length = Number.isFinite(contentLength) && contentLength > 0
			? contentLength
			: 0
		const writeStream = createWriteStream(path)
		let current = 0

		this.loading.setStagesCount(100)
		this.loading.setCompletedCount(0)

		response.on('data', (chunk: Buffer) => {
			current += chunk.length

			if (length) {
				this.loading.setCompletedCount(Math.min(99, Math.floor(100 * (current / length))))
			}
		})

		try {
			await pipeline(response, writeStream)
		} catch (error: any) {
			await rm(path, { force: true }).catch(() => undefined)

			throw error
		}

		this.loading.setCompletedCount(100)
		this.loading.completeStage()
	}

	/**
	 * Выполнить GET запрос с переходом по редиректам.
	 * @param url URL.
	 * @param redirects Оставшееся количество переходов.
	 * @returns Ответ.
	 */
	private request(url: string, redirects = 5): Promise<IncomingMessage> {
		let parsedUrl: URL

		try {
			parsedUrl = new URL(url)
		} catch (error: any) {
			return Promise.reject(new Error(`Invalid download URL '${url}'`, { cause: error }))
		}

		if (parsedUrl.protocol !== 'https:') {
			return Promise.reject(new Error(`Unsupported download URL protocol '${parsedUrl.protocol}'`))
		}

		return new Promise<IncomingMessage>((resolve, reject) => {
			const request = get(parsedUrl, { timeout: 30_000 }, response => {
				const status = response.statusCode ?? 0
				const location = response.headers.location

				if (status >= 300 && status < 400 && location && redirects > 0) {
					response.resume()

					try {
						this.request(new URL(location, parsedUrl).toString(), redirects - 1)
							.then(resolve, reject)
					} catch (error: any) {
						reject(error)
					}

					return
				}

				if (status !== 200) {
					response.resume()
					reject(new Error(`Failed to download file: HTTP ${status}. URL: '${url}'`))

					return
				}

				resolve(response)
			})

			request.on('timeout', () => request.destroy(new Error('Download request timeout')))
			request.on('error', reject)
		})
	}

	async updateApp(version: string, portable = false) {
		if (!/^\d+\.\d+\.\d+[-\w.]*$/.test(version)) {
			throw new ProgramError(`Invalid application version '${version}'`)
		}

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
			} else {
				const openError = await shell.openPath(file.path)

				if (openError) {
					shell.showItemInFolder(file.path)
				}
			}

			app.quit()
		} catch (error: any) {
			if (!(error instanceof ProgramError)) {
				new ProgramError(error?.message ?? String(error), error)
			}

			// Перезапуск возвращает программу в рабочее состояние после неудачного обновления.
			setTimeout(() => {
				app.relaunch()
				app.quit()
			}, 2000)
		}
	}
}
