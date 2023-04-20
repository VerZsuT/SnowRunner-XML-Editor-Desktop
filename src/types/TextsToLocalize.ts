import type { Lang } from '#g/enums'

type TextsToLocalize<T> = Record<Lang, T>

export default TextsToLocalize
