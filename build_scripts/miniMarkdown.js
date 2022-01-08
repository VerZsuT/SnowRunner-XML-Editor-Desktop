const translate = require('translate')

function parseToNative(str, prefix = '') {
    let ulStarted_1 = false
    let ulStarted_2 = false
    const trimmed = str.split('\n').filter(value => value !== '')
    return trimmed.map((value, index) => {
        let prepValue = value.trim().replace('- ', '')
        let boldBegan = false
        let italBegan = false
        while (prepValue.includes('_')) {
            if (italBegan) {
                prepValue = prepValue.replace('_', '</i>')
                italBegan = false
            } else {
                prepValue = prepValue.replace('_', '<i>')
                italBegan = true
            }
        }
        while (prepValue.includes('**')) {
            if (boldBegan) {
                prepValue = prepValue.replace('**', '</b>')
                boldBegan = false
            } else {
                prepValue = prepValue.replace('**', '<b>')
                boldBegan = true
            }
        }

        if (trimmed.length - 1 === index) {
            if (value.startsWith('  - ')) {
                return `${prefix}\t\t<li>${prepValue}</li>\n${prefix}\t</ul>\n${prefix}</ul>`
            }
            if (value.startsWith('- ')) {
                return `${prefix}\t<li>${prepValue}</li>\n${prefix}</ul>`
            }
        }

        if (value.startsWith('- ')) {
            if (ulStarted_2) {
                ulStarted_2 = false
                return `${prefix}\t</ul>\n${prefix}\t<li>${prepValue}</li>`
            }
            if (!ulStarted_1) {
                ulStarted_1 = true
                return `${prefix}<ul>\n${prefix}\t<li>${prepValue}</li>`
            }
            return `${prefix}\t<li>${prepValue}</li>`
        }

        if (value.startsWith('  - ')) {
            if (!ulStarted_2 && ulStarted_1) {
                ulStarted_2 = true
                return `${prefix}\t<ul>\n${prefix}\t\t<li>${prepValue}</li>`
            }
            return `${prefix}\t\t<li>${prepValue}</li>`
        }

        if (!value.startsWith('- ') && !value.startsWith('  - ')) {
            if (ulStarted_1) {
                ulStarted_1 = false
                return `${prefix}</ul>\n${prefix}<li>${prepValue}</li>`
            }
            if (ulStarted_2) {
                if (ulStarted_1) {
                    ulStarted_2 = false
                    ulStarted_1 = false
                    return `${prefix}\t</ul>\n${prefix}</ul>\n${prefix}<li>${prepValue}</li>`
                }
            }
            return `${prefix}<li>${prepValue}</li>`
        }
    }).join('\n')
}

async function parseToWhatsNew(str, prefix = '') {
    const RU = parseToNative(str, prefix)
    const EN = parseToNative(await translate(str, {
        from: 'ru',
        to: 'en'
    }), prefix)
    const DE = parseToNative(await translate(str, {
        from: 'ru',
        to: 'de'
    }), prefix)
    return `${prefix.replace('\t', '')}{config.lang === Lang.RU? <>\n${RU}\n${prefix.replace('\t', '')}</> :null}\n${prefix.replace('\t', '')}{config.lang === Lang.EN? <>\n${EN}\n${prefix.replace('\t', '')}</> :null}\n${prefix.replace('\t', '')}{config.lang === Lang.DE? <>\n${DE}\n${prefix.replace('\t', '')}</> :null}\n`
}

async function parseToGithub(str) {
    const RU = str
    const EN = await translate(str, {
        from: 'ru',
        to: 'en'
    })
    return `### [RU]\n\n${RU}\n### [EN]\n\n${EN}`
}

module.exports = {
    parseToNative,
    parseToWhatsNew,
    parseToGithub
}
