import { initMain, mainMethod, mainObjectField } from '@bridge/renderer'
import type { GameTexts as GameTextsMain } from './main'
import type { IGameTexts, IRendererGameTexts } from './types'

/** Работа с игровой локализацией. [renderer] */
@initMain()
export class GameTexts implements IRendererGameTexts {
	/** Объект текстов. */
	@mainObjectField()
	private readonly object!: IGameTexts

	/** Обработать файл с переводом из `initial.pak` (текущий выбранный язык в программе). */
	@mainMethod()
	initFromInitial!: GameTextsMain['initFromInitial']

	/** Обработать файл с переводом из `.pak` файлов модов (текущий выбранный язык в программе). */
	@mainMethod()
	initFromMods!: GameTextsMain['initFromMods']

	/**
	* Возвращает игровой перевод по ключу.
	* @param key Ключ.
	* @param modID - id модификации.
	* @returns Игровой перевод.
	*/
	get(key: string | undefined, modID?: string): string | undefined {
		let value: string | undefined

		if (!key) {
			return
		}

		const { mods, main } = this.object

		if (modID && modID in mods && key in mods[modID]) {
			value = mods[modID][key]
		} else if (key in main) {
			value = main[key]
		}

		return value
	}
}
