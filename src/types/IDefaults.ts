export interface IDefaults {
  [filePath: string]: {
    [selector: string]: {
      [attrName: string]: string
    }
  }
}
