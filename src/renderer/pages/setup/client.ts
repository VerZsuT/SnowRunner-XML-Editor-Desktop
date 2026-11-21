import { backupArchive, restoreBackup, unpackInitial, updateArchive, verifyArchive } from '@renderer/api/archive'
import type { Config, ModEntry, PathsDto } from '@renderer/api/bindings'
import { addMod, listMods, removeMod, syncMods } from '@renderer/api/mods'
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

	/** Обновляет архив; возвращает число записей. */
	update(archivePath: string, modName: string | null): Promise<number>

	/** Проверяет архив; возвращает число записей. */
	verify(archivePath: string): Promise<number>

	/** Восстанавливает архив из бэкапа. */
	restore(archivePath: string): Promise<void>

	/** Установленные моды. */
	mods(): Promise<ModEntry[]>

	/** Добавляет `.pak` моду; возвращает новый список. */
	addMod(path: string): Promise<ModEntry[]>

	/** Убирает мод из списка; возвращает новый список. */
	removeMod(name: string): Promise<ModEntry[]>

	/** Пересобирает распакованные файлы модов. */
	syncMods(): Promise<ModEntry[]>
}

/** Клиент команд ядра. */
export const setupClient: SetupClient = {
	paths: loadPaths,
	config: loadConfig,
	saveConfig,
	unpack: unpackInitial,
	backup: backupArchive,
	update: updateArchive,
	verify: verifyArchive,
	restore: restoreBackup,
	mods: listMods,
	addMod,
	removeMod,
	syncMods
}
