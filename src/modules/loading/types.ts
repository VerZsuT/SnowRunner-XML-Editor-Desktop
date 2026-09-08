import type { ComputedRef } from 'vue'

/** Состояние загрузки. */
export interface ILoadingState {
	/** Происходит загрузка. */
	isLoading: boolean

	/** Имеется ошибка. */
	hasError: boolean

	/** Какая ошибка. */
	error: string

	/** Текст текущей стадии. */
	text: string

	/** Кол-во стадий. */
	stagesCount: number

	/** Кол-во завершённых стадий. */
	completedCount: number
}

/** Действие стадии. */
export type StageAction = () => void | boolean | Promise<void | boolean>

/** Работа с загрузкой программы. [public] */
export interface IPublicLoading {
	/** Состояние загрузки. */
	state: ILoadingState
}

/** Работа с загрузкой программы. [renderer] */
export interface IRendererLoading extends IPublicLoading {
	/** Процент выполнения. */
	percent: ComputedRef<number>
}

/** Работа с загрузкой программы. [main] */
export interface IMainLoading extends IPublicLoading {
	/**
	 * Инициализировать загрузку.
	 * @param text Текст первой стадии.
	 * @param stagesCount Кол-во стадий.
	 * @param autoEnd Завершать ли автоматически
	 */
	init(text?: string, stagesCount?: number, autoEnd?: boolean): void

	/** Показать загрузку. */
	showLoading(): void

	/** Скрыть загрузку. */
	hideLoading(): void

	/**
	 * Установить текст текущей стадии.
	 * @param text Текст.
	 */
	setText(text: string): void

	/**
	 * Установить автоматическое завершение.
	 * @param value Завершать ли автоматически.
	 */
	setAutoEnd(value: boolean): void

	/**
	 * Запустить обязательную стадию.
	 * @param name Название стадии.
	 * @param action Действие.
	 * @throws {Error} Если действие прошло с ошибкой.
	 */
	runRequiredStage(name: string, action: StageAction): Promise<void>

	/**
	 * Запустить стадию.
	 * @param name Название стадии.
	 * @param action Действие.
	 * @returns Результат завершения.
	 */
	runStage(name: string, action: StageAction): Promise<boolean>

	/**
	 * Установить кол-во стадий.
	 * @param count Кол-во стадий.
	 */
	setStagesCount(count: number): void

	/**
	 * Установить кол-во завершённых стадий.
	 * @param count Кол-во завершённых стадий.
	 */
	setCompletedCount(count: number): void

	/** Завершить стадию. */
	completeStage(): void

	/** Установить признак ошибки на стадии. */
	errorOnStage(error: Error): void
}

