import { loadLocalization } from '@localization/main'
import type { Config, IConfig } from '@modules/data/config/main'
import type { Mods } from '@modules/data/modifications/main'
import { Page, ProgramWindow } from '@modules/windows/enums'
import { di, inject } from '@utilities/di/container'
import { APP_TOKEN, CHECKS_TOKEN, CONFIG_TOKEN, DLC_TOKEN, EDITED_TOKEN, FAVORITES_TOKEN, GAME_TEXTS_TOKEN, LOADING_TOKEN, MODS_TOKEN, QUIT_PARAMS_TOKEN, SIZES_TOKEN, WINDOWS_TOKEN } from '@utilities/di/main/tokens'
import { app } from 'electron'
import { BaseProgram } from './base-program'
import { MAIN_LOCALIZATION } from './localization'

import '@modules/epf/main'
import '@modules/updates/main'

/** Программа. */
export class Program extends BaseProgram {
	@inject(CONFIG_TOKEN)
	private readonly config!: Config & IConfig

	@inject(MODS_TOKEN)
	private readonly mods!: Mods

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

		loading.init(undefined, 6, true)
		await windows.openWindow(ProgramWindow.general)
		await loading.runRequiredStage(this.texts.checkAdminPrivileges, checks.hasAdminPrivileges.bind(checks))

		if (!await loading.runStage(this.texts.checkInitial, () => !!this.config.initialPath)) {
			windows.generalWindow!.route(Page.setup)

			return loading.hideLoading()
		}

		await loading.runStage(this.texts.unpack, checks.checkInitialChanges.bind(checks))

		if (!await loading.runStage(this.texts.checkFiles, checks.hasAllPaths.bind(checks))) {
			const app = di.resolve(APP_TOKEN)

			return app.resetToDefaults()
		}

		const dlc = di.resolve(DLC_TOKEN)
		const gameTexts = di.resolve(GAME_TEXTS_TOKEN)

		await loading.runRequiredStage(this.texts.loadGameTexts, gameTexts.initFromInitial.bind(gameTexts))
		await loading.runRequiredStage(this.texts.loadDlc, dlc.init.bind(dlc))
		await loading.runRequiredStage(this.texts.loadMods, this.mods.procMods.bind(this.mods))
		windows.generalWindow!.route(Page.lists)
	}

	protected onMultipleInstance() {
		app.exit()
		process.exit(102)
	}

	protected async beforeQuit() {
		const quitParams = di.resolve(QUIT_PARAMS_TOKEN)

		if (!quitParams.saveJSONs) {
			return
		}

		const edited = di.resolve(EDITED_TOKEN)
		const favorites = di.resolve(FAVORITES_TOKEN)
		const sizes = di.resolve(SIZES_TOKEN)

		await Promise.all([
			this.config.save(),
			edited.save(),
			sizes.save(),
			favorites.save(),
			this.mods.save()
		])
	}

	protected onAllWindowsClosed() {
		app.quit()
	}

	protected onError(error: Error) {
		console.error(error.stack || error)
	}
}
