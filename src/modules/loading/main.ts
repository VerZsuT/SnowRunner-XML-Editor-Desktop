import TextsLoader from './texts'
import type { ILoadingState, StageAction } from './types'
import { providePublic, publicField } from '/utils/bridge/main'

const texts = await TextsLoader.loadMain()

@providePublic()
class Loading {
  private get default(): ILoadingState {
    return {
      isLoading: false,
      hasError: false,
      text: 'Loading',
      stagesCount: 1,
      completedCount: 0
    }
  }

	@publicField()
  private accessor state = this.default

  private autoEnd = false

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
        ? this.prepareText(text)
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
    this.set({ text: this.prepareText(text) })
  }

  setAutoEnd(value: boolean) {
    this.autoEnd = value
  }

  async requiredStage(name: string, action: StageAction) {
    if (!await this.stage(name, action)) {
      this.errorOnStage()

      throw new Error(`Error on required stage ${name}`)
    }
  }

  async stage(name: string, action: StageAction) {
    let result = false

    this.set({ text: this.prepareText(name) })

    try {
      result = await action() ?? true
    } catch (error) {
      this.errorOnStage()
      throw error
    }

    this.completeStage()

    return result
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
        : texts.completed
    })

    if (!isLoading) {
      this.hideLoading()
    }
  }

  errorOnStage() {
    this.set({ hasError: true })
  }

  private set(newState: Partial<ILoadingState>) {
    this.state = {
      ...this.state,
      ...newState
    }
  }

  private reset() {
    this.set(this.default)
    this.autoEnd = false
  }

  private withEndTimeout(func: () => void) {
    setTimeout(func, 1000)
  }

  private prepareText(text: string) {
    return `${text  }...`
  }
}

export default new Loading()
