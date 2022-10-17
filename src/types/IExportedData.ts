export interface IExportedData {
  fileName: string
  version: string
  data: {
    [fileName: string]: {
      [selector: string]: {
        [attrName: string]: string | number
      }
    }
  }
  actionsData: {
    [key: string]: any
  }
}
