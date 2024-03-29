import { format } from './utils'

import Messages from '/mods/messages/renderer'

export * from './enums'

/** Класс ошибки программы */
export class ProgramError extends Error {
  constructor(text: string, error?: Error, ...formatArgs: string[]) {
    text = format(text, ...formatArgs)
    Messages.error(text)
    super(text, { cause: error })
  }
}
