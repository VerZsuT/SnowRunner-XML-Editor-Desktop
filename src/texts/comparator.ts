import type { Lang } from '#enums'
import type { Localizations } from '#types'

function comparator<G extends {}>(globalTexts: G, localizator: (value: any) => any) {
  return <T extends Localizations<T[Lang.RU]>, E = {}>(localTexts: T, extra?: E) => ({
    ...globalTexts,
    ...localizator(localTexts),
    ...(extra ?? {})
  } as G & T[Lang.RU] & E)
}

export default comparator
