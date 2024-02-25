import type { MainMessageType } from './enums'

/** Сообщение из main-process */
export interface IMainMessage {
  /** Тип */
  type: MainMessageType
  /** Содержимое */
  text: string
}
