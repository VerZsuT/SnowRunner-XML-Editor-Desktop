import type { UpdateProgress } from './bindings'
import { commands, events } from './bindings'
import { call } from './invoke'
import { loadConfig, saveConfig } from './settings'

export type { UpdateProgress }

/** Проверяет наличие новой версии; `force` игнорирует настройку проверки. */
export async function checkUpdate(force = false): Promise<string | null> {
	return call(commands.checkUpdate(force))
}

/** Загружает установщик или портативный архив; возвращает путь к файлу. */
export async function downloadUpdate(version: string, portable: boolean): Promise<string> {
	return call(commands.downloadUpdate(version, portable))
}

/** Запускает загруженное обновление; программа закрывается. */
export async function installUpdate(path: string, portable: boolean): Promise<void> {
	await call(commands.runInstaller(path, portable))
}

/** Подписывает на прогресс загрузки обновления. */
export function onUpdateProgress(handler: (progress: UpdateProgress) => void): Promise<() => void> {
	return events.updateProgress.listen(event => handler(event.payload))
}

/** Выключает автоматическую проверку обновлений и сохраняет конфигурацию. */
export async function disableUpdateChecks(): Promise<void> {
	const config = await loadConfig()

	await saveConfig({ ...config, checkUpdates: false })
}
