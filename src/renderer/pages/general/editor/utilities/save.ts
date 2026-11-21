/** Слушатель сохранения. */
export type SaveEventListener = () => void | Promise<void>

class SaveUtils {
	private readonly listeners = new Set<SaveEventListener>()

	/**
	 * Добавить слушателя сохранения.
	 * @param listener Слушатель.
	 * @returns Функция отписки.
	 */
	onSave(listener: SaveEventListener) {
		this.listeners.add(listener)

		return () => {
			this.listeners.delete(listener)
		}
	}

	async emitSave() {
		return Promise.all([...this.listeners].map(async listener => await listener()))
	}
}

export const saveUtils = new SaveUtils()
