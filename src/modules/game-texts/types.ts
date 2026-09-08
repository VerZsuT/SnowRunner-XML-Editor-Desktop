/** Игровые тексты. */
export interface IGameTexts {
	/** Тексты самой игры. */
	main: ITranslation

	/** Тексты модификаций. */
	mods: {
		[modID: string]: ITranslation
	}
}

/** Перевод. */
export interface ITranslation {
	[key: string]: string
}


/** Работа с игровой локализацией. [public] */
export interface IPublicGameTexts {
	/** Тексты. */
	object: IGameTexts

	/** Обработать файл с переводом из `initial.pak` (текущий выбранный язык в программе). */
	initFromInitial(): Promise<void>

	/** Обработать файл с переводом из `.pak` файлов модов (текущий выбранный язык в программе). */
	initFromMods(): Promise<void>
}

/** Работа с игровой локализацией. [main] */
export type IMainGameTexts = IPublicGameTexts

/** Работа с игровой локализацией. [renderer] */
export interface IRendererGameTexts extends Omit<IPublicGameTexts, 'object'> {
	/**
	* Возвращает игровой перевод по ключу.
	* @param key Ключ.
	* @param modID - id модификации.
	* @returns Игровой перевод.
	*/
	get(key: string | undefined, modID?: string): string | undefined
}
