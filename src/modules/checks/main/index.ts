import { loadLocalization } from '@localization/main'
import type { IMainDialogs } from '@modules/dialogs/types'
import { ErrorText } from '@modules/errors/enums'
import { ProgramError } from '@modules/errors/main'
import type { IMainDirs as IDirs, IMainFiles as IFiles } from '@modules/files/main'
import { di, inject } from '@utilities/di/container'
import { ARCHIVER_TOKEN, BACKUP_TOKEN, CONFIG_TOKEN, DIALOGS_TOKEN, DIRS_TOKEN, FILES_TOKEN, PATHS_TOKEN, SIZES_TOKEN } from '@utilities/di/main/tokens'
import { compareVersions } from '@utilities/strings/main'
import { app } from 'electron'
import dns from 'node:dns'
import { get } from 'node:https'
import { CHECKS_LOCALIZATION } from '../localization'
import type { IMainChecks, IPubFile } from '../types'

/** Разного рода проверки. [main] */
export class Checks implements IMainChecks {
	/** Локализация. */
	private readonly texts = loadLocalization(CHECKS_LOCALIZATION)

	@inject(DIALOGS_TOKEN)
	/** Диалоги. */
	private readonly dialogs!: IMainDialogs

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: IDirs

	/** Основны файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	/** Папка с xml файлами из initial.pak. */
	private readonly MEDIA_FOLDER = '[media]'

	/** Url сайта GitHub. */
	private readonly GITHUB_URL = 'github.com'

	/** Таймаут сетевых запросов. */
	private readonly REQUEST_TIMEOUT = 10_000

	/** Максимальный размер ответа. */
	private readonly MAX_RESPONSE_SIZE = 64 * 1024

	async hasAdminPrivileges(): Promise<boolean> {
		try {
			await this.files.config.make()

			const readResult = await this.files.config.canRead()
			const writeResult = await this.files.config.canWrite()

			if (!readResult.result || !writeResult.result) {
				throw new Error('Cannot read/write json file', { cause: readResult.error ?? writeResult.error })
			}

			return true
		} catch (error: any) {
			void this.dialogs.alert({
				message: `${this.texts.adminRequiredMessage}\nError: ${error?.message}`,
				type: 'warning',
				buttons: ['Exit'],
				title: 'Error'
			})
				.catch((dialogError: unknown) => console.error(dialogError))
				.finally(() => app.quit())

			return false
		}
	}

	async checkInitialChanges() {
		const sizes = di.resolve(SIZES_TOKEN)
		const initial = this.files.initial

		if (!await initial.exists()) {
			return
		}

		const hasContent = await this.dirs.mainTemp.dir(this.MEDIA_FOLDER).exists()
		const withoutChanges = await initial.getSize() === sizes.initial

		if (hasContent && withoutChanges) {
			return
		}

		if (!await this.files.backupInitial.exists()) {
			const backup = di.resolve(BACKUP_TOKEN)

			await backup.save()
		}

		if (await this.dirs.mainTemp.exists()) {
			await this.dirs.backupInitialData.remove()
			await this.dirs.backupInitialData.root.make()

			if (!RENDERER_VITE_DEV_SERVER_URL) {
				await this.dirs.mainTemp.move(this.dirs.backupInitialData)
			}
		}

		const archiver = di.resolve(ARCHIVER_TOKEN)

		await archiver.unpackMain(false)
	}

	async checkUpdate(whateverCheck?: boolean): Promise<string | undefined> {
		const config = di.resolve(CONFIG_TOKEN)

		if (!config.checkUpdates && !whateverCheck) {
			return
		}

		try {
			await this.checkGitHubAvailable()

			const paths = di.resolve(PATHS_TOKEN)
			const rawData = await this.requestText(paths.publicInfo)
			let data: IPubFile

			try {
				data = JSON.parse(rawData)
			} catch (error: any) {
				throw new ProgramError(ErrorText.gitHubConnectError, error)
			}

			if (!data || typeof data.latestVersion !== 'string' || !data.latestVersion.trim()) {
				throw new ProgramError(ErrorText.gitHubConnectError)
			}

			return compareVersions(config.version, data.latestVersion) < 0
				? data.latestVersion
				: undefined
		} catch (error: any) {
			// Отсутствие сети не должно приводить к необработанному отклонению промиса.
			if (!(error instanceof ProgramError)) {
				new ProgramError(error?.message ?? ErrorText.gitHubConnectError, error)
			}

			return undefined
		}
	}

	/** Проверить доступность GitHub. */
	private async checkGitHubAvailable(): Promise<void> {
		await new Promise<void>((resolve, reject) => {
			const timer = setTimeout(
				() => reject(new ProgramError(ErrorText.gitHubConnectError)),
				this.REQUEST_TIMEOUT
			)

			dns.resolve(this.GITHUB_URL, error => {
				clearTimeout(timer)

				if (error) {
					reject(new ProgramError(ErrorText.gitHubConnectError, error))

					return
				}

				resolve()
			})
		})
	}

	/**
	 * Загрузить текст по URL.
	 * @param url URL.
	 * @param redirects Оставшееся количество переходов.
	 * @returns Текст ответа.
	 */
	private requestText(url: string, redirects = 5): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const request = get(url, { timeout: this.REQUEST_TIMEOUT }, response => {
				const status = response.statusCode ?? 0
				const location = response.headers.location

				if (status >= 300 && status < 400 && location && redirects > 0) {
					response.resume()

					try {
						this.requestText(new URL(location, url).toString(), redirects - 1)
							.then(resolve, reject)
					} catch (error: any) {
						reject(new ProgramError(ErrorText.gitHubConnectError, error))
					}

					return
				}

				if (status < 200 || status >= 300) {
					response.resume()
					reject(new ProgramError(`${ErrorText.gitHubConnectError} (HTTP ${status})`))

					return
				}

				let rawData = ''

				response.setEncoding('utf8')
				response.on('data', (chunk: string) => {
					rawData += chunk

					if (rawData.length > this.MAX_RESPONSE_SIZE) {
						response.destroy(new Error('Response is too large'))
					}
				})
				response.on('error', reject)
				response.on('aborted', () => reject(new Error('Response was aborted')))
				response.on('end', () => resolve(rawData))
			})

			request.on('timeout', () => request.destroy(new Error('Request timeout')))
			request.on('error', reject)
		})
	}

	/**
	 * Проверить наличие всех путей для работы программы. `config.paths`.
	 * В случае неудачи выводит уведомление.
	 */
	async hasAllPaths(): Promise<boolean> {
		if (!await this.files.initial.exists()) {
			void this.dialogs.error(this.texts.initialNotFound)

			return false
		}

		if (!await this.dirs.classes.exists()) {
			void this.dialogs.error(this.texts.classesNotFound)

			return false
		}

		if (!await this.dirs.dlc.exists()) {
			void this.dialogs.error(this.texts.dlcFolderNotFound)

			return false
		}

		return true
	}
}