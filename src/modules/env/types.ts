/** Переменные среды. */
export interface IEnv {
	/** Выключить оптимизацию распаковки. */
	disableUnpackOptimizer: boolean

	/** В любом случае показать devtools. */
	forceDevTools: boolean

	/** Показывать WinRAR окно. */
	debugArchiver: boolean

	/** Показывать предупреждения безопасности Electron. */
	showSecurityWarnings: boolean

	/** Сборка в режиме разработки. */
	isDev: boolean

	/** Путь к initial.pak. */
	initialPath: string | undefined

	/** Язык системы. */
	lang: string | undefined

	/** Домашняя папка. */
	home: string | undefined
}
