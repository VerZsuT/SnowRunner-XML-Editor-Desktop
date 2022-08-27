const FG_YELLOW = '\x1b[33m'
const FG_BLUE = '\x1b[34m'
const FG_RED = '\x1b[31m'
const FG_GREEN = '\x1b[32m'
const RESET_COLOR = '\x1b[0m'

const PREFIX = `${FG_YELLOW}[BUILD]${RESET_COLOR}`

let stageNumber = 1
let mainIsStarted = false

/**
 * Пишет сообщение в консоль. Если стоит флаг `isLog`, то пишет зелёным вне группы.
 * @param {string} message 
 * @param {boolean} isLog 
 */
function print(message, isLog=false) {
    startMain()
    if (isLog)
        console.log(`${FG_GREEN}${message}${RESET_COLOR}`)
    else
        console.log(`- ${message}`)
}

/**
 * Главная группа
 */
function startMain() {
    if (!mainIsStarted) {
        console.group(PREFIX)
        mainIsStarted = true
    }
}

/**
 * Группа стадии
 * @param {Function} callback
 */
function stage(callback) {
    startMain()
    console.group(`${FG_BLUE}[STAGE_${stageNumber}]${RESET_COLOR}`)
    callback()
    console.groupEnd()
    stageNumber++
}

/**
 * Пишет в консоль в стиле ошибки.
 * @param {string} message 
 */
function error(message) {
    console.log(`${FG_RED}${message}${RESET_COLOR}`)
}

module.exports = {
    print,
    error,
    stage
}
