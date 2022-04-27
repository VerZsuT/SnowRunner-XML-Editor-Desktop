import type IDownloadWindow from "./IDownloadWindow";

interface IDownloadParams {
    array?: {
        url: string
        path: string
    }[]
    isRoot?: boolean
    inMemory?: boolean
    fromJSON?: boolean
    loadingPage?: IDownloadWindow
    url?: string
    path?: string
}

export default IDownloadParams;
