/** Окно программы */
export enum ProgramWindow {
  /** Основное окно (списки и таблица) */
  main = 'window.main',
  /** Окно настроек */
  settings = 'window.settings',
  /** Окно доступности обновления */
  update = 'window.update',
  /** Окно нововведений в обновлении */
  whatsNew = 'window.whats-new',
  /** Окно загрузки */
  loading = 'window.loading',
  /** Окно первоначальной настройки */
  setup = 'window.setup'
}

/** Тип окна программы */
export enum WindowType {
  /** Стандартное окно */
  default,
  /** Модальное окно (фокус на основное окно недоступен пока открыто модальное) */
  modal
}
