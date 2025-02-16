import Messages from '/mods/messages/renderer'
import { formatString } from '/utils/strings/renderer'

export * from './enums'

/**
 * Ошибка программы.
 * _renderer process_
 */
export class ProgramError extends Error {
  /**
   * Создать ошибку программы.
   * @param text Текст ошибки.
   * @param error Объект ошибки.
   * @param formatArgs Аргументы для вставки.
   */
  constructor(text: string, error?: Error | null, ...formatArgs: string[]) {
    text = formatString(text, ...formatArgs)
    Messages.error(text)
    
    super(text, { cause: error })
  }
}
