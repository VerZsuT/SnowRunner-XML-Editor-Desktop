import { STORAGE_AUTOSAVE_DELAY } from '@utilities/storage'

/** Автосохранение. */
export interface IAutoSaver {
	/** Запланировать сохранение. */
	schedule(): void

	/** Отменить запланированное сохранение. */
	cancel(): void

	/** Сохранить немедленно. */
	flush(): Promise<void>
}

/**
 * Создать автосохранение с задержкой.
 * Ошибки записи логируются и не прерывают работу программы.
 * @param save Функция сохранения.
 * @param delay Задержка, мс.
 * @returns Автосохранение.
 */
export function createAutoSaver(save: () => Promise<unknown> | unknown, delay = STORAGE_AUTOSAVE_DELAY): IAutoSaver {
	let timer: NodeJS.Timeout | undefined
	let running = false
	let queued = false

	const flush = async (): Promise<void> => {
		if (running) {
			queued = true

			return
		}

		running = true

		try {
			await save()
		} catch (error: unknown) {
			console.error('[autosave] cannot save data', error)
		} finally {
			running = false

			if (queued) {
				queued = false
				schedule()
			}
		}
	}

	const schedule = () => {
		if (timer) {
			clearTimeout(timer)
		}

		timer = setTimeout(() => {
			timer = undefined
			void flush()
		}, delay)

		// Таймер не должен держать процесс при выходе.
		timer.unref?.()
	}

	return {
		schedule,
		cancel() {
			if (timer) {
				clearTimeout(timer)
			}

			timer = undefined
		},
		flush
	}
}
