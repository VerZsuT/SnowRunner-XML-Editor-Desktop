import type { Lang } from '#enums'

type Localizations<T> = Record<Lang, T>

export default Localizations
