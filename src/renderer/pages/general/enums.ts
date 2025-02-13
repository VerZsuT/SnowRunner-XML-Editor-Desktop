/** Источник элемента. */
export enum SourceType {
  /** Все. */
  all = 'all',

  /** Модификации. */
  mods = 'mods',

  /** Дополнения. */
  dlc = 'dlc',

  /** Основной. */
  main = 'main',

  /** Избранное. */
  favorites = 'favorites',

  /** Изменённое. */
  edited = 'edited'
}

/** Категория в списках. */
export enum Category {
  /** Категория автомобилей. */
  trucks = 'trucks',
  
  /** Категория прицепов. */
  trailers = 'trailers'
}

/** Режим списка. */
export enum ListMode {
  /** Список. */
  list = 'list',

  /** Карточки. */
  cards = 'cards'
}
