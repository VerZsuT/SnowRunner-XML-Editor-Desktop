/** Модуль стилей. */
declare module '*.scss' {
	const classes: Record<string, string>
	export default classes
}

/** Окружение Vite. */
interface ImportMetaEnv {
	/** Признак dev-режима. */
	readonly DEV: boolean
}

interface ImportMeta {
	readonly env: ImportMetaEnv

	/** Импорт файлов по маске: нужен для картинок автомобилей. */
	glob<T = unknown>(
		pattern: string | string[],
		options?: { eager?: boolean; query?: string; import?: string }
	): Record<string, T>
}
