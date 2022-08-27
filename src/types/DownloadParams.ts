import type {DownloadWindow} from './DownloadWindow'

export interface DownloadParams {
    array?: {
        url: string
        path: string
    }[]
    isRoot?: boolean
    inMemory?: boolean
    fromJSON?: boolean
    loadingPage?: DownloadWindow
    url?: string
    path?: string
}
