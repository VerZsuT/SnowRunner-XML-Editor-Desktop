import { localeToLang } from '@modules/data/config/enums'
import { shell } from 'electron'
import { userInfo } from 'node:os'
import type { IMainSystem } from '../types'

/** Система. [main] */
export class System implements IMainSystem {
	getUserLang() {
		return localeToLang(Intl.DateTimeFormat().resolvedOptions().locale)
	}

	userInfo(...args: Parameters<typeof userInfo>) {
		return userInfo(...args)
	}

	openLink(...args: Parameters<typeof shell.openExternal>) {
		return shell.openExternal(...args)
	}

	openFile(...args: Parameters<typeof shell.openExternal>) {
		return shell.openExternal(...args)
	}

	openPath(...args: Parameters<typeof shell.openPath>) {
		return shell.openPath(...args)
	}
}
