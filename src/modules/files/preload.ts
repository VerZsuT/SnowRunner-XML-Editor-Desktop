import cp from 'node:child_process'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

window['fast-fs'] = { cp, fs, fsp, path }
