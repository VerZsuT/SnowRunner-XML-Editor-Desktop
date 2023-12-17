export interface IExportedData {
  version: string
  info: {
    name: string
    isTrailer: boolean
    dlc?: string
    mod?: string
  }[]
  data: {
    [fileName: string]: { // `{name}_{dlc or mod or 'default'}
      [selector: string]: {
        [attribute: string]: string | number
      }
    }
  }
  actionsData: {
    [fileName: string]: {
      [id: string]: any
    }
  }
}
