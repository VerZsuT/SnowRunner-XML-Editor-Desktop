import { format } from './utils'

import Messages from '/mods/messages/main'

export * from './enums'

/** Класс ошибки программы */
export class ProgramError extends Error {
  constructor(text: string, error?: Error | null, ...formatArgs: string[]) {
    text = format(text, ...formatArgs)
    Messages.error(text)
    super(text, { cause: error })
  }
}
