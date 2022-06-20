const FG_YELLOW = "\x1b[33m";
const FG_BLUE = "\x1b[34m";
const FG_RED = "\x1b[31m";
const FG_GREEN = "\x1b[32m";
const RESET_COLOR = "\x1b[0m";

const PREFIX = `${FG_YELLOW}[POST_BUILD]${RESET_COLOR}`;

let stageNumber = 1;

/**
 * Пишет сообщение в консоль. Если стоит флаг `isLog`, то пишет зелёным вне группы.
 * @param {string} message 
 * @param {boolean} isLog 
 */
function print(message, isLog = false) {
    if (isLog)
        console.log(`${FG_GREEN}${message}${RESET_COLOR}`);
    else
        console.log(`- ${message}`);
}

/** Создаёт главную группу */
function mainGroup() {
    console.group(PREFIX);
}

/** Создаёт группу стадии */
function stageGroup() {
    console.group(`${FG_BLUE}[STAGE_${stageNumber}]${RESET_COLOR}`);
}

/** Закрывает последнюю созданную группу */
function groupEnd() {
    console.groupEnd();
}

/**
 * Пишет в консоль в стиле ошибки.
 * @param {string} message 
 */
function error(message) {
    console.log(`${FG_RED}${message}${RESET_COLOR}`);
}

/** Закрывает текущую группу, увеличивает номер стадии и создаёт новую группу */
function separator() {
    groupEnd();
    ++stageNumber;
    stageGroup();
}

module.exports = {
    print,
    error,
    groupEnd,
    separator,
    stageGroup,
    mainGroup
};
