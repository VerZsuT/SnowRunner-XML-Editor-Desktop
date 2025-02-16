import { computed } from 'vue'
import type { ILoadingState } from './types'
import { initMain, mainObjectField } from '/utils/renderer'

/**
 * Работа с загрузкой программы.
 * _renderer process_
 */
@initMain()
class Loading {
  /** Состояние загрузки. */
  @mainObjectField()
  readonly state!: ILoadingState

  /** Процент выполнения. */
  readonly percent = computed(() => Math.round(this.state.completedCount / this.state.stagesCount * 100))
}

/**
 * Работа с загрузкой программы.
 * _renderer process_
 */
export default new Loading()
