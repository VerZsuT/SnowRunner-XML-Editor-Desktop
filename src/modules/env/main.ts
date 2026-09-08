import type { IEnv } from './types'

/** Переменные среды. */
export class Env implements IEnv {
	get disableUnpackOptimizer(): boolean {
		return process.env.DISABLE_UNPACK_OPTIMIZER === 'true'
	}

	get forceDevTools(): boolean {
		return process.env.FORCE_DEVTOOLS === 'true'
	}

	get debugArchiver(): boolean {
		return process.env.DEBUG_ARCHIVER === 'true'
	}

	get showSecurityWarnings(): boolean {
		return process.env.ELECTRON_DISABLE_SECURITY_WARNINGS === 'false'
	}
	set showSecurityWarnings(value: boolean) {
		process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = (!value).toString()
	}

	get isDev(): boolean {
		return process.env.NODE_ENV === 'development'
	}

	get initialPath(): string | undefined {
		return process.env.DEV_INITIAL_PATH
	}

	get lang(): string | undefined {
		return process.env.DEV_LANG
	}

	get home(): string | undefined {
		return process.env.HOME
	}
}
