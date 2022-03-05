import { app } from 'electron'
import https from 'https'
import { createWriteStream, existsSync, lstatSync, rmSync, mkdirSync } from 'fs'
import { basename, join, dirname } from 'path'
import type IDownloadParams from '../types/IDownloadParams'

import { clearTemp, paths } from '../service'
import Windows from './Windows'
import Checker from './Checker'
import Config from './Config'
import Settings from './Settings'

/** Отвечает за работу с обновлениями. */
export default class Updater {
    private static settings = Settings.obj

    /** Загрузить файл(ы) из сети. */
    public static download = (params: IDownloadParams, cb: (data?: any) => any) => {
        if (params.array) {
            const { url, path } = params.array[0]

            if (params.isRoot) {
                params.loadingPage.setCount(params.array.length)
            }

            params.loadingPage.setText(basename(path))
            this.download({
                url: url,
                path: path,
                loadingPage: params.loadingPage
            }, () => {
                cb()
                if (params.array.length > 1) {
                    this.download({
                        array: params.array.slice(1),
                        loadingPage: params.loadingPage
                    }, cb)
                }
            })
            return
        }
        https.get(params.url, res => {
            if (params.inMemory) {
                let chunks = ''

                res.on('data', chunk => chunks += chunk)

                res.on('end', () => {
                    if (params.fromJSON) {
                        cb(JSON.parse(chunks))
                    }
                    else {
                        cb(chunks)
                    }
                })
            }
            else {
                const file = createWriteStream(params.path)
                if (params.loadingPage) {
                    const len = parseInt(res.headers['content-length'], 10)
                    let cur = 0

                    res.on("data", chunk => {
                        cur += chunk.length
                        params.loadingPage.setPercent((100.0 * (cur / len)).toFixed(2))
                    })
                }

                res.pipe(file)
                res.on('end', () => {
                    params.loadingPage.success()
                    file.on('close', cb)
                    file.close()
                })
            }
        })
    }

    /** Запустить процесс обновления программы. */
    public static update = () => {
        const page = Windows.loading
        let flagToReload = false
        
        page.download()
        page.show()
        clearTemp()

        this.download({
            url: paths.updateMap,
            fromJSON: true,
            inMemory: true,
        }, updateMap => {
            let [toRemove, toCreateOrChange] = Checker.checkMap(updateMap)

            for (const path of toRemove) {
                if (lstatSync(path).isFile()) {
                    rmSync(path)
                }
                else {
                    rmSync(path, { recursive: true })
                }
            }

            if (toCreateOrChange.length === 0) {
                this.settings.saveWhenReload = false
                Config.export()
                this.settings.isQuit = true
                app.relaunch()
                app.quit()
            }
            const toDownload = []
            for (const relativePath of toCreateOrChange) {
                const path = join(paths.root, relativePath)
                const url = `${paths.updateFiles}/${relativePath.replaceAll('\\', '/').replace('.webpack', 'webpack')}`

                if (!existsSync(dirname(path))) {
                    mkdirSync(path, { recursive: true })
                }
                toDownload.push({
                    url: url,
                    path: path
                })
            }
            this.download({
                array: toDownload,
                loadingPage: page,
                isRoot: true,
            }, () => {
                toCreateOrChange = toCreateOrChange.slice(1)
                if (toCreateOrChange.length === 0 && flagToReload === false) {
                    this.settings.saveWhenReload = false
                    flagToReload = true
                    Config.export()
                    this.settings.isQuit = true
                    app.relaunch()
                    app.quit()
                }
            })
        })
    }
}
