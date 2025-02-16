import TextsLoader from './texts'
import type { ILoadingState, StageAction } from './types'
import { providePublic, publicField } from '/utils/bridge/main'

const texts = await TextsLoader.loadMain()

/**
 * Работа с загрузкой программы.
 * _main process_
 */
@providePublic()
class Loading {
  /** Состояние по умолчанию. */
  private get default(): ILoadingState {
    return {
      isLoading: false,
      hasError: false,
      text: 'Loading',
      stagesCount: 1,
      completedCount: 0
    }
  }

  /** Состояние загрузки. */
	@publicField()
  private accessor state = this.default

  /** Завершать ли автоматически. */
  private autoEnd = false

  /**
   * Инициализировать загрузку.
   * @param text Текст первой стадии.
   * @param stagesCount Кол-во стадий.
   * @param autoEnd Завершать ли автоматически
   */
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

  /** Показать загрузку. */
  showLoading() {
    this.set({ isLoading: true })
  }

  /** Скрыть загрузку. */
  hideLoading() {
    this.withEndTimeout(this.reset.bind(this))
  }

  /**
   * Установить текст текущей стадии.
   * @param text Текст.
   */
  setText(text: string) {
    this.set({ text: this.prepareStageText(text) })
  }

  /**
   * Установить автоматическое завершение.
   * @param value Завершать ли автоматически.
   */
  setAutoEnd(value: boolean) {
    this.autoEnd = value
  }

  /**
   * Запустить обязательную стадию.
   * @param name Название стадии.
   * @param action Действие.
   * @throws {Error} Если действие прошло с ошибкой.
   */
  async runRequiredStage(name: string, action: StageAction) {
    if (!await this.runStage(name, action)) {
      this.errorOnStage()

      throw new Error(`Error on required stage ${name}`)
    }
  }

  /**
   * Запустить стадию.
   * @param name Название стадии.
   * @param action Действие.
   * @returns Результат завершения.
   */
  async runStage(name: string, action: StageAction): Promise<boolean> {
    let result = false

    this.set({ text: this.prepareStageText(name) })

    try {
      result = await action() ?? true
    } catch (error) {
      this.errorOnStage()
      throw error
    }

    this.completeStage()

    return result
  }

  /**
   * Установить кол-во стадий.
   * @param count Кол-во стадий.
   */
  setStagesCount(count: number) {
    this.set({ stagesCount: count, completedCount: 0 })
  }

  /**
   * Установить кол-во завершённых стадий.
   * @param count Кол-во завершённых стадий.
   */
  setCompletedCount(count: number) {
    this.set({ completedCount: count })
  }

  /** Завершить стадию. */
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

  /** Установить признак ошибки на стадии. */
  errorOnStage() {
    this.set({ hasError: true })
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

/**
 * Работа с загрузкой программы.
 * _main process_
 */
export default new Loading()
