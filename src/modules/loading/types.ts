export interface ILoadingState {
  isLoading: boolean
  hasError: boolean
	text: string
  stagesCount: number
  completedCount: number
}

export type StageAction = () => void | boolean | Promise<void | boolean>
