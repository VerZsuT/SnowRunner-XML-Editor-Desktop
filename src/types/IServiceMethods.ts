import type { existsSync, readdirSync, writeFileSync } from 'fs'
import type { basename, join } from 'path'

interface IServiceMethods {
  join: typeof join
  basename: typeof basename
  writeFileSync: typeof writeFileSync
  readdirSync: typeof readdirSync
  existsSync: typeof existsSync
  readFileSync(path: string): string
  isDirectory(path: string): boolean
}

export default IServiceMethods
