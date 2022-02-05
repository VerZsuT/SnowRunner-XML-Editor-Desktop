import { Parser } from './Parser'

export class Props {
    constructor(
        private parser: Parser
    ) {}

    async get(str: string, name: string, required?: boolean, defaultVal?: string) {
        let value = defaultVal

        if (str.includes(`${name}=`)) {
            const rightSide = str.split(`${name}=`)[1]
            if (rightSide.startsWith('\'')) {
                value = rightSide.split('\'')[1]
            } else {
                value = rightSide.split(' ')[0].trim()
            }
        }
        else if (required)
            throw new Error(`Отсутствует параметр ${name}.`)
        
        return this.parser.parse(value)
    }
    
    async getNumber(str: string, name: string, required?: boolean, defaultVal?: string) {
        const number = await this.get(str, name, required, defaultVal)
        return this.parser.parseNumber(number)
    }
}
