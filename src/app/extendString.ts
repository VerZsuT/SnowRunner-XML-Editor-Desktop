interface String {
    /**
     * Удаляет квадратные скобки из текста.
    */
    removePars(): string
    /**
     * Делает первую букву слова заглавной, а также заменяет _ на пробелы.
    */
    prettify(): string
}

String.prototype.removePars = function() {
    if (this || this === '') {
        return this.replaceAll('[', '').replaceAll(']', '')
    }
}

String.prototype.prettify = function() {
    let text = this.replaceAll('_', ' ')
    const firstChar = text[0].toUpperCase()

    return `${firstChar}${text.slice(1)}`
}
