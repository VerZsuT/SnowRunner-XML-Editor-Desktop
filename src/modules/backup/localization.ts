import { Localization, LocalizationStrings } from '@localization'

/** Тексты работы с бэкапом. */
export const BACKUP_LOCALIZATION = new Localization({
	/** Бэкап сохранён успешно. */
	successBackupSave: new LocalizationStrings()
		.ru('Бэкап initial.pak успешно сохранён.')
		.en('The initial.pak backup was saved successfully.')
		.de('Die Initiale.pak backup wurde erfolgreich gespeichert.')
		.ch('initial.pak备份已成功保存。'),

	/** `initial.pak` восстановлен успешно. */
	successInitialRestore: new LocalizationStrings()
		.ru('initial.pak был успешно восстановлен.')
		.en('initial.pak was successfully restored.')
		.de('initial.pak wurde erfolgreich restauriert.')
		.ch('initial.pak已被成功恢复。')
})
