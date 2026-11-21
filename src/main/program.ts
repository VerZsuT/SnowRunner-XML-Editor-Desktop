import { loadLocalization } from '@localization/main'
import type { IMainMods } from '@modules/data/modifications/types'
import { fsService } from '@modules/files/service'
import { Page, ProgramWindow } from '@modules/windows/enums'
import type { IResettable } from '@src/types'
import { di, inject } from '@utilities/di/container'
import { APP_TOKEN, CHECKS_TOKEN, CONFIG_MANAGER_TOKEN, CONFIG_TOKEN, DLC_TOKEN, EDITED_TOKEN, FAVORITES_TOKEN, GAME_TEXTS_TOKEN, LOADING_TOKEN, MODS_TOKEN, QUIT_PARAMS_TOKEN, SIZES_TOKEN, WINDOWS_TOKEN } from '@utilities/di/main/tokens'
import { app } from 'electron'
import { BaseProgram } from './base-program'
import { MAIN_LOCALIZATION } from './localization'

import '@modules/epf/main'
import '@modules/updates/main'

/** Программа. */
export class Program extends BaseProgram {
	/** Модификации игры. */
	@inject(MODS_TOKEN)
	private readonly mods!: IMainMods

	/** Локализация. */
	private readonly texts = loadLocalization(MAIN_LOCALIZATION)

	protected async afterInit() {
		await app.whenReady()
		await this.run()
	}

	/** Запуск программы. */
	private async run(): Promise<void> {
		const checks = di.resolve(CHECKS_TOKEN)
		const loading = di.resolve(LOADING_TOKEN)
		const windows = di.resolve(WINDOWS_TOKEN)
		const config = di.resolve(CONFIG_TOKEN)
		const getGeneralWindow = () => {
			const window = windows.generalWindow

			if (!window) {
				throw new Error('General window is not available')
			}

			return window
		}

		try {
			loading.init(undefined, 6, true)
			await windows.openWindow(ProgramWindow.general)
			await loading.runRequiredStage(this.texts.checkAdminPrivileges, checks.hasAdminPrivileges.bind(checks))

			if (!await loading.runStage(this.texts.checkInitial, () => !!config.initialPath)) {
				getGeneralWindow().route(Page.setup)

				return loading.hideLoading()
			}

			await loading.runStage(this.texts.unpack, checks.checkInitialChanges.bind(checks))

			if (!await loading.runStage(this.texts.checkFiles, checks.hasAllPaths.bind(checks))) {
				const app: IResettable = di.resolve(APP_TOKEN)

				return app.reset()
			}

			const dlc = di.resolve(DLC_TOKEN)
			const gameTexts = di.resolve(GAME_TEXTS_TOKEN)

			await loading.runRequiredStage(this.texts.loadGameTexts, gameTexts.initFromInitial.bind(gameTexts))
			await loading.runRequiredStage(this.texts.loadDlc, dlc.init.bind(dlc))
			await loading.runRequiredStage(this.texts.loadMods, this.mods.procMods.bind(this.mods))
			getGeneralWindow().route(Page.lists)
		} catch (error: any) {
			if (!loading.state.hasError) {
				loading.errorOnStage(error)
			}

			loading.hideLoading()

			throw error
		}
	}

	protected onMultipleInstance() {
		app.exit()
		process.exit(102)
	}

	protected async beforeQuit() {
		fsService.closeAll()

		const quitParams = di.resolve(QUIT_PARAMS_TOKEN)

		if (!quitParams.saveJSONs) {
			return
		}

		const edited = di.resolve(EDITED_TOKEN)
		const favorites = di.resolve(FAVORITES_TOKEN)
		const sizes = di.resolve(SIZES_TOKEN)
		const configManager = di.resolve(CONFIG_MANAGER_TOKEN)

		const results = await Promise.allSettled([
			configManager.save(),
			edited.save(),
			sizes.save(),
			favorites.save(),
			this.mods.save()
		])

		for (const result of results) {
			if (result.status === 'rejected') {
				console.error(result.reason)
			}
		}
	}

	protected onAllWindowsClosed() {
		fsService.closeAll()
		app.quit()
	}

	protected onError(error: Error) {
		console.error(error.stack || error)
	}
}
