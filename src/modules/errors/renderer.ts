import Messages from '/mods/messages/renderer'
import { formatString } from '/utils/strings/renderer'

export * from './enums'

/** Класс ошибки программы */
export class ProgramError extends Error {
  constructor(text: string, error?: Error | null, ...formatArgs: string[]) {
    text = formatString(text, ...formatArgs)
    Messages.error(text)
    
    super(text, { cause: error })
  }
}
