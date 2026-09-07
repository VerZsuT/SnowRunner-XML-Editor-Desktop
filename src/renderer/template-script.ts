import { di } from '@utilities/di/container'
import { APP_TOKEN, CONFIG_TOKEN, MESSAGES_TOKEN } from '@utilities/di/renderer/tokens'

/** Шаблон. */
export class Template {
	init() {
		const messages = di.resolve(MESSAGES_TOKEN)

		this.changeTitle()
		this.handleKeys()
		messages.handleMessages()
	}

	/** Изменить заголовок. */
	changeTitle() {
		const config = di.resolve(CONFIG_TOKEN)

		document.title = `SnowRunner XML editor v${config.version}`
	}

	/** Отследить нажатие горячих клавиш. */
	handleKeys() {
		document.addEventListener('keydown', event => {
			const keyIs = (code: string) => event.code === `Key${code}`
			const shift = event.shiftKey
			const ctrl = event.ctrlKey

			if (!ctrl) {
				return
			}

			const app = di.resolve(APP_TOKEN)

			if (keyIs('S')) {
				// Быстрое сохранение.
				document.querySelector<HTMLInputElement>('#save')?.click()
			} else if (keyIs('Q')) {
				// Быстрое закрытие.
				app.quit()
			} else if (keyIs('I') && shift && ctrl) {
				// Открыть `devtools`.
				app.toggleDevTools()
			}
		})
	}
}
