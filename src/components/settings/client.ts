import type { Config, PathsDto, SwitchModeDto } from '@/api/bindings'
import { loadConfig, loadPaths, restartApp, saveConfig, switchDataMode } from '@/api/settings'

/** Клиент окна настроек: подменяется в тестах. */
export interface SettingsClient {
	/** Текущая конфигурация. */
	config(): Promise<Config>

	/** Сохраняет конфигурацию. */
	saveConfig(config: Config): Promise<Config>

	/** Пути программы: нужны для переключателя портативного режима. */
	paths(): Promise<PathsDto>

	/** Переключает режим хранения данных. */
	switchMode(portable: boolean): Promise<SwitchModeDto>

	/** Перезапускает программу. */
	restart(): Promise<void>

	/** Перезагружает интерфейс: нужен после смены языка. */
	reload(): void
}

/** Клиент команд ядра. */
export const settingsClient: SettingsClient = {
	config: loadConfig,
	saveConfig,
	paths: loadPaths,
	switchMode: switchDataMode,
	restart: restartApp,
	reload: () => window.location.reload()
}
