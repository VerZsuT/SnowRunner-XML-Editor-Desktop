import https from 'https'
import dns from 'dns'
import { writeFileSync, existsSync, lstatSync, readdirSync, accessSync, constants } from 'fs'
import { join } from 'path'
import { app, shell } from 'electron'
import type IUpdateMap from '../types/IUpdateMap'

import { paths } from '../service'
import Config from './Config'
import Dialog from './Dialog'
import Windows from './Windows'
import Texts from './Texts'
import Hasher from './Hasher'
import Notification from './Notification'
import Backup from './Backup'
import Archiver from './Archiver'

/** Отвечает за различные проверки. */
export default class Checker {
    private static config = Config.obj

    /**
     * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
     * 
     * _Выводит уведомление и закрывает программу при неудаче._
     */
    public static checkAdmin = () => {
        try {
            writeFileSync(paths.config, JSON.stringify(this.config, null, '\t'))
            return true
        }
        catch {
            Windows.loading.setPercent(0)
            Dialog.alert({
                message: Texts.get('ADMIN_REQUIRED_MESSAGE'),
                type: 'warning',
                buttons: ['Exit'],
                title: 'Error'
            })
            setTimeout(app.quit, 2000)
            return false
        }
    }

    /**
     * Проверить на стороннее изменение `initial.pak`.
     * 
     * _Если изменения присутствуют, то обновляет файлы в программе._
     */
    public static checkInitial = async () => {
        if (!existsSync(join(paths.mainTemp, '[media]')) || Hasher.getSize(this.config.initial) !== this.config.sizes.initial) {
            if (existsSync(this.config.initial)) {
                if (!existsSync(paths.backupInitial))
                    await Backup.save()
                else
                    await Archiver.unpackMain()
            }
        }
    }

    /**
     * Найти по указанному пути все файлы, которые должны быть удалены в процессе обновления.
     * @param path начальный путь (вложенные папки тоже проверяются).
     * @param map карта обновления.
     */
    public static checkPathToDelete = (path: string, map: IUpdateMap) => {
        const toRemove: string[] = []
        const items = readdirSync(path)
        
        for (const item of items) {
            const path2 = join(path, item)

            if (lstatSync(path2).isDirectory()) {
                const array = this.checkPathToDelete(path2, map)
                if (array)
                    toRemove.push(...array)
            }
            else {
                const relativePath = path2.replace(join(paths.root, '/'), '')
                if (!map[relativePath])
                    toRemove.push(path2)
            }
        }

        return toRemove
    }

    /**
     * Обработать карту обновления.
     * @param map карта обновления.
     * @returns `[пути_для_удаления, для_обновления]`
     */
    public static checkMap = (map: IUpdateMap) => {
        const toRemove = this.checkPathToDelete(paths.root, map)
        const toCreateOrChange = []

        for (const relativePath in map) {
            const absolutePath = join(paths.root, relativePath)

            if (!existsSync(absolutePath)) {
                toCreateOrChange.push(relativePath)
            }
            else {
                if (lstatSync(absolutePath).isDirectory()) {
                    toRemove.push(absolutePath)
                    toCreateOrChange.push(relativePath)
                    continue
                }
                if (Hasher.getHash(absolutePath) !== map[relativePath])
                    toCreateOrChange.push(relativePath)
            }
        }

        return [toRemove, toCreateOrChange]
    }

    /**
     * Проверить наличие обновления.
     * 
     * Выводит оповещение при наличии.
     * @param whateverCheck игнорировать настройку `settings.updates` в `config.json`
     */
    public static checkUpdate = (whateverCheck?: boolean) => {
        if (!this.config.settings.updates && !whateverCheck)
            return

        dns.resolve('www.google.com', error => {
            if (!error) {
                https.get(paths.publicInfo, res => {
                    let rawData = ''
        
                    res.setEncoding('utf-8')
                    res.on('data', chunk => rawData += chunk)
                    res.on('end', () => {
                        const data = JSON.parse(rawData)
        
                        if (this.config.version < data.latestVersion || (
                            this.config.version.includes('-beta') &&
                            this.config.version.split('-beta')[0] === data.latestVersion)) {
                            if (this.config.version >= data.minVersion) {
                                Windows.openUpdateWindow(data.latestVersion)
                            }
                            else {
                                Notification.show('NOTIFICATION', 'ALLOW_NEW_VERSION').then(() =>
                                    shell.openExternal(paths.downloadPage)
                                )
                            }
                        }
                    })
                })
            }
        })
    }


    /**
     * Проверить наличие всех путей для работы программы. `config.paths`
     * 
     * _В случае неудачи выводит уведомление._
     */
    public static hasAllPaths = () => {
        let success = true
        
        if (!existsSync(this.config.initial)) {
            Dialog.alert({
                type: 'warning',
                title: Texts.get('ERROR'),
                message: Texts.get('INITIAL_NOT_FOUND')
            })
            success = false
        }
        else if (!existsSync(paths.classes)) {
            Dialog.alert({
                type: 'warning',
                title: Texts.get('ERROR'),
                message: Texts.get('CLASSES_NOT_FOUND')
            })
            success = false
        }
        else if (this.config.settings.DLC && !existsSync(paths.dlc)) {
            Dialog.alert({
                type: 'warning',
                title: Texts.get('ERROR'),
                message: Texts.get('DLC_FOLDER_NOT_FOUND')
            })
            this.config.settings.DLC = false
        }

        return success
    }

    /** Проверить наличие у программы прав на чтение/запись файла по переданному пути. */
    static checkPermissions = (path: string) => {
        try {
            accessSync(path, constants.W_OK)
            return true
        }
        catch {
            return false
        }
    }
}
