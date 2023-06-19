import type { BrowserWindow } from 'electron'

export default interface IDownloadWindow extends BrowserWindow {
  setText(text: string): void
  setCount(count: number): void
  setPercent(percent: number | string): void
  showAndWait(): Promise<void>
  success(): void
  download(): void
}
