import https from 'https'
import dns from 'dns'
import { writeFileSync, existsSync, lstatSync, readdirSync, accessSync, constants } from 'fs'
import { join } from 'path'
import { app, shell } from 'electron'

import { paths } from '../service'
import { Config } from './Config'
import { Dialog } from './Dialog'
import { Windows } from './Windows'
import { Texts } from './Texts'
import { Hasher } from './Hasher'
import { Notification } from './Notification'
import { Backup } from './Backup'
import { Archiver } from './Archiver'
import { Lang } from '../enums'

/** Отвечает за различные проверки. */
export class Checker {
    private static config = Config.obj

    /**
     * Проверяет наличие прав администратора у программы (требуется для чтения/записи файлов).
     * 
     * _Выводит уведомление и закрывает программу при неудаче._
    */
    static checkAdmin = () => {
        try {
            writeFileSync(paths.config, JSON.stringify(this.config, null, '\t'))
            return true
        } catch {
            const ru = texts[Lang.RU].ADMIN_REQUIRED_MESSAGE
            const en = texts[Lang.EN].ADMIN_REQUIRED_MESSAGE
            const de = texts[Lang.DE].ADMIN_REQUIRED_MESSAGE
            Windows.loading.setPercent(0)
            Dialog.alert({
                message: `RU: ${ru}\n\nEN: ${en}\n\nDE: ${de}`,
                type: 'warning',
                buttons: ['Exit'],
                title: 'Error'
            })
            setTimeout(app.quit, 2000)
            return false
        }
    }

    /**
     * Проверяет на стороннее изменение `initial.pak`.
     * 
     * _Если изменения присутствуют, то обновляет файлы в программе._
    */
    static checkInitial = async () => {
        if (!existsSync(join(paths.mainTemp, '[media]')) || Hasher.getSize(this.config.paths.initial) !== this.config.sizes.initial) {
            if (existsSync(this.config.paths.initial)) {
                if (!existsSync(paths.backupInitial)) {
                    await Backup.save()
                } else {
                    await Archiver.unpackMain(true)
                }
            }
        }
    }

    /**
     * Находит по указанному пути все файлы, которые должны быть удалены в процессе обновления.
     * @param path начальный путь (вложенные папки тоже проверяются).
     * @param map карта обновления.
    */
    static checkPathToDelete = (path: string, map: UpdateMap) => {
        const toRemove: string[] = []
        const items = readdirSync(path)
        for (const item of items) {
            const path2 = join(path, item)
    
            if (lstatSync(path2).isDirectory()) {
                const array = this.checkPathToDelete(path2, map)
                if (array) {
                    toRemove.push(...array)
                }
            } else {
                const relativePath = path2.replace(join(paths.root, '/'), '')
                if (!map[relativePath]) {
                    toRemove.push(path2)
                }
            }
        }
    
        return toRemove
    }

    /**
     * Обрабатывает карту обновления.
     * @param map карта обновления.
     * @returns `[пути_для_удаления, для_обновления]`
    */
    static checkMap = (map: UpdateMap) => {
        const toRemove = this.checkPathToDelete(paths.root, map)
        const toCreateOrChange = []
    
        for (const relativePath in map) {
            const absolutePath = join(paths.root, relativePath)
    
            if (!existsSync(absolutePath)) {
                toCreateOrChange.push(relativePath)
            } else {
                if (lstatSync(absolutePath).isDirectory()) {
                    toRemove.push(absolutePath)
                    toCreateOrChange.push(relativePath)
                    continue
                }
                if (Hasher.getHash(absolutePath) !== map[relativePath]) {
                    toCreateOrChange.push(relativePath)
                }
            }
        }
    
        return [toRemove, toCreateOrChange]
    }

    /**
     * Проверяет наличие обновления. Выводит оповещение при наличии.
     * @param whateverCheck игнорировать настройку `settings.updates` в `config.json`
    */
    static checkUpdate = (whateverCheck?: boolean) => {
        if (!this.config.settings.updates && !whateverCheck) return

        dns.resolve('github.com', error => {
            if (!error) {
                https.get(paths.publicInfo, res => {
                    res.setEncoding('utf-8')
                    let rawData = ''
    
                    res.on('data', (chunk) => {
                        rawData += chunk
                    })
                    res.on('end', () => {
                        const data = JSON.parse(rawData)
                        if (this.config.version < data.latestVersion) {
                            if (this.config.version >= data.minVersion) {
                                Windows.openUpdateWindow(data.latestVersion)
                            } else {
                                Notification.show('NOTIFICATION', 'ALLOW_NEW_VERSION').then(() => {
                                    shell.openExternal(paths.downloadPage)
                                })
                            }
                        }
                    })
                })
            }
        })
    }


    /**
     * Проверяет наличие всех путей для работы программы. `config.paths`
     * 
     * _В случае неудачи выводит уведомление._
    */
    static hasAllPaths = () => {
        let success = true
        if (!existsSync(this.config.paths.initial)) {
            Dialog.alert({
                type: 'warning',
                title: Texts.get('ERROR'),
                message: Texts.get('INITIAL_NOT_FOUND')
            })
            success = false
        } else if (!existsSync(paths.classes)) {
            Dialog.alert({
                type: 'warning',
                title: Texts.get('ERROR'),
                message: Texts.get('CLASSES_NOT_FOUND')
            })
            success = false
        } else if (this.config.settings.DLC && !existsSync(paths.dlc)) {
            Dialog.alert({
                type: 'warning',
                title: Texts.get('ERROR'),
                message: Texts.get('DLC_FOLDER_NOT_FOUND')
            })
            this.config.settings.DLC = false
        }
        return success
    }

    /** Проверяет наличие у программы прав на чтение/запись файла по переданному пути. */
    static checkPermissions = (path: string) => {
        try {
            accessSync(path, constants.W_OK)
            return true
        } catch {
            return false
        }
    }
}
