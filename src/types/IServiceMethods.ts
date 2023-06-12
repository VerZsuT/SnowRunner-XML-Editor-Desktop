import type { existsSync, readdirSync, writeFileSync } from 'fs'
import type { basename, join } from 'path'

export default interface IServiceMethods {
  join: typeof join
  basename: typeof basename
  writeFileSync: typeof writeFileSync
  readdirSync: typeof readdirSync
  existsSync: typeof existsSync
  rmdirSync(path: string): void
  readFileSync(path: string): string
  isDirectory(path: string): boolean
}
