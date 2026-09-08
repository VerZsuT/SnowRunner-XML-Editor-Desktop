import { initMain, mainObjectField } from '@bridge/renderer'
import { computed } from 'vue'
import type { ILoadingState, IRendererLoading } from './types'

/** Работа с загрузкой программы. [renderer] */
@initMain()
export class Loading implements IRendererLoading {
	@mainObjectField()
	readonly state!: ILoadingState

	readonly percent = computed(() => Math.round(this.state.completedCount / this.state.stagesCount * 100))
}
