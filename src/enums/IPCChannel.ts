/** IPC каналы */
enum IPCChannel {
  /** Сигнал изменения конфигурации */
  changeConfig = 'change-config',
  /** Сигнал готовности окна к показу */
  windowReady = 'window-ready-',
  /** Сигнал изменения ширины окна */
  windowResize = 'window-resize',
  /** Канал отслеживания ширины окна */
  handleWindowSize = 'handle-window-size',
  /** Сигнал об обновлении initial.pak */
  updateInitial = 'update-initial'
}

export default IPCChannel
