/** Группа в списках */
export enum GroupTab {
  /** Основная группа */
  main = 'main',
  /** Группа дополнений */
  dlc = 'dlc',
  /** Группа модификаций */
  mods = 'mods',
  /** Группа избранного */
  favorites = 'favorites'
}

/** Страница главного окна */
export enum Page {
  /** Страница таблицы */
  editor = 'editor',
  /** Страница списков */
  lists = 'lists'
}

/** Источник элемента */
export enum SourceType {
  /** Источник - модификации */
  mods = 'mods',
  /** Источник - дополнения */
  dlc = 'dlc',
  /** Источник - основной */
  main = 'main',
  /** Источник - избранное */
  favorites = 'favorites'
}

/** Категория в списках */
export enum Category {
  /** Категория автомобилей */
  trucks = 'trucks',
  /** Категория прицепов */
  trailers = 'trailers'
}
