class Log {
    static FgYellow = '\x1b[33m'
    static Reset = '\x1b[0m'
    static FgBlue = '\x1b[34m'
    static FgRed = '\x1b[31m'
    static FgCyan = '\x1b[36m'
    static FgGreen = '\x1b[32m'

    static stageNumber = 1
    static prefix = `${this.FgYellow}[POST_BUILD]${this.Reset}`

    /**
     * Пишет сообщение в консоль. Если стоит флаг isLog, то пишет зелёным вне группы.
     * @param {string} message 
     * @param {boolean} isLog 
    */
    static print(message, isLog=false) {
        if (isLog) {
            console.log(`${this.FgGreen}${message}${this.Reset}`)
        } else {
            console.log(`- ${message}`)
        }
    }

    /**
     * Создаёт главную группу. 
    */
    static mainGroup() {
        console.group(this.prefix)
    }

    /**
     * Создаёт группу стадии.
    */
    static stageGroup() {
        console.group(`${this.FgBlue}[STAGE_${this.stageNumber}]${this.Reset}`)
    }

    /**
     * Закрывает последнюю созданную группу.
    */
    static groupEnd() {
        console.groupEnd()
    }

    /**
     * Пишет в консоль в стиле ошибки.
     * @param {string} message 
    */
    static error(message) {
        console.log(`${this.FgRed}${message}${this.Reset}`)
    }

    /**
     * Закрывает текущую группу, увеличивает номер стадии и создаёт новую группу.
    */
    static separator() {
        this.groupEnd()
        this.stageNumber++
        this.stageGroup()
    }
}

module.exports = Log
