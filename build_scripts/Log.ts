class Log {
  private readonly FG_YELLOW = '\x1b[33m'
  private readonly FG_BLUE = '\x1b[34m'
  private readonly FG_RED = '\x1b[31m'
  private readonly FG_GREEN = '\x1b[32m'
  private readonly RESET_COLOR = '\x1b[0m'

  private readonly PREFIX = `${this.FG_YELLOW}[BUILD]${this.RESET_COLOR}`

  private stageNumber = 1
  private mainIsStarted = false

  /**
   * Пишет сообщение в консоль. Если стоит флаг `isLog`, то пишет зелёным вне группы.
   */
  print(message: string, isLog = false): void {
    this.startMain()
    if (isLog)
      console.log(`${this.FG_GREEN}${message}${this.RESET_COLOR}`)
    else
      console.log(`- ${message}`)
  }

  /**
   * Группа стадии
   */
  stage(callback: () => void): void {
    this.startMain()
    console.group(`${this.FG_BLUE}[STAGE_${this.stageNumber}]${this.RESET_COLOR}`)
    callback()
    console.groupEnd()
    this.stageNumber++
  }

  /**
   * Пишет в консоль в стиле ошибки.
   */
  error(message: string): void {
    console.log(`${this.FG_RED}${message}${this.RESET_COLOR}`)
  }

  /**
   * Главная группа
   */
  private startMain(): void {
    if (!this.mainIsStarted) {
      console.group(this.PREFIX)
      this.mainIsStarted = true
    }
  }
}

export default new Log()
