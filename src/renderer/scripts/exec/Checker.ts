import { ConfirmFunc, MainAttr } from './types'

export class Checker {
    constructor(private confirm: ConfirmFunc) {}

    async checkDLC($root: Element) {
        let requiredDLC: string
        if ((requiredDLC = $root.getAttribute(MainAttr.requiredDLC))) {
            if (!await this.confirm(`Требуется купленное DLC "${requiredDLC}". Продолжить?`))
                throw new Error('Отменено.')
        }
    }

    async checkGameVersion($root: Element) {
        let gameVersion: string
        if ((gameVersion = $root.getAttribute(MainAttr.gameVersion))) {
            if (!await this.confirm(`Требуется версия игры ${gameVersion}. Продолжить?`))
                throw new Error('Отменено.')
        }
    }
    
}
