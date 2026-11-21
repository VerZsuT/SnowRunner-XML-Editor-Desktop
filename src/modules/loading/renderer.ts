import { initMain, mainObjectField } from '@bridge/renderer'
import type { ILoadingState, IRendererLoading } from './types'

/** Работа с загрузкой программы. [renderer] */
@initMain()
export class Loading implements IRendererLoading {
	@mainObjectField()
	readonly state!: ILoadingState

	/** Процент выполнения. */
	get percent(): number {
		const { completedCount, stagesCount } = this.state

		return stagesCount
			? Math.round(completedCount / stagesCount * 100)
			: 0
	}
}
