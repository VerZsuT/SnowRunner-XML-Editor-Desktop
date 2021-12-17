import { Texts } from '@sxmle-app/classes/Texts'

const texts = Texts.obj

/**
 * Возвращает игровой перевод по ключу.
 * @param modId - id модификации.
*/
export function getIngameText(key: string, modId?: string): string {
    let value: string
    if (modId && texts.mods[modId]) {
        value = texts.mods[modId][key]
    } else {
        value = texts.ingame[key]
    }

    if (value) {
        return value
    }
}

const forEach = '[SXMLE_ID="-CYCLE1-"]'
const first = '[SXMLE_ID="-F_CYCLE1-"]'
const last = '[SXMLE_ID="-L_CYCLE1-"]'

const forEachBy = (cycleNum: number) => `[SXMLE_ID="-CYCLE${cycleNum}-"]`
const firstBy = (cycleNum: number) => `[SXMLE_ID="-F_CYCLE${cycleNum}-"]`
const lastBy = (cycleNum: number) => `[SXMLE_ID="-L_CYCLE${cycleNum}-"]`
const th = (pos: number, cycleNum: number = 1) => `[SXMLE_ID="-N${pos}_CYCLE${cycleNum}-"]`

type ThisType = {
    /** По каждому элементу с перед-стоящим селектором. */
    forEach: typeof forEach
    /** Первый среди элементов с перед-стоящим селектором. */
    first: typeof first
    /** Последний среди элементов с перед-стоящим селектором. */
    last: typeof last
    /** 
     * По каждому элементу с перед-стоящим селектором в указанном цикле.
     * 
     * __Цикл__ - номер по порядку шаблона с итерацией `Template[type=TemplateType.multiply]`
    */
    forEachBy: typeof forEachBy
    /** 
     * Первый среди элементов с перед-стоящим селектором в указанном цикле.
     * 
     * __Цикл__ - номер по порядку шаблона с итерацией `Template[type=TemplateType.multiply]`
    */
    firstBy: typeof firstBy
    /** 
     * Последний среди элементов с перед-стоящим селектором в указанном цикле.
     * 
     * __Цикл__ - номер по порядку шаблона с итерацией `Template[type=TemplateType.multiply]`
    */
    lastBy: typeof lastBy
    /** 
     * Элемент, стоящий на позиции `pos` в указанном цикле.
     * 
     * __Цикл__ - номер по порядку шаблона с итерацией `Template[type=TemplateType.multiply]`
    */
    th: typeof th
}

/** 
 * Создаёт объект селекторов на основе возвращаемого результата переданной функции `func`.
 * 
 * Все точки в селекторе после обработки заменяются на `>`.
 * 
 * Для относительной навигации в селекторе могут применяться следующие элементы:
 * - {@link forEach} или {@link forEachBy}()
 * - {@link first} или {@link firstBy}()
 * - {@link last} или {@link lastBy}()
 * - {@link th}()
 * 
 * _Внимание!_ Вставка для относительной навигации проводится без точки после селектора.
 * 
 * _Пример:_
 * ```
 * function() {
 *     const selector1 = `el1.el2${this.first}` // Правильно
 *     const selector2 = `el1.el2.${this.first}` // Неправильно
 *     return {selector1, selector2}
 * }
 * ```
 * _Пример возможных селекторов:_
 * ```
 * function() {
 *     // Вместо forEach каждую итерацию будет вставляться `ID` текущего элемента.
 *     const first = `Truck.Wheel${this.forEach}`
 *     // Truck.Wheel<forEach>.GameData
 *     const second = `${this.first}.GameData`
 *     // Последний <Bone> в <PhysicsModel>
 *     const third = `PhysicsModel.Bone${this.last}`
 *     // Аналогично первому, но вставка происходит только во второй итерации.
 *     const example = `Example${this.forEachBy(2)}`
 *     return {first, second, third, example}
 * }
 * ```
 * Допустим, у нас есть такой XML файл:
 * ```xml
 * <Truck>
 *     <Wheels>
 *          <Wheel number='1'/>
 *          ...
 *          <Wheel number='30'/>
 *     </Wheels>
 * </Truck>
 * ```
 * Нам требуется получить доступ к каждому Wheel. Для этого мы используем два селектора. Переданная функция:
 * ```
 * function() {
 *     // Вставим его как "itemSelector" в Template и он запустит итерацию по всем <Wheel>.
 *     // Во время итерации этот селектор будет указывать на текущий элемент <Wheel>.
 *     const wheel = `Truck.Wheels.Wheel${this.forEach}`
 *     return {wheel}
 * }
 * ```
*/
export function getSelectors<T extends {[id: string]: string}>(func: (this: ThisType)=>T): T {
    type ItemType = T[Extract<keyof T, string>]

    const obj = func.apply({
        forEach, last, first,
        forEachBy, lastBy, firstBy, th
    }) as T
    const newObj: T = Object.assign({}, obj)

    for (const id in obj) {
        newObj[id] = `SELECTOR_ID:${id}||${newObj[id]}` as ItemType
        newObj[id] = newObj[id]
            .replaceAll('.', '>')
            .replaceAll('>', ' > ')
            .replaceAll(' ', '!')
            .replaceAll('!!', '!')
            .replaceAll('!', ' ') as ItemType
    }
    return newObj
}
