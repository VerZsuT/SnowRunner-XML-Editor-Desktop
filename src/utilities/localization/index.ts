import { Lang } from '@modules/data/config/enums'
import { computed } from 'vue'
import type { ITextsToLocalize, LocalizedTexts } from './types'

/** Локализация. */
export class Localization<
	Value = string,
	ToLocalize extends ITextsToLocalize<Value> = ITextsToLocalize<Value>
> {
	readonly value: ToLocalize
	protected readonly localized = {} satisfies Partial<Record<Lang, LocalizedTexts<typeof this.value>>>

	constructor(obj: ToLocalize)
	constructor(obj: Localization<Value, ToLocalize>)
	constructor(obj: Localization<Value, ToLocalize> | ToLocalize)
	constructor(obj: Localization<Value, ToLocalize> | ToLocalize) {
		this.value = obj instanceof Localization ? obj.value : obj
	}

	/**
	 * Получить локализованный объект.
	 * @param config Конфиг.
	 * @returns Локализованный объект.
	 */
	get(config: { lang: Lang }): LocalizedTexts<ToLocalize> {
		if (config.lang in this.localized) {
			return this.localized[config.lang]
		}

		const out = {} as any

		for (const key in this.value) {
			Object.defineProperty(out, key, {
				get: () => this.value[key].get(config),
				enumerable: true
			})
		}

		return this.localized[config.lang] = out
	}
}

/** Базовая локализация. */
export class LocalizationStrings<T = string> {
	/** Содержимое локализации. */
	protected readonly obj: { [key in Lang]?: T } = {}

	/**
	 * Получить локализованное значение.
	 * @param config Конфигурация.
	 * @returns Локализованное значение.
	 */
	get(config: { lang: Lang }) {
		return computed(() => this.obj[config.lang] ?? this.obj[Lang.en]!).value
	}

	/**
	 * Установить значение для RU.
	 * @param value Значение.
	 */
	ru(value: T) {
		this.obj[Lang.ru] = value

		return this
	}

	/**
	 * Установить значение для EN.
	 * @param value Значение.
	 */
	en(value: T) {
		this.obj[Lang.en] = value

		return this
	}

	/**
	 * Установить значение для DE.
	 * @param value Значение.
	 */
	de(value: T) {
		this.obj[Lang.de] = value

		return this
	}

	/**
	 * Установить значение для CH.
	 * @param value Значение.
	 */
	ch(value: T) {
		this.obj[Lang.ch] = value

		return this
	}
}
