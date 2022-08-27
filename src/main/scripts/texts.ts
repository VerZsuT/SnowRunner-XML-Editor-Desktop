import {existsSync, readFileSync, writeFileSync} from 'fs'
import {join} from 'path'

import type {Translation} from 'types'

import {config} from './config'
import {localize} from './localize'
import {paths} from './paths'

const locals = {
    RU: 'russian',
    EN: 'english',
    DE: 'german',
    CH: 'chinese_simplified'
}

/** Тексты */
export const gameTexts = {
    /** Игровой из модификаций */
    mods: {},
    /** Игровой из `initial.pak` */
    game: {}
}

/** Обработать файл с переводом из `initial.pak` (текущий выбранный язык в программе) */
export async function getGameTexts() {
    if (existsSync(paths.texts))
        gameTexts.game = JSON.parse(readFileSync(paths.texts).toString())

    if (existsSync(paths.strings)) {
        const stringsFilePath = join(paths.strings, `strings_${locals[config.lang]}.str`)

        if (existsSync(stringsFilePath)) {
            gameTexts.game = parseTextsFile(readFileSync(stringsFilePath, { encoding: 'utf16le' }).toString())
            saveGameTexts()
        }
    }
}

/** Обработать файл с переводом из `.pak` файлов модов (текущий выбранный язык в программе) */
export function getModsTexts() {
    const mods = {}
    for (const modId in config.mods.items) {
        if (existsSync(join(paths.modsTemp, modId, 'texts'))) {
            const stringsFilePath = join(paths.modsTemp, modId, `texts/strings_${locals[config.lang]}.str`)
            if (existsSync(stringsFilePath))
                mods[modId] = parseTextsFile(readFileSync(stringsFilePath, { encoding: 'utf16le' }).toString(), true)
        }
    }
    gameTexts.mods = mods
}

/** Сохранить игровой перевод в файл (для оптимизации) */
function saveGameTexts() {
    writeFileSync(paths.texts, JSON.stringify(gameTexts.game, null, '\t'))
}

/** Обработать файл игрового перевода */
function parseTextsFile(data: string, parseAll?: boolean): Translation {
    const strings = {}
    const lines = data.match(/[^\r\n]+/g)

    if (lines) {
        lines.forEach(line => {
            const result = line.split('"')

            if (result && result.length > 1) {
                const key = line.split('"')[0]
                    .trimEnd()
                    .replaceAll('"', '')
                    .replaceAll('\'', '')
                    .replaceAll('﻿', '')
                const value = line.split('"')[1]
                    .replaceAll('\\', '')

                if (parseAll || (startsWith(key, [
                    'UI_VEHICLE',
                    'UI_ADDON',
                    'UI_ADDONS',
                    'UI_UPGRADE',
                    'UI_TUNING',
                    'UI_SCOUT',
                    'UI_FRAME',
                    'UI_STUFF',
                    'UI_SEMITRAILER',
                    'UI_TRAILER',
                    'UI_ROCKET',
                    'UI_TRAIN',
                    'UI_ENGINE',
                    'UI_GEARBOX',
                    'UI_SUSPENSION',
                    'UI_RIM',
                    'UI_TIRE',
                    'UI_WINCH'
                ]) && key.endsWith('NAME'))) {
                    try { strings[key] = value }
                    catch {}
                }
            }
        })
    }
    return strings
}

function startsWith(key: string, array: string[]) {
    for (let i = 0; i < array.length; ++i) {
        if (key.startsWith(array[i]))
            return true
    }

    return false
}

