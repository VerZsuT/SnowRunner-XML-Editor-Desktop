import { publishMain } from '@utilities/bridge/main/publisher'
import { registerDI } from '@utilities/di/main/registration'
import { app, dialog } from 'electron'

void bootstrap()

/** Запустить программу. */
async function bootstrap() {
	try {
		await registerDI()
		await publishMain()

		const { Program } = await import('./program')

		await new Program().init()
	} catch (error: unknown) {
		await reportFatalError(error)
	}
}

/**
 * Сообщить о критической ошибке запуска.
 * @param error Ошибка.
 */
async function reportFatalError(error: unknown) {
	const message = error instanceof Error
		? error.stack ?? error.message
		: String(error)

	console.error(error)

	try {
		await app.whenReady()

		dialog.showErrorBox(
			'SnowRunner XML Editor',
			`The application cannot continue.\n\n${message}`
		)
	} catch (dialogError: unknown) {
		console.error(dialogError)
	} finally {
		app.exit(1)
	}
}
