import { Props } from './Props'
import { IMap, ITemp, PromptFunc, PromptProp, PromptType, SysVars, TaskAction } from './types'
import { Vars } from './Vars'

export class Parser {
    private vars: Vars
    private props: Props

    constructor(
        private temp: ITemp,
        private prompt: PromptFunc
    ) {}

    init(vars: Vars, props: Props) {
        this.vars = vars
        this.props = props
    }

    async parse(str: string) {
        str = await this.parseFuncs(str)
        str = await this.parseVars(str)
        return str.trim()
    }

    async parseFuncs(str: string) {
        for (const value of str.matchAll(RegExp(`(${SysVars.funcPrefix}[^(]+)\\((.*)\\)`, 'g'))) {
            const [all, name, attrs] = value
            
            if (attrs === '')
                throw new Error(`Вызов ${name} без параметров: '${all}'`)
            if (![SysVars.prompt, SysVars.calc].includes(name as SysVars))
                throw new Error(`Не найдена функция ${name}: '${all}'`)

            switch (name) {
                case SysVars.calc:
                    str = str.replace(all, await this.parseCalc(attrs))
                break
                case SysVars.prompt:
                    str = str.replace(all, await this.parsePrompt(attrs))
                break
            }
        }
        return str
    }

    async parseVars(str: string) {
        if (this.temp.currentAction === TaskAction.setAttribute) {
            let value: RegExpMatchArray
            if (value = str.match(RegExp(`{?${SysVars.curElVal}}?`, 'g'))) {
                const dom = this.temp.currentDOM
                const selector = this.temp.currentSelector
                const name = this.temp.currentAttribute
                let current = '0'
                if (dom.querySelector(selector)) {
                    current = dom.querySelector(selector).getAttribute(name) ?? ''
                }

                str = str.replaceAll(value[0], current)
            }
        }
        for (const value of str.matchAll(RegExp(`{?${SysVars.varPrefix}(${SysVars.varRegExp})}?`, 'ig'))) {
            const varKey = value[1]
            let varValue = this.vars.getString(varKey)
            varValue = await this.parse(varValue)
            str = str.replace(value[0], varValue)
        }
        return str
    }

    async parsePrompt(attrs: string) {
        let text: string,
            defaultVal: string,
            result: string,
            type: string,
            min: string,
            max: string

        attrs = this.parseExtend(attrs)
        
        text = await this.props.get(attrs, PromptProp.text, true)
        type = await this.props.get(attrs, PromptProp.type, false, 'text')
        if (!Object.keys(PromptType).includes(type))
            throw new Error(`Тип поля ввода не может быть "${type}": '${attrs}'`)

        if (type === PromptType.number) {
            min = await this.props.getNumber(attrs, PromptProp.min, false, '0')
            max = await this.props.getNumber(attrs, PromptProp.max, false, null)
            defaultVal = await this.props.getNumber(attrs, PromptProp.default, false, '0')
            result = await this.prompt(text, type, defaultVal, min, max)
        } else {
            defaultVal = await this.props.getNumber(attrs, PromptProp.default, false, '')
            result = await this.prompt(text, type, defaultVal)
        }

        return result
    }

    async parseCalc(attrs: string) {
        attrs = await this.parse(attrs)
        try {
            return this.parseExpression(attrs)
        } catch {
            throw new Error(`Неверное выражение '${attrs}'`)
        }
    }

    parseExtend(str: string) {
        const toExtend: IMap = {}
        for (const value of str.matchAll(RegExp(`${SysVars.extend}\\((${SysVars.varRegExp})\\)`, 'ig'))) {
            const extendObject = this.vars.getObject(value[1])
            for (const propKey in extendObject) {
                const propValue = extendObject[propKey]
                if (typeof propValue === 'string') {
                    toExtend[propKey] = propValue
                }
            }
            str = str.replace(value[0], '')
        }
        for (const key in toExtend) {
            str += ` ${key}='${toExtend[key]}' `
        }
        return str
    }

    parseNumber(str: string) {
        if (isNaN(+str)) {
            throw new Error(`Значение "${str}" не является числовым выражением.`)
        }
        if (str === '' || str === null) 
            return '0'

        return str
    }

    private parseExpression(str: string) {
        str = this.parseGroup(str)
        str = this.parseDivOrMult(str)
        str = this.parseIncOrDec(str)
        return str
    }

    private parseGroup(str: string) {
        for (const value of str.matchAll(/\((.+)\)/g)) {
            str = str.replace(value[0], this.parseExpression(value[1]))
        }
        return str
    }

    private parseDivOrMult(str: string) {
        const regex = /([^\s]+)\s*([*/])\s*([^\s]+)/g

        for (const value of str.matchAll(regex)) {
            let [all, left, char, right] = value
            left = left.trim()
            right = right.trim()
            
            if (char === '*') {
                str = str.replace(all, eval(`${left} * ${right}`))
            } else if (char === '/') {
                str = str.replace(all, eval(`${left} / ${right}`))
            }
        }
        if (str.match(regex)) {
            str = this.parseDivOrMult(str)
        }

        return str
    }

    private parseIncOrDec(str: string) {
        const regex = /([^\s]+)\s*([+-])\s*([^\s]+)/g

        for (const value of str.matchAll(regex)) {
            let [all, left, char, right] = value
            left = left.trim()
            right = right.trim()
            
            if (char === '+') {
                str = str.replace(all, eval(`${left} + ${right}`))
            } else if (char === '-') {
                str = str.replace(all, eval(`${left} - ${right}`))
            }
        }
        if (str.match(regex)) {
            str = this.parseIncOrDec(str)
        }
        return str
    }
}
