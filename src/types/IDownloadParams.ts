import type { IDownloadWindow } from './IDownloadWindow'

export interface IDownloadParams {
  array?: {
    url: string
    path: string
  }[]
  isRoot?: boolean
  inMemory?: boolean
  fromJSON?: boolean
  loadingPage?: IDownloadWindow | null
  url?: string
  path?: string
}
