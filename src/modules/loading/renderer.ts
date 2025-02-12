import { computed } from 'vue'
import type { ILoadingState } from './types'
import { initMain, mainObjectField } from '/utils/renderer'

@initMain()
class Loading {
  @mainObjectField()
  readonly state!: ILoadingState

  readonly percent = computed(() => Math.round(this.state.completedCount / this.state.stagesCount * 100))
}

export default new Loading()
