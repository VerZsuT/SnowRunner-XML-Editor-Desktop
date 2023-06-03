import { SelPrefix, genElementSelector, genFormattedSelector } from './service'

import bridge from '#r/scripts/bridge'

const texts = bridge.texts

interface ISelectors {
  getSelectors?(): string[]
}

/**
 * Возвращает игровой перевод по ключу.
 * @param key
 * @param modId - id модификации.
 */
export function getGameText(key: string, modId?: string): string | undefined {
  let value: string
  if (modId && texts.mods[modId]) {
    value = texts.mods[modId][key]
  }
  else {
    value = texts.main[key]
  }

  if (value) return value
}

export function selector<This>(
  _: undefined,
  context: ClassFieldDecoratorContext<This, string>
) {
  const name = String(context.name)

  context.addInitializer(function (this: This) {
    const prevGetter = this['getSelectors'] ?? (() => [])
    this['getSelectors'] = () => [...prevGetter(), name]
  })
}

export const forEach = genElementSelector(SelPrefix.forEach)
export const first = genElementSelector(SelPrefix.first)
export const last = genElementSelector(SelPrefix.last)

export const forEachBy = (cycleCount: number) => genElementSelector(SelPrefix.forEach, cycleCount)
export const firstBy = (cycleCount: number) => genElementSelector(SelPrefix.first, cycleCount)
export const lastBy = (cycleCount: number) => genElementSelector(SelPrefix.last, cycleCount)
export const th = (pos: number, cycleCount = 1) => genElementSelector(SelPrefix.th + pos, cycleCount)

export function createSelectors<T>(Class: T): { [key in keyof Omit<T, 'prototype'>]: T[key] } {
  const target = Class as ISelectors
  const value: any = {}

  target.getSelectors?.().forEach(key => {
    if (key === 'prototype') return
    value[key] = genFormattedSelector(key, target[key])
      .replaceAll('.', '>')
      .replaceAll('>', ' > ')
      .replaceAll(' ', '!')
      .replaceAll('!!', '!')
      .replaceAll('!', ' ')
  })

  return value
}
