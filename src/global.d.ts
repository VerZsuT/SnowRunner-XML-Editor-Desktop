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
}
