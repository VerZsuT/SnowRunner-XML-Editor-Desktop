/**
 * Конфигурация интерфейса.
 *
 * Ядро хранит `jsons/config.json`, а локализация и часть компонентов читают
 * конфигурацию из DI: при старте регистрируется прочитанное значение, а экран
 * настроек обновляет его через {@link applyConfig}.
 */

import { BuildType, Lang, strToLang } from '@modules/data/config/enums'
import type { IConfig } from '@modules/data/config/types'
import type { Config as ConfigDto } from './api/bindings'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { proxy } from 'valtio'

/** Конфигурация по умолчанию. */
export const defaultConfig: IConfig = {
	version: '',
	lang: Lang.ru,
	buildType: BuildType.dev,
	initialPath: null,
	checkUpdates: true,
	useMods: true,
	openWhatsNew: false,
	advancedMode: false,
	optimizeUnpack: true
}

/**
 * Регистрирует конфигурацию интерфейса.
 * @param initial Значения поверх конфигурации по умолчанию.
 * @returns Зарегистрированная конфигурация.
 */
export function registerConfig(initial: Partial<IConfig> = {}): IConfig {
	const config = proxy({ ...defaultConfig, ...initial })

	di.register(CONFIG_TOKEN, config)

	return config
}

/**
 * Преобразует DTO конфигурации ядра в конфигурацию интерфейса.
 * @param dto Конфигурация из Rust-ядра.
 * @returns Значения для регистрации.
 */
export function fromConfigDto(dto: ConfigDto): Partial<IConfig> {
	return {
		version: dto.version ?? '',
		lang: strToLang(dto.lang) ?? defaultConfig.lang,
		buildType: dto.buildType === BuildType.dev ? BuildType.dev : BuildType.prod,
		initialPath: dto.initialPath ?? null,
		checkUpdates: dto.checkUpdates ?? true,
		useMods: dto.useMods ?? true,
		openWhatsNew: dto.openWhatsNew ?? false,
		advancedMode: dto.advancedMode ?? false,
		optimizeUnpack: dto.optimizeUnpack ?? true
	}
}

/**
 * Применяет значения к зарегистрированной конфигурации.
 * @param values Изменённые значения.
 * @returns Обновлённая конфигурация.
 */
export function applyConfig(values: Partial<IConfig>): IConfig {
	const config = ensureConfig()

	Object.assign(config, values)

	return config
}

/**
 * Записать значение в конфигурацию.
 *
 * Мутация вынесена из компонентов: React Compiler запрещает изменять
 * захваченные во время рендера значения после его завершения.
 * @param key Ключ конфигурации.
 * @param value Новое значение.
 */
export function updateConfig<Key extends keyof IConfig>(key: Key, value: IConfig[Key]): void {
	di.resolve(CONFIG_TOKEN)[key] = value
}

/** Возвращает конфигурацию, регистрируя её при необходимости. */
export function ensureConfig(): IConfig {
	try {
		return di.resolve(CONFIG_TOKEN)
	} catch {
		return registerConfig()
	}
}
