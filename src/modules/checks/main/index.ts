import { loadLocalization } from '@localization/main'
import type { IMainDialogs } from '@modules/dialogs/types'
import { ErrorText } from '@modules/errors/enums'
import { ProgramError } from '@modules/errors/main'
import type { IDirs, IFiles } from '@modules/files/main'
import { di, inject } from '@utilities/di/container'
import { ARCHIVER_TOKEN, BACKUP_TOKEN, CONFIG_TOKEN, DIALOGS_TOKEN, DIRS_TOKEN, FILES_TOKEN, PATHS_TOKEN, SIZES_TOKEN } from '@utilities/di/main/tokens'
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
			}).then(app.quit)

			return false
		}
	}

	async checkInitialChanges() {
		const sizes = di.resolve(SIZES_TOKEN)
		const initial = this.files.initial

		const hasInitial = await initial.exists()
		const hasContent = await this.dirs.mainTemp.dir(this.MEDIA_FOLDER).exists()
		const withoutChanges = await initial.getSize() === sizes.initial

		if (!hasInitial || (hasContent && withoutChanges)) {
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
		const { promise, resolve, reject } = Promise.withResolvers<string | undefined>()

		if (!config.checkUpdates && !whateverCheck) {
			return
		}

		dns.resolve(this.GITHUB_URL, error => {
			if (error) {
				return reject(new ProgramError(ErrorText.gitHubConnectError, error))
			}

			const paths = di.resolve(PATHS_TOKEN)

			get(paths.publicInfo, response => {
				let rawData = ''

				response
					.setEncoding('utf8')
					.on('data', chunk => rawData += chunk)
					.on('end', async () => {
						const data: IPubFile = JSON.parse(rawData)
						const version = config.version
						const hasNewVersion = version < data.latestVersion
						const isBetaNewVersion = version.includes('-beta') && version.split('-beta')[0] === data.latestVersion

						resolve(hasNewVersion || isBetaNewVersion
							? data.latestVersion
							: undefined
						)
					})
			}).on('error', error => {
				reject(new ProgramError(ErrorText.gitHubConnectError, error))
			})
		})

		return promise
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