/** Перевод программы */
export const mainTexts = localize({
    RU: {
        DELETE_OLD_INITIAL_BACKUP_ERROR: 'Не удалось удалить старый бэкап initial.pak.',
        DELETE_CURRENT_INITIAL_BACKUP_ERROR: 'Не удалось удалить текущий бэкап initial.pak',
        SAVE_INITIAL_BACKUP_ERROR: 'Не удалось сделать бэкап initial.pak.',
        SUCCESS_INITIAL_RESTORE: 'initial.pak был успешно восстановлен.',
        SUCCESS_BACKUP_SAVE: 'Бэкап initial.pak успешно сохранён.',
        SUCCESS: 'Успех',
        ERROR: 'Ошибка',
        ADMIN_REQUIRED_MESSAGE: 'Ошибка запуска. Программа должна быть запущена от имени администратора.',
        ALLOW_NEW_VERSION: 'Доступна новая версия программы. Нажмите чтобы перейти на страницу скачивания.',
        NOTIFICATION: 'Уведомление',
        INITIAL_NOT_FOUND: 'initial.pak не найден.',
        CLASSES_NOT_FOUND: 'Папка classes не найдена.',
        DLC_FOLDER_NOT_FOUND: 'Папка с дополнениями не найдена',
        UNPACKING: 'Распаковка',
        SEE_EXPORTED_MESSAGE: 'В данном файле находятся параметры следующих файлов:',
        SUCCESS_JOIN: 'Следующие файлы были объединены в один:',
        ONLY_MANUAL_UNINS: 'Удаление возможно только вручную: удалением папки с программой.',
        IMPORT_CONFIG_ERROR: 'Не удалось импортировать конфигурацию. Возможно вы выбрали неверный файл',
        SAVE_MOD_ERROR: 'Не удалось сохранить файлы модификации. Нет доступа к записи файла.',
        SAVE_ORIGINAL_ERROR: 'Не удалось обновить файлы в initial.pak. Нет доступа к записи',
        SAVE_CONFIG_ERROR: 'Не удалось сохранить конфиг.'
    },
    EN: {
        DELETE_OLD_INITIAL_BACKUP_ERROR: 'Failed to delete the old initial backup.',
        DELETE_CURRENT_INITIAL_BACKUP_ERROR: 'Failed to delete the current initial backup.',
        SAVE_INITIAL_BACKUP_ERROR: 'Failed to save initial backup.',
        SUCCESS_INITIAL_RESTORE: 'initial.pak was successfully restored.',
        SUCCESS_BACKUP_SAVE: 'The initial.pak backup was saved successfully.',
        SUCCESS: 'Success',
        ERROR: 'Error',
        ADMIN_REQUIRED_MESSAGE: 'Startup error. The program must be run as an administrator.',
        ALLOW_NEW_VERSION: 'A new version of the program is available. Click to go to the download page.',
        NOTIFICATION: 'Notification',
        INITIAL_NOT_FOUND: 'initial.pak not found',
        CLASSES_NOT_FOUND: 'Folder classes not found',
        DLC_FOLDER_NOT_FOUND: 'DLC folder not found',
        UNPACKING: 'Unpacking',
        SEE_EXPORTED_MESSAGE: 'This file contains the parameters of the following files:',
        SUCCESS_JOIN: 'The following files have been merged into one:',
        ONLY_MANUAL_UNINS: 'Deletion is only possible manually: by deleting the program folder.',
        IMPORT_CONFIG_ERROR: 'Failed to import configuration. You may have selected the wrong file',
        SAVE_MOD_ERROR: 'The modification files could not be saved. There is no write access to the file.',
        SAVE_ORIGINAL_ERROR: 'Failed to update files in initial. pak. There is no access to the record',
        SAVE_CONFIG_ERROR: 'Failed to save the config.'
    },
    DE: {
        DELETE_OLD_INITIAL_BACKUP_ERROR: 'Die alte Erstsicherung konnte nicht gelöscht werden.',
        DELETE_CURRENT_INITIAL_BACKUP_ERROR: 'Die aktuelle Erstsicherung konnte nicht gelöscht werden.',
        SAVE_INITIAL_BACKUP_ERROR: 'Erste Sicherung konnte nicht gespeichert werden.',
        SUCCESS_INITIAL_RESTORE: 'initial.pak wurde erfolgreich restauriert.',
        SUCCESS_BACKUP_SAVE: 'Die Initiale.pak backup wurde erfolgreich gespeichert.',
        SUCCESS: 'Erfolg',
        ERROR: 'Fehler',
        ADMIN_REQUIRED_MESSAGE: 'Startfehler. Das Programm muss als administrator ausgeführt.',
        ALLOW_NEW_VERSION: 'Eine neue Version des Programms ist verfügbar. Klicken Sie hier, um zur Download-Seite zu gelangen.',
        NOTIFICATION: 'Norifizierung',
        INITIAL_NOT_FOUND: 'initial.pak nicht gefunden',
        CLASSES_NOT_FOUND: 'Klassen nicht gefunden',
        DLC_FOLDER_NOT_FOUND: 'DLC-Ordner nicht gefunden',
        UNPACKING: 'Auspacken',
        SEE_EXPORTED_MESSAGE: 'Diese Datei enthält die Einstellungen der folgenden Dateien:',
        SUCCESS_JOIN: 'Die folgenden Dateien wurden zu einem zusammengefasst:',
        ONLY_MANUAL_UNINS: 'Das Löschen ist nur manuell möglich: Durch Löschen des Programmordners.',
        IMPORT_CONFIG_ERROR: 'Konfiguration konnte nicht importiert werden. Möglicherweise haben Sie die falsche Datei ausgewählt',
        SAVE_MOD_ERROR: 'Die Änderungsdateien konnten nicht gespeichert werden. Sie haben keinen Zugriff auf das Schreiben der Datei.',
        SAVE_ORIGINAL_ERROR: 'Die Dateien in initial konnten nicht aktualisiert werden.pak. Kein Zugriff auf den Datensatz',
        SAVE_CONFIG_ERROR: 'Die Konfiguration konnte nicht gespeichert werden.'
    },
    CH: {
        DELETE_OLD_INITIAL_BACKUP_ERROR: '删除旧的initial.pak备份失败。',
        DELETE_CURRENT_INITIAL_BACKUP_ERROR: '删除当前initial.pak备份失败',
        SAVE_INITIAL_BACKUP_ERROR: '备份initial.pak失败。',
        SUCCESS_INITIAL_RESTORE: 'initial.pak已被成功恢复。',
        SUCCESS_BACKUP_SAVE: 'initial.pak备份已成功保存。',
        SUCCESS: '成功',
        ERROR: '误差',
        ADMIN_REQUIRED_MESSAGE: '启动错误。该程序必须以管理员身份启动。',
        ALLOW_NEW_VERSION: '新版本的软件已经问世。点击进入下载页面。',
        NOTIFICATION: '通知书',
        INITIAL_NOT_FOUND: '没有找到initial.pak。',
        CLASSES_NOT_FOUND: '没有找到classes文件夹。',
        DLC_FOLDER_NOT_FOUND: '未找到增编文件夹',
        UNPACKING: '打开包装',
        SEE_EXPORTED_MESSAGE: '该文件包含以下文件的参数',
        SUCCESS_JOIN: '以下文件已合并为一个',
        ONLY_MANUAL_UNINS: '删除只能是手动的：通过卸载程序文件夹。',
        IMPORT_CONFIG_ERROR: '配置不能被导入。你可能选择了错误的文件',
        SAVE_MOD_ERROR: '修改文件无法保存。没有写入文件的权限。',
        SAVE_ORIGINAL_ERROR: '更新initial.pak中的文件失败。没有写入权限',
        SAVE_CONFIG_ERROR: '无法保存配置。'
    }
})
