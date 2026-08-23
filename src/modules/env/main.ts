class Env {
	/** Выключить оптимизацию распаковки. */
	get disableUnpackOptimizer(): boolean {
		return process.env.DISABLE_UNPACK_OPTIMIZER === 'true'
	}

	/** В любом случае показать devtools. */
	get forceDevTools(): boolean {
		return process.env.FORCE_DEVTOOLS === 'true'
	}

	/** Показывать WinRAR окно. */
	get debugArchiver(): boolean {
		return process.env.DEBUG_ARCHIVER === 'true'
	}

	/** Показывать предупреждения безопасности Electron. */
	get showSecurityWarnings(): boolean {
		return process.env.ELECTRON_DISABLE_SECURITY_WARNINGS === 'false'
	}
	/** Показывать предупреждения безопасности Electron. */
	set showSecurityWarnings(value: boolean) {
		process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = (!value).toString()
	}

	/** Сборка в режиме разработки. */
	get isDev(): boolean {
		return process.env.NODE_ENV === 'development'
	}

	/** Путь к initial.pak. */
	get initialPath(): string | undefined {
		return process.env.DEV_INITIAL_PATH
	}

	/** Язык системы. */
	get lang(): string | undefined {
		return process.env.DEV_LANG
	}

	/** Домашняя папка. */
	get home(): string | undefined {
		return process.env.HOME
	}
}

export default new Env()
