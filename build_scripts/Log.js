class Log {
  #FG_YELLOW = '\x1b[33m'
  #FG_BLUE = '\x1b[34m'
  #FG_RED = '\x1b[31m'
  #FG_GREEN = '\x1b[32m'
  #RESET_COLOR = '\x1b[0m'

  #PREFIX = `${this.#FG_YELLOW}[BUILD]${this.#RESET_COLOR}`

  #stageNumber = 1
  #mainIsStarted = false

  /**
   * Пишет сообщение в консоль. Если стоит флаг `isLog`, то пишет зелёным вне группы.
   * @param {string} message
   * @param {boolean} isLog
   */
  print(message, isLog = false) {
    this.#startMain()
    if (isLog) {
      console.log(`${this.#FG_GREEN}${message}${this.#RESET_COLOR}`)
    }
    else {
      console.log(`- ${message}`)
    }
  }

  /**
   * Группа стадии
   * @param {Function} callback
   */
  stage(callback) {
    this.#startMain()
    console.group(`${this.#FG_BLUE}[STAGE_${this.#stageNumber}]${this.#RESET_COLOR}`)
    callback()
    console.groupEnd()
    this.#stageNumber++
  }

  /**
   * Пишет в консоль в стиле ошибки.
   * @param {string} message
   */
  error(message) {
    console.log(`${this.#FG_RED}${message}${this.#RESET_COLOR}`)
  }

  /**
   * Главная группа
   */
  #startMain() {
    if (!this.#mainIsStarted) {
      console.group(this.#PREFIX)
      this.#mainIsStarted = true
    }
  }
}

module.exports = new Log()
