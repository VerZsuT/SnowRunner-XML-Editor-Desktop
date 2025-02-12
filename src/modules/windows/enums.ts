/** Окно программы. */
export enum ProgramWindow {
  /** Основное окно (списки и таблица). */
  general = 'window/main'
}

/** Тип окна программы. */
export enum WindowType {
  /** Стандартное окно. */
  default,

  /** Модальное окно (фокус на основное окно недоступен пока открыто модальное). */
  modal
}

/** Страница главного окна. */
export enum Page {
  /** Пустая страница. */
  none = 'none',

  /** Пустая первой настройки. */
  setup = 'setup',

  /** Страница таблицы. */
  editor = 'editor',

  /** Страница списков. */
  lists = 'lists'
}
