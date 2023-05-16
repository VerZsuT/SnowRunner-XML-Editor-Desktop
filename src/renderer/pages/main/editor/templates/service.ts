export enum SelPrefix {
  forEach = 'FE',
  first = 'FR',
  last = 'LA',
  th = 'TH'
}

export const ID_ATTRIBUTE = 'SXMLE_ID'
export const SELECTOR_ID_PREFIX = 'SELECTOR_ID:'
export const SELECTOR_SEPARATOR = '||'

export const genAttributeValue = (prefix: SelPrefix | string, cycleCount = 1) => `-${prefix}_CYCLE${cycleCount}-`
export const genElementSelector = (prefix: SelPrefix | string, cycleCount = 1) => `[${ID_ATTRIBUTE}="${genAttributeValue(prefix, cycleCount)}"]`
export const genFormattedSelector = (key: string, value: string) => `${SELECTOR_ID_PREFIX}${key}${SELECTOR_SEPARATOR}${value}`
