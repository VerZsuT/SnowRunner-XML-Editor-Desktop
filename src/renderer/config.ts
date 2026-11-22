/**
 * Конфигурация интерфейса.
 *
 * Ядро хранит `jsons/config.json`, а снимок конфигурации живёт в zustand:
 * при старте регистрируется прочитанное значение, экран настроек обновляет его
 * через {@link applyConfig}, а язык интерфейса применяется к текстам сразу
 * после чтения конфигурации.
 */

import { Lang, setTexts } from '@localization'
import { create } from 'zustand'
import type { Config as ConfigDto } from './api/bindings'

/** Тип билда программы. */
export enum BuildType {
	/** Для разработки. */
	dev = 'dev',

	/** Для конечного пользователя. */
	prod = 'prod'
}

/** Конфигурация интерфейса. */
export interface IConfig {
	/** Версия программы. */
	version: string

	/** Текущий язык перевода программы. */
	lang: Lang

	/** Тип билда, при dev доступны некоторые функции для отладки. */
	buildType: BuildType

	/** Путь к `initial.pak`. */
	initialPath: string | null

	/** Проверять обновления. */
	checkUpdates: boolean

	/** Использовать моды. */
	useMods: boolean

	/** Показывать "Что нового". */
	openWhatsNew: boolean

	/** Расширенный режим. */
	advancedMode: boolean

	/** Оптимизировать распаковку. */
	optimizeUnpack: boolean
}

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

/** Состояние конфигурации. */
interface ConfigState {
	/** Текущая конфигурация. */
	config: IConfig
}

const useConfigStore = create<ConfigState>()(() => ({ config: { ...defaultConfig } }))

/**
 * Преобразует строку в `Lang`.
 * _Если преобразование невозможно, возвращает `undefined`_
 * @param str Строка.
 * @returns Lang.
 */
export function strToLang(str?: string | null): Lang | undefined {
	if (!str) {
		return
	}

	const normalized = str.toUpperCase()

	for (const value of Object.values(Lang)) {
		if (normalized === value) {
			return value
		}
	}
}

/**
 * Регистрирует конфигурацию интерфейса.
 * @param initial Значения поверх конфигурации по умолчанию.
 * @returns Зарегистрированная конфигурация.
 */
export function registerConfig(initial: Partial<IConfig> = {}): IConfig {
	const config = { ...defaultConfig, ...initial }

	useConfigStore.setState({ config })
	setTexts(config.lang)

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
	const config = { ...useConfigStore.getState().config, ...values }

	useConfigStore.setState({ config })

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
	applyConfig({ [key]: value } as Partial<IConfig>)
}

/** Возвращает конфигурацию, регистрируя её при необходимости. */
export function ensureConfig(): IConfig {
	return useConfigStore.getState().config
}

/** Снимок конфигурации для чтения в рендере. */
export function useConfig(): IConfig {
	return useConfigStore(state => state.config)
}
