import { initMain, mainObjectField } from '@bridge/renderer'
import { computed } from 'vue'
import type { ILoadingState } from './types'

/**
 * Работа с загрузкой программы.
 * _renderer process_
 */
@initMain()
export class Loading {
  /** Состояние загрузки. */
  @mainObjectField()
  readonly state!: ILoadingState

  /** Процент выполнения. */
  readonly percent = computed(() => Math.round(this.state.completedCount / this.state.stagesCount * 100))
}
