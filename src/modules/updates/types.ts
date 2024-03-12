import type { BrowserWindow } from 'electron'

/** Окно загрузки */
export interface IDownloadWindow extends BrowserWindow {
  /** Установить текст (заголовок) */
  setText(text: string): void
  /** Установить процент */
  setPercent(percent: number | string): void
  /** Установить флаг "успешно" */
  success(): void
  /** Установить флаг "загрузка" */
  download(): void
  /** Показать и подождать открытия */
  showAndWait(): Promise<void>
}

/** Окно обновления */
export interface IUpdateWindow extends BrowserWindow {
  /** Установить версию обновления */
  setVersion(version: string): void
}
