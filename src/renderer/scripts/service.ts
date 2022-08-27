import {existsSync, lstatSync, readdirSync, readFileSync, writeFileSync} from 'fs'
import {basename, join} from 'path'

import type {Service} from 'types'

window.service = {
    readFileSync: (path: string) => readFileSync(path).toString(),
    isDirectory: (path: string) => lstatSync(path).isDirectory(),
    writeFileSync,
    readdirSync,
    existsSync,
    basename,
    join
} as Service
