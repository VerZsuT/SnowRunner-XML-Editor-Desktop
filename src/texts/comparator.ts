import type { TextsToLocalize } from '#g/types'

/** Объединяет глобальный перевод с локальным, сохраняя обработку изменений */
export default function comparator<G extends {}>(globalTexts: TextsToLocalize<G>, localizator: (value: TextsToLocalize<any>) => any) {
  return <T extends object, E extends { [key: string]: string } = {}>(localTexts: TextsToLocalize<T>, extra?: E) => {
    const obj = { ...globalTexts } as TextsToLocalize<G & T & E>

    for (const lang in localTexts) {
      Object.assign(obj[lang], localTexts[lang])
    }
    if (extra) {
      for (const lang in obj) {
        Object.assign(obj[lang], extra)
      }
    }
    return localizator(obj) as G & T & E
  }
}
