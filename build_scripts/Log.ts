/**
 * Отвечает за форматированный вывод информации в консоль
 */
class LogClass {
  private readonly FG_YELLOW = '\x1b[33m'
  private readonly FG_BLUE = '\x1b[34m'
  private readonly FG_RED = '\x1b[31m'
  private readonly FG_GREEN = '\x1b[32m'
  private readonly RESET_COLOR = '\x1b[0m'

  private readonly PREFIX = `${this.FG_YELLOW}[BUILD]${this.RESET_COLOR}`

  private stageNumber = 1
  private mainIsStarted = false

  /**
   * Пишет сообщение в консоль. Если стоит флаг `isLog`, то пишет зелёным вне группы
   */
  print(message: string, isLog = false): void {
    this.startMain()
    if (isLog) {
      console.log(`${this.FG_GREEN}${message}${this.RESET_COLOR}`)
    }
    else {
      console.log(`- ${message}`)
    }
  }

  /**
   * Группа стадии
   * 
   * @decorator
   */
  stage = <This, Args extends any[], Return>(
    method: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
  ) => {
    const obj = this

    return function (this: This, ...args: Args): Return {
      obj.startMain()
      console.group(`${obj.FG_BLUE}[STAGE_${obj.stageNumber}]${obj.RESET_COLOR}`)
      const result = method.call(this, ...args)
      console.groupEnd()
      obj.stageNumber++

      return result
    }
  }

  /**
   * Пишет в консоль в стиле ошибки
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

const Log = new LogClass()

export default Log
