/** Состояние загрузки. */
export interface ILoadingState {
  /** Происходит загрузка. */
  isLoading: boolean

  /** Имеется ошибка. */
  hasError: boolean

  /** Текст текущей стадии. */
	text: string

  /** Кол-во стадий. */
  stagesCount: number

  /** Кол-во завершённых стадий. */
  completedCount: number
}

/** Действие стадии. */
export type StageAction = () => void | boolean | Promise<void | boolean>
