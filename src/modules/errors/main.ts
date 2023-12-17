import { format } from './utils'

import Messages from '/mods/messages/main'

export * from './enums'

/** Класс ошибки программы */
export class ProgramError extends Error {
  constructor(text: string, ...formatArgs: string[]) {
    text = format(text, ...formatArgs)
    Messages.error(text)
    super(text)
  }
}
