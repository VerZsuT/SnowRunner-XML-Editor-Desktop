import { commands } from './bindings'
import { call } from './invoke'

/** Открывает ссылку в браузере по умолчанию. */
export async function openUrl(url: string): Promise<void> {
	await call(commands.openUrl(url))
}

/** Открывает файл или каталог программой по умолчанию. */
export async function openPath(path: string): Promise<void> {
	await call(commands.openPath(path))
}


/** Закрывает программу. */
export async function quitApp(): Promise<void> {
	await call(commands.quitApp())
}

/** Сбрасывает программу к первоначальному состоянию и перезапускает её. */
export async function resetToDefaults(): Promise<void> {
	await call(commands.resetToDefaults())
}

/** Запускает деинсталлятор программы и закрывает её. */
export async function uninstallApp(): Promise<void> {
	await call(commands.uninstallApp())
}
