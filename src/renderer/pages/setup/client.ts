import { backupArchive, restoreBackup, unpackInitial, verifyArchive } from '@renderer/api/archive'
import type { Config, PathsDto } from '@renderer/api/bindings'
import { loadConfig, loadPaths, saveConfig } from '@renderer/api/settings'

/** Клиент экрана настройки: подменяется в тестах. */
export interface SetupClient {
	/** Пути программы. */
	paths(): Promise<PathsDto>

	/** Текущая конфигурация. */
	config(): Promise<Config>

	/** Сохраняет конфигурацию. */
	saveConfig(config: Config): Promise<Config>

	/** Распаковывает архив; возвращает число файлов. */
	unpack(archivePath: string): Promise<number>

	/** Делает бэкап архива; возвращает путь копии. */
	backup(archivePath: string): Promise<string>

	/** Проверяет архив; возвращает число записей. */
	verify(archivePath: string): Promise<number>

	/** Восстанавливает архив из бэкапа. */
	restore(archivePath: string): Promise<void>
}

/** Клиент команд ядра. */
export const setupClient: SetupClient = {
	paths: loadPaths,
	config: loadConfig,
	saveConfig,
	unpack: unpackInitial,
	backup: backupArchive,
	verify: verifyArchive,
	restore: restoreBackup
}
