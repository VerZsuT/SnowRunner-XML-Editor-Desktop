import type { Lang } from '/mods/renderer'

export function useLangToOptions(lang: typeof Lang): { label: string, value: string }[] {
  return Object.entries(lang).map(([name, value]) => ({
    label: name.toUpperCase(),
    value: value
  }))
}
