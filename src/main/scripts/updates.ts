import {app} from 'electron'
import {copyFileSync, createWriteStream, existsSync, lstatSync, mkdirSync} from 'fs'
import {get} from 'https'
import {basename, dirname, join} from 'path'

import type {DownloadParams, UpdateMap} from 'types'

import {regFunctions} from './bridge'
import {exportConfig} from './configMethods'
import {getHash} from './hash'
import {paths} from './paths'
import {clearTemp} from './service'
import {settings} from './settings'
import {wins} from './windows'

regFunctions([[update, 'updateApp']])

/** Загрузить файл(ы) из сети */
export function download(params: DownloadParams, callback: (data?: any) => any) {
    const { array, isRoot, inMemory, loadingPage, path, url, fromJSON } = params

    if (array) {
        const { url, path } = array[0]

        if (isRoot)
            loadingPage.setCount(array.length)
        loadingPage.setText(basename(path))

        download({ url, path, loadingPage }, () => {
            callback()
            if (array.length > 1) {
                download({
                    array: array.slice(1),
                    loadingPage
                }, callback)
            }
        })
        return
    }

    get(url, response => {
        if (inMemory) {
            let chunks = ''

            response.on('data', chunk => chunks += chunk)
            response.on('end', () => {
                if (fromJSON)
                    callback(JSON.parse(chunks))
                else
                    callback(chunks)
            })
        }
        else {
            const file = createWriteStream(path)
            if (loadingPage) {
                const len = parseInt(response.headers['content-length'], 10)
                let cur = 0

                response.on('data', chunk => {
                    cur += chunk.length
                    loadingPage.setPercent((100.0 * (cur / len)).toFixed(2))
                })
            }

            response.pipe(file)
            response.on('end', () => {
                loadingPage.success()
                file.on('close', callback)
                file.close()
            })
        }
    })
}

/** Запустить процесс обновления программы */
export function update() {
    const page = wins.loading
    let flagToReload = false

    page.download()
    page.show()
    clearTemp()

    download({
        url: paths.updateMap,
        fromJSON: true,
        inMemory: true
    }, updateMap => {
        const checked = processMap(updateMap)
        const toCopy = checked[0]
        let forCreateOrChange = checked[1]

        mkdirSync(paths.updateRoot)
        toCopy.forEach(relPath => {
            const mainAbsPath = join(paths.root, relPath)
            const updateAbsPath = join(paths.updateRoot, relPath)

            if (!existsSync(dirname(updateAbsPath)))
                mkdirSync(dirname(updateAbsPath), { recursive: true })

            copyFileSync(mainAbsPath, updateAbsPath)
        })

        if (forCreateOrChange.length === 0) {
            settings.saveWhenReload = false
            exportConfig()
            settings.isQuit = true
            app.relaunch()
            app.quit()
        }
        const toDownload = []
        forCreateOrChange.forEach(relativePath => {
            const path = join(paths.updateRoot, relativePath)
            const webPath = relativePath.replaceAll('\\', '/').replace('.webpack', 'webpack')
            const url = `${paths.updateFiles}/${webPath}`

            if (!existsSync(dirname(path)))
                mkdirSync(dirname(path), { recursive: true })

            toDownload.push({ url, path })
        })

        download({
            array: toDownload,
            loadingPage: page,
            isRoot: true
        }, () => {
            forCreateOrChange = forCreateOrChange.slice(1)
            if (forCreateOrChange.length === 0 && flagToReload === false) {
                settings.saveWhenReload = false
                settings.isQuit = true
                flagToReload = true

                exportConfig()
                app.relaunch()
                app.quit()
            }
        })
    })
}

/**
 * Обработать карту обновления
 * @param map - карта обновления
 * @returns `[пути_для_удаления, для_обновления]`
 */
function processMap(map: UpdateMap) {
    const toCreateOrChange = []
    const toCopy = []

    for (const relativePath in map) {
        const absolutePath = join(paths.root, relativePath)

        if (!existsSync(absolutePath)) {
            toCreateOrChange.push(relativePath)
        }
        else {
            if (lstatSync(absolutePath).isDirectory())
                continue

            if (getHash(absolutePath) !== map[relativePath])
                toCreateOrChange.push(relativePath)
            else
                toCopy.push(relativePath)
        }
    }

    return [toCopy, toCreateOrChange]
}
