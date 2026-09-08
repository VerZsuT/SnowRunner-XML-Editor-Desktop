/** Работа с бэкапом initial.pak. [main] */
export type IMainInitialBackup = IPublicInitialBackup

/** Работа с бэкапом initial.pak. [renderer] */
export type IRendererInitialBackup = IPublicInitialBackup

/** Работа с бэкапом initial.pak. [public] */
export interface IPublicInitialBackup {
	/** Сохранить бэкап. */
	save(): Promise<void>

	/** Заменить оригинальный на сохранённый. */
	recoverFromIt(): Promise<void>
}
