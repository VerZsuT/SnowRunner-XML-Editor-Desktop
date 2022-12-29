import bridge from '#r-scripts/bridge'

const texts = bridge.texts

interface ISelectors {
  getSelectors?(): string[]
}

type Creatable = {
  new (...args: any): any
}

/**
 * Возвращает игровой перевод по ключу.
 * @param key
 * @param modId - id модификации.
 */
export function getGameText(key: string, modId?: string): string | undefined {
  let value: string
  if (modId && texts.mods[modId])
    value = texts.mods[modId][key]
  else
    value = texts.main[key]

  if (value) return value
}

export function selector(tgt: any, key: string): void {
  const target: ISelectors = tgt
  const prevGetter = target.getSelectors ?? (() => [])
  target.getSelectors = () => [...prevGetter(), key]
}

export const forEach = '[SXMLE_ID="-CYCLE1-"]'
export const first = '[SXMLE_ID="-F_CYCLE1-"]'
export const last = '[SXMLE_ID="-L_CYCLE1-"]'

export const forEachBy = (cycleNum: number) => `[SXMLE_ID="-CYCLE${cycleNum}-"]`
export const firstBy = (cycleNum: number) => `[SXMLE_ID="-F_CYCLE${cycleNum}-"]`
export const lastBy = (cycleNum: number) => `[SXMLE_ID="-L_CYCLE${cycleNum}-"]`
export const th = (pos: number, cycleNum = 1) => `[SXMLE_ID="-N${pos}_CYCLE${cycleNum}-"]`

export function createSelectors<T extends Creatable>(Class: T) {
  const target = <ISelectors> new Class()
  target.getSelectors?.().forEach(key => {
    target[key] = `SELECTOR_ID:${key}||${[target[key]]}`
      .replaceAll('.', '>')
      .replaceAll('>', ' > ')
      .replaceAll(' ', '!')
      .replaceAll('!!', '!')
      .replaceAll('!', ' ')
  })
  return target as InstanceType<T>
}
