/** Тип сообщения из main процесса. */
export enum MainMessageType {
  /** Сообщение об ошибке. */
  error = 'error',

  /** Информационное сообщение. */
  info = 'info',

  /** Предупреждение. */
  warning = 'warn',

  /** Сообщение об успехе. */
  success = 'success',

  /** Показать загрузку. */
  startLoading = 'start-loading',

  /** Остановить загрузку. */
  stopLoading = 'stop-loading'
}
