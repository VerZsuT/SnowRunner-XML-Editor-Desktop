import type { Config, PathsDto, SwitchModeDto } from './bindings'
import { commands } from './bindings'
import { call } from './invoke'

/** Конфигурация программы из Rust-ядра. */
export async function loadConfig(): Promise<Config> {
	return call(commands.config())
}

/** Сохраняет конфигурацию; возвращает её после проверки ядром. */
export async function saveConfig(config: Config): Promise<Config> {
	return call(commands.saveConfig(config))
}

/** Распакованы ли файлы игры: если нет, нужна первоначальная настройка. */
export async function gameDataReady(): Promise<boolean> {
	return call(commands.gameDataReady())
}

/** Пути программы и каталоги данных. */
export async function loadPaths(): Promise<PathsDto> {
	return call(commands.paths())
}

/** Переключает режим хранения данных; применяется после перезапуска. */
export async function switchDataMode(portable: boolean): Promise<SwitchModeDto> {
	return call(commands.switchDataMode(portable))
}

/** Перезапускает программу. */
export async function restartApp(): Promise<void> {
	await call(commands.restartApp())
}
