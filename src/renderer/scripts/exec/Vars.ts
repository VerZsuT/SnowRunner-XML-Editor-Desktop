import { Parser } from './Parser'
import { IVars, SysVars, VarAttr, VarType } from './types'

export class Vars {
    private vars: IVars

    constructor(
        private parser: Parser
    ) {
        this.vars = {}
    }

    async set($el: Element, to = this.vars) {
        for (const $var of Array.from($el.children)) {
            try {
                const type = $var.nodeName.toLowerCase()
                let key: string
                let preserve: boolean
                let value: string
                
                if (!$var.attributes.length || $var.attributes[0].name === 'preserve')
                    throw new Error('Отсутствует имя переменной.')
    
                if (!Object.keys(VarType).includes(type))
                    throw new Error(`Недопустимый тип переменной: "${$var.nodeName}"`)

                key = $var.attributes[0].name
                preserve = $var.hasAttribute('preserve')
                
                if (type === VarType.object) {
                    await this.set($var, to[key] = {})
                    continue
                }
    
                if (preserve){
                    value = $var.innerHTML
                } else {
                    value = await this.parser.parse($var.innerHTML)
                    if (type === VarType.number) {
                        value = this.parser.parseNumber(value)
                    }
                }
    
                to[key] = value
            } catch (error) {
                throw new Error(`${error.message}\nОшибка на <${$var.tagName} ${VarAttr.key}='${$var.getAttribute(VarAttr.key)}'>`)
            }
        }
    }

    getString(key: string, from = this.vars, catchError = true) {
        let value: string | IVars
        if (key.includes(SysVars.objectDot)) {
            if (catchError) {
                try {
                    return this.getString(key.split(SysVars.objectDot)[1], from[key.split(SysVars.objectDot)[0]] as IVars, false)
                } catch {
                    throw new Error(`Не найдена переменная ${key}.`)
                }
            } else {
                return this.getString(key.split(SysVars.objectDot)[1], from[key.split(SysVars.objectDot)[0]] as IVars, false)
            }
        }

        value = from[key]
        if (value === undefined)
            throw new Error(`Не найдена переменная ${key}.`)
        if (typeof value !== 'string')
            throw new Error(`Нельзя вставить переменную-объект: ${key}`)

        return value.replaceAll('&gt;', '>')
    }

    getObject(key: string, from = this.vars) {
        let value: IVars
        if (key.includes(SysVars.objectDot)) {
            return this.getObject(key.split(SysVars.objectDot)[1], from[key.split(SysVars.objectDot)[0]] as IVars)
        }

        value = from[key] as IVars
        if (value === undefined)
            throw new Error(`Не найдена переменная ${key}.`)

        return value
    }
}
