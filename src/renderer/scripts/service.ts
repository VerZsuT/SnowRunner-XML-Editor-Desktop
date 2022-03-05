import { contextBridge } from 'electron'
import { join, basename, extname } from 'path'
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs'
import type IService from './types/IService'

const service: IService = {
    join,
    basename,
    existsSync,
    readFileSync: path => readFileSync(path).toString(),
    writeFileSync,
    isDirectory: (name: string) => extname(name) === '',
    readdirSync
}

contextBridge.exposeInMainWorld('service', service)
global['service'] = service

export default service
