import type { basename, join } from 'path'
import type { writeFileSync, existsSync, readdirSync } from 'fs'

interface IService {
    join: typeof join
    basename: typeof basename
    writeFileSync: typeof writeFileSync
    readdirSync: typeof readdirSync
    existsSync: typeof existsSync
    readFileSync(path: string): string
    isDirectory(path: string): boolean
}

export default IService
