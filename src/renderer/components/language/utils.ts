import type { Lang } from '/mods/renderer'

/** Преобразовать `Lang` в опции `Select` */
export function langToOptions(lang: typeof Lang): { label: string, value: string }[] {
  return Object.entries(lang).map(([name, value]) => ({
    label: name.toUpperCase(),
    value: value
  }))
}
