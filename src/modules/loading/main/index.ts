import { makeReactive } from '@bridge/main'
import { loadLocalization } from '@localization/main'
import { LOADING_LOCALIZATION } from '../localization'
import type { ILoadingState, IMainLoading, StageAction } from '../types'

/** Работа с загрузкой программы. [main] */
export class Loading implements IMainLoading {
	private readonly texts = loadLocalization(LOADING_LOCALIZATION)

	/** Состояние по умолчанию. */
	private get default(): ILoadingState {
		return {
			isLoading: false,
			hasError: false,
			error: '',
			text: 'Loading',
			stagesCount: 1,
			completedCount: 0
		}
	}

	accessor state = this.default

	/** Завершать ли автоматически. */
	private autoEnd = false

	constructor() {
		makeReactive(this, 'Loading', 'state')
	}

	init(text?: string, stagesCount?: number, autoEnd = false) {
		if (this.state.isLoading) {
			return
		}

		this.reset()
		this.autoEnd = autoEnd
		this.set({
			isLoading: true,
			stagesCount: stagesCount ?? this.default.stagesCount,
			text: text
				? this.prepareStageText(text)
				: this.default.text
		})
	}

	showLoading() {
		this.set({ isLoading: true })
	}

	hideLoading() {
		this.withEndTimeout(this.reset.bind(this))
	}

	setText(text: string) {
		this.set({ text: this.prepareStageText(text) })
	}

	setAutoEnd(value: boolean) {
		this.autoEnd = value
	}

	async runRequiredStage(name: string, action: StageAction) {
		if (!await this.runStage(name, action)) {
			throw new Error(`Error on required stage ${name}`)
		}
	}

	async runStage(name: string, action: StageAction): Promise<boolean> {
		this.set({ text: this.prepareStageText(name) })

		try {
			const result = await action() ?? true

			this.completeStage()

			return result
		} catch (error: unknown) {
			this.errorOnStage(error as Error)

			throw error
		}
	}

	setStagesCount(count: number) {
		this.set({ stagesCount: count, completedCount: 0 })
	}

	setCompletedCount(count: number) {
		this.set({ completedCount: count })
	}

	completeStage() {
		const isLoading = this.autoEnd
			? this.state.completedCount + 1 < this.state.stagesCount
			: this.state.isLoading

		this.set({
			completedCount: this.state.completedCount + 1,
			text: isLoading
				? this.state.text
				: this.texts.completed
		})

		if (!isLoading) {
			this.hideLoading()
		}
	}

	errorOnStage(error: Error) {
		this.set({ hasError: true, error: error.message })
	}

	/**
	 * Установить новое состояние.
	 * @param newState Новое состояние.
	 */
	private set(newState: Partial<ILoadingState>) {
		this.state = {
			...this.state,
			...newState
		}
	}

	/** Сбросить состояние. */
	private reset() {
		this.set(this.default)
		this.autoEnd = false
	}

	/**
	 * Выполнить действие после задержки завершения загрузки.
	 * @param func Действие.
	 */
	private withEndTimeout(func: () => void) {
		setTimeout(func, 1000)
	}

	/**
	 * Подготовить название стадии.
	 * @param text Название стадии.
	 * @returns Подготовленное название.
	 */
	private prepareStageText(text: string) {
		return `${text  }...`
	}
}
