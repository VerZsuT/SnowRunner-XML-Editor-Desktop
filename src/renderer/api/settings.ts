import type { Config, PathsDto } from './bindings'
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

/** Пути программы и каталоги данных. */
export async function loadPaths(): Promise<PathsDto> {
	return call(commands.paths())
}
