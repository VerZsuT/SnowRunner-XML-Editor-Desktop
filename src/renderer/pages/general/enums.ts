/** Источник элемента. */
export enum SourceType {
  /** Источник - модификации. */
  mods = 'mods',

  /** Источник - дополнения. */
  dlc = 'dlc',

  /** Источник - основной. */
  main = 'main',

  /** Источник - избранное. */
  favorites = 'favorites'
}

/** Категория в списках. */
export enum Category {
  /** Категория автомобилей. */
  trucks = 'trucks',
  
  /** Категория прицепов. */
  trailers = 'trailers'
}
