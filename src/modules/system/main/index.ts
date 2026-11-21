import { localeToLang } from '@modules/data/config/enums'
import type { IMainMessages } from '@modules/messages/types'
import { inject } from '@utilities/di/container'
import { MESSAGES_TOKEN } from '@utilities/di/main/tokens'
import { shell } from 'electron'
import { userInfo } from 'node:os'
import type { IMainSystem } from '../types'

/** Система. [main] */
export class System implements IMainSystem {
	/** Сообщения. */
	@inject(MESSAGES_TOKEN)
	private readonly messages!: IMainMessages

	getUserLang() {
		return localeToLang(Intl.DateTimeFormat().resolvedOptions().locale)
	}

	userInfo(...args: Parameters<typeof userInfo>) {
		return userInfo(...args)
	}

	openLink(...args: Parameters<typeof shell.openExternal>) {
		const [url, options] = args

		try {
			const protocol = new URL(String(url)).protocol

			if (protocol !== 'https:' && protocol !== 'http:') {
				return Promise.reject(new Error(`Unsupported external URL protocol '${protocol}'`))
			}
		} catch (error: any) {
			return Promise.reject(new Error(`Invalid external URL '${url}'`, { cause: error }))
		}

		return shell.openExternal(String(url), options)
	}

	async openFile(path: string) {
		const error = await shell.openPath(path)

		if (error) {
			this.messages.error(`Cannot open file '${path}': ${error}`)
		}
	}

	openPath(...args: Parameters<typeof shell.openPath>) {
		return shell.openPath(...args)
	}
}
